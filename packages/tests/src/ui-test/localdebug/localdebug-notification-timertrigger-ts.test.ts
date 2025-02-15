/**
 * @author Anne Fu <v-annefu@microsoft.com>
 */
import * as path from "path";
import { startDebugging, waitForTerminal } from "../../vscodeOperation";
import {
  initPage,
  validateNotificationTimeBot,
} from "../../playwrightOperation";
import { LocalDebugTestContext } from "./localdebugContext";
import {
  Timeout,
  LocalDebugTaskLabel,
  LocalDebugTaskInfo,
} from "../../constants";
import { Env } from "../../utils/env";
import { it } from "../../utils/it";
import { validateFileExist } from "../../utils/commonUtils";

// TODO: Change preview test to normal test before rc release
describe("Time-trigger Notification Bot  Local Debug Tests", function () {
  this.timeout(Timeout.testCase);
  let localDebugTestContext: LocalDebugTestContext;

  const oldEnv = Object.assign({}, process.env);
  beforeEach(async function () {
    // ensure workbench is ready
    this.timeout(Timeout.prepareTestCase);
    localDebugTestContext = new LocalDebugTestContext("timeNoti", "typescript");
    await localDebugTestContext.before();
  });

  afterEach(async function () {
    process.env = oldEnv;
    this.timeout(Timeout.finishTestCase);
    await localDebugTestContext.after(false, true);
  });

  it(
    "[auto] [Typescript] Local debug Time-trigger Notification Bot App",
    {
      testPlanCaseId: 16551757,
      author: "v-annefu@microsoft.com",
    },
    async function () {
      const projectPath = path.resolve(
        localDebugTestContext.testRootFolder,
        localDebugTestContext.appName
      );
      validateFileExist(projectPath, "src/timerTrigger.ts");

      await startDebugging();

      await waitForTerminal(LocalDebugTaskLabel.StartLocalTunnel);
      await waitForTerminal(
        "Start Azurite emulator",
        "Azurite Blob service is successfully listening"
      );
      await waitForTerminal(
        LocalDebugTaskLabel.StartBotApp,
        "Worker process started and initialized"
      );

      const teamsAppId = await localDebugTestContext.getTeamsAppId();
      const page = await initPage(
        localDebugTestContext.context!,
        teamsAppId,
        Env.username,
        Env.password
      );
      await validateNotificationTimeBot(page);
    }
  );
});
