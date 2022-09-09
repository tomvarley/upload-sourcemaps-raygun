import * as core from "@actions/core";
import * as github from "@actions/github";
import type { GitHub } from "@actions/github/lib/utils";
import { ActionConfig, getConfig } from "./action";

type Octokit = InstanceType<typeof GitHub>;

let config: ActionConfig;
let octokit: Octokit;

export function init(cfg?: ActionConfig): void {
  config = cfg || getConfig();
  octokit = github.getOctokit(config.token);
}

