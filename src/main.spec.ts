import { execFile } from "child_process";
import { createHash } from "crypto";
import { once } from "events";
import { mkdtemp, rm, writeFile } from "fs/promises";
import { createServer } from "http";
import type { AddressInfo } from "net";
import { tmpdir } from "os";
import path from "path";
import { promisify } from "util";

const run = promisify(execFile);

interface Upload {
  body: Buffer;
  boundary: string;
}

describe("Source map uploads", () => {
  it("completes multibyte files byte-for-byte under backpressure", async () => {
    const folder = await mkdtemp(path.join(tmpdir(), "raygun-upload-"));
    const server = createServer();
    const receivedUpload = new Promise<Upload>((resolve, reject) => {
      server.on("request", (request, response) => {
        const boundary = /boundary=([^;]+)/.exec(
          request.headers["content-type"] ?? ""
        )?.[1];
        if (!boundary) {
          reject(new Error("Expected a multipart upload"));
          response.writeHead(400);
          response.end("{}");
          return;
        }
        const chunks: Buffer[] = [];
        request.on("data", (chunk: Buffer) => {
          chunks.push(chunk);
          request.pause();
          setTimeout(() => request.resume(), 2).unref();
        });
        request.on("error", reject);
        request.on("end", () => {
          resolve({ body: Buffer.concat(chunks), boundary });
          response.setHeader("content-type", "application/json");
          response.end('{"Status":"Success"}');
        });
      });
    });

    try {
      const prefix =
        '{"version":3,"sources":["unicode.js"],"sourcesContent":["// ';
      // Align UTF-8 pairs with file chunks to reproduce Node's missing-drain bug.
      const padding = " ".repeat(Buffer.byteLength(prefix) % 2);
      const contents = Buffer.from(
        `${prefix}${padding}${"é".repeat(
          512 * 1024
        )}"],"names":[],"mappings":""}`
      );
      await writeFile(path.join(folder, "unicode.js.map"), contents);
      server.listen(0, "127.0.0.1");
      await once(server, "listening");
      const { port } = server.address() as AddressInfo;
      const [upload] = await Promise.all([
        receivedUpload,
        run(
          process.execPath,
          [
            "--require",
            path.join(__dirname, "test/redirect-raygun.cjs"),
            path.join(__dirname, "../dist/index.js"),
          ],
          {
            cwd: folder,
            env: {
              ...process.env,
              INPUT_TOKEN: "test-token",
              INPUT_PROJECT_ID: "test-project",
              INPUT_BASE_URL: "https://example.test/assets",
              INPUT_FOLDER: folder,
              RAYGUN_TEST_PORT: String(port),
            },
            timeout: 10000,
          }
        ),
      ]);
      const header = upload.body.indexOf('name="file";');
      const start = upload.body.indexOf("\r\n\r\n", header) + 4;
      const end = upload.body.lastIndexOf(`\r\n--${upload.boundary}--\r\n`);
      const actualHash = createHash("sha256")
        .update(upload.body.subarray(start, end))
        .digest("hex");
      const expectedHash = createHash("sha256").update(contents).digest("hex");
      expect(actualHash).toBe(expectedHash);
    } finally {
      server.closeAllConnections();
      if (server.listening) {
        await new Promise<void>((resolve) => server.close(() => resolve()));
      }
      await rm(folder, { recursive: true, force: true });
    }
  }, 15000);
});
