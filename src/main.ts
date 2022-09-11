import { opendir } from "fs/promises";
import * as core from "@actions/core";
import { getConfig } from "./action";
import jetpack from "fs-jetpack";

async function run(): Promise<void> {
  try {
    const config = getConfig();

    core.info(`Sending sourcemap files to Raygun...`);

    // eslint-disable-next-line github/array-foreach
    jetpack.find(config.folder!, {matching: '*.js.map'}).forEach( (path) => {console.log(path)})

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
