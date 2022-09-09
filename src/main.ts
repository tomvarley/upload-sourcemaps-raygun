import { opendir } from "fs/promises";
import * as core from "@actions/core";
import { getConfig } from "./action";
import { init } from "./api";

async function run(): Promise<void> {
  try {
    const config = getConfig();
    init(config);

    core.info(`Sending sourcemap files to Raygun...`);

    try {
      const dir = await opendir(config.folder!);
      for await (const dirent of dir) console.log(dirent.name);
    } catch (err) {
      console.error(err);
    }
    // while (elapsedTime < timeoutMs) {
    //   attemptNo++;
    //   elapsedTime = Date.now() - startTime;
    //
    //   if (workflowRunId === undefined) {
    //     const workflowRun = await getWorkflowRun(workflowId);
    //     workflowRunId = workflowRun?.id;
    //     checkSuiteId = workflowRun?.checkSuiteId;
    //   }
    //
    //   if (
    //     config.checkName &&
    //     checkRunId === undefined &&
    //     checkSuiteId !== undefined
    //   ) {
    //     checkRunId = await getCheckId(checkSuiteId, config.checkName);
    //   }
    //
    //   if (checkRunStatus! !== undefined) {
    //     if (await checkRunStatus()) {
    //       return;
    //     }
    //   } else if (workflowRunId !== undefined) {
    //     if (checkRunStatus! === undefined) {
    //       if (checkRunId !== undefined) {
    //         checkRunStatus = async () => {
    //           const runStatus = await getRunStatus(
    //             checkRunId!,
    //             RunType.CheckRun
    //           );
    //
    //           if (runStatus.completed) {
    //             const conclusion = runStatus.conclusion;
    //             const completionMsg =
    //               "Check Run Completed:\n" +
    //               `  Check Run ID: ${checkRunId}\n` +
    //               `  Elapsed Time: ${getElapsedTime(startTime, Date.now())}\n` +
    //               `  Conclusion: ${conclusion}`;
    //
    //             if (conclusion !== RunConclusion.Success) {
    //               core.error(completionMsg);
    //               core.setFailed(
    //                 `Workflow ${config.workflow} (${workflowId}) has not completed successfully: ${conclusion}.`
    //               );
    //             } else {
    //               core.info(completionMsg);
    //             }
    //             return true;
    //           }
    //
    //           return false;
    //         };
    //       } else {
    //         checkRunStatus = async () => {
    //           const runStatus = await getRunStatus(
    //             workflowRunId!,
    //             RunType.WorkflowRun
    //           );
    //
    //           if (runStatus.completed) {
    //             const conclusion = runStatus.conclusion;
    //             const completionMsg =
    //               "Workflow Run Completed:\n" +
    //               `  Workflow Run ID: ${workflowRunId}\n` +
    //               `  Elapsed Time: ${getElapsedTime(startTime, Date.now())}\n` +
    //               `  Conclusion: ${conclusion}`;
    //
    //             if (conclusion !== RunConclusion.Success) {
    //               core.error(completionMsg);
    //               core.setFailed(
    //                 `Workflow ${config.workflow} (${workflowId}) has not completed successfully: ${conclusion}.`
    //               );
    //             } else {
    //               core.info(completionMsg);
    //             }
    //             return true;
    //           }
    //           return false;
    //         };
    //       }
    //     }
    //   } else {
    //     core.debug("Run ID has not been discovered yet...");
    //   }
    //
    //   core.debug(`Run has not concluded, attempt ${attemptNo}...\n`);
    //
    //   await sleep(config.pollIntervalMs);
    // }
    //
    // throw new Error(
    //   "Timeout exceeded while attempting to await local workflow run"
    // );
  } catch (error) {
    if (error instanceof Error) {
      core.error(`Failed: ${error.message}`);
      // if (!error.message.includes("Timeout")) {
      //   core.warning("Does the token have the correct permissions?");
      // }
      error.stack && core.debug(error.stack);
      core.setFailed(error.message);
    }
  }
}

(() => run())();
