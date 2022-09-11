import path from "path";
import * as core from "@actions/core";
import jetpack from "fs-jetpack";
import fetch from "node-fetch";
import { getConfig } from "./action";

async function run(): Promise<void> {
  try {
    const config = getConfig();

    core.info(`Sending sourcemap files to Raygun...`);

    const sourcemaps = jetpack.find(config.folder!, { matching: "*.js.map" });

    for (const sourcemap of sourcemaps) {
      console.log(sourcemap);
      const formData = new URLSearchParams();

      formData.append(
        "url",
        `${config.base_url}/${path.parse(sourcemap).base}`
      );
      formData.append("file", sourcemap);

      const res = await fetch(
        `https://app.raygun.com/upload/${config.project_id}?authtoken=${config.token}`,
        {
          method: "POST",
          body: formData,
        }
      );

      core.info("Response code:" + res.status);
      core.info(res.statusText);

      if (!res.ok) {
        throw new Error(res.statusText);
      }
    }

    // try {
    //   const dir = await opendir(config.folder!);
    //   for await (const dirent of dir) console.log(dirent.name);
    // } catch (err) {
    //   console.error(err);
    // }
  } catch (error) {
    if (error instanceof Error) {
      core.error(`Failed: ${error.message}`);

      error.stack && core.debug(error.stack);
      core.setFailed(error.message);
    }
  }
}

(() => run())();
