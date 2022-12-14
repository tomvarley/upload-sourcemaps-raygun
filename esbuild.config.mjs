import chalk from "chalk";
import { analyzeMetafile, build } from "esbuild";

(async () => {
  try {
    const startTime = Date.now();
    console.info(
      chalk.bold(`๐ ${chalk.blueBright("upload-sourcemaps-raygun")} Build\n`)
    );

    const result = await build({
      entryPoints: ["./src/main.ts"],
      outfile: "dist/index.js",
      metafile: true,
      bundle: true,
      platform: "node",
      target: ["node16"],
      sourcemap: "external",
      treeShaking: true,
    });

    const analysis = await analyzeMetafile(result.metafile);
    console.info(`๐ Bundle Analysis:${analysis}`);

    console.info(
      `${chalk.bold.green("โ Bundled successfully!")} (${
        Date.now() - startTime
      }ms)`
    );
  } catch (error) {
    console.error(`๐งจ ${chalk.red.bold("Failed:")} ${error.message}`);
    console.debug(`๐ ${chalk.blueBright.bold("Stack:")} ${error.stack}`);
    process.exit(1);
  }
})();
