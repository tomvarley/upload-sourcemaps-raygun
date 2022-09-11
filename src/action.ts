import * as core from "@actions/core";

/**
 * action.yaml definition.
 */
export interface ActionConfig {
  /**
   * Raygun API token for making requests.
   */
  token: string;

  /**
   * The base url of the sourcemap that is being uploaded
   */
  base_url: string;

  /**
   * Project id in raygun to upload sourcemaps to
   */
  project_id: string;

  /**
   * Folder to recursively look for sourcemaps in
   */
  folder?: string;
}

export function getConfig(): ActionConfig {
  return {
    token: core.getInput("token", { required: true }),
    base_url: core.getInput("base_url", { required: true }),
    project_id: core.getInput("project_id", { required: true }),
    folder: (() => {
      const input = core.getInput("folder");
      return input === "" ? "./" : input;
    })(),
  };
}

function getNumberFromValue(value: string): number | undefined {
  if (value === "") {
    return undefined;
  }

  try {
    const num = parseInt(value);

    if (isNaN(num)) {
      throw new Error("Parsed value is NaN");
    }

    return num;
  } catch {
    throw new Error(`Unable to parse value: ${value}`);
  }
}
