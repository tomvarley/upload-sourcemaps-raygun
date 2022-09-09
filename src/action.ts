import * as core from "@actions/core";

/**
 * action.yaml definition.
 */
export interface ActionConfig {
  /**
   * GitHub API token for making requests.
   */
  token: string;

  /**
   * The workflow that you wish to await completion of.
   */
  base_url: string;

  /**
   * A specific check within the workflow to wait for. Await all checks if this is not specified.
   */
  folder?: string;
}

export function getConfig(): ActionConfig {
  return {
    token: core.getInput("token", { required: true }),
    base_url: core.getInput("base_url", { required: true }),
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
