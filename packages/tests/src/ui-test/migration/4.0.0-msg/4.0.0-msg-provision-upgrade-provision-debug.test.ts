/**
 * @author Frank Qian <frankqian@microsoft.com>
 */
import { MigrationTestContext } from "../migrationContext";
import { Timeout, Capability, Notification } from "../../../constants";
import { it } from "../../../utils/it";
import { Env } from "../../../utils/env";
import { validateMsg, initPage } from "../../../playwrightOperation";
import { CliHelper } from "../../cliHelper";
import {
  validateNotification,
  upgradeByTreeView,
  validateUpgrade,
} from "../../../vscodeOperation";
import { CLIVersionCheck } from "../../../utils/commonUtils";

describe("Migration Tests", function () {
  this.timeout(Timeout.testCase);
  let mirgationDebugTestContext: MigrationTestContext;

  beforeEach(async function () {
    // ensure workbench is ready
    this.timeout(Timeout.prepareTestCase);

    mirgationDebugTestContext = new MigrationTestContext(
      Capability.MessageExtension,
      "javascript"
    );
    await mirgationDebugTestContext.before();
  });

  afterEach(async function () {
    this.timeout(Timeout.finishTestCase);
    await mirgationDebugTestContext.after(true, true, "dev");
  });

  it(
    "[auto] V4.0.0 local debugged and provisioned message extension template upgrade test",
    {
      testPlanCaseId: 17431841,
      author: "frankqian@microsoft.com",
    },
    async () => {
      // create v2 project using CLI
      await mirgationDebugTestContext.createProjectCLI(false);
      // verify popup
      await validateNotification(Notification.Upgrade);

      await CLIVersionCheck("V2", mirgationDebugTestContext.projectPath);
      // v2 provision
      await mirgationDebugTestContext.provisionWithCLI("dev", false);
      // v2 deploy
      await mirgationDebugTestContext.deployWithCLI("dev");

      // upgrade
      await upgradeByTreeView();
      // verify upgrade
      await validateUpgrade();

      // install test cil in project
      await CliHelper.installCLI(
        Env.TARGET_CLI,
        false,
        mirgationDebugTestContext.projectPath
      );
      // enable cli v3
      CliHelper.setV3Enable();

      // v3 provision
      await mirgationDebugTestContext.provisionWithCLI("dev", true);
      // v3 deploy
      await CLIVersionCheck("V3", mirgationDebugTestContext.projectPath);
      await mirgationDebugTestContext.deployWithCLI("dev");

      const teamsAppId = await mirgationDebugTestContext.getTeamsAppId("dev");

      // UI verify
      const page = await initPage(
        mirgationDebugTestContext.context!,
        teamsAppId,
        Env.username,
        Env.password
      );
      await validateMsg(page);
    }
  );
});
