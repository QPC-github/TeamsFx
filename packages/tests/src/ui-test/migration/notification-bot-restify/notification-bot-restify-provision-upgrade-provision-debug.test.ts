/**
 * @author Frank Qian <frankqian@microsoft.com>
 */
import { MigrationTestContext } from "../migrationContext";
import {
  Timeout,
  Capability,
  Trigger,
  Notification,
  CliVersion,
} from "../../../constants";
import { it } from "../../../utils/it";
import { Env } from "../../../utils/env";
import {
  validateNotificationBot,
  initPage,
} from "../../../playwrightOperation";
import { CliHelper } from "../../cliHelper";
import {
  validateNotification,
  upgradeByTreeView,
  validateUpgrade,
} from "../../../vscodeOperation";
import {
  CLIVersionCheck,
  getBotSiteEndpoint,
} from "../../../utils/commonUtils";

describe("Migration Tests", function () {
  this.timeout(Timeout.testAzureCase);
  let mirgationDebugTestContext: MigrationTestContext;
  CliHelper.setV3Enable();

  beforeEach(async function () {
    // ensure workbench is ready
    this.timeout(Timeout.prepareTestCase);

    mirgationDebugTestContext = new MigrationTestContext(
      Capability.Notification,
      "javascript",
      Trigger.Restify
    );
    await mirgationDebugTestContext.before();
  });

  afterEach(async function () {
    this.timeout(Timeout.finishTestCase);
    await mirgationDebugTestContext.after(false, true, "dev");
  });

  it(
    "[auto] notification bot template upgrade test - js",
    {
      testPlanCaseId: 17184124,
      author: "frankqian@microsoft.com",
    },
    async () => {
      // install v2 stable cli 1.2.6
      await CliHelper.installCLI(CliVersion.V2TeamsToolkitStable425, false);
      await CLIVersionCheck("V2", mirgationDebugTestContext.testRootFolder);
      // create v2 project using CLI
      await mirgationDebugTestContext.createProjectCLI(false);
      // verify popup
      await validateNotification(Notification.Upgrade);

      await CLIVersionCheck("V2", mirgationDebugTestContext.testRootFolder);
      // remote provision
      await mirgationDebugTestContext.provisionWithCLI("dev", false);

      // upgrade
      await upgradeByTreeView();
      // verify upgrade
      await validateUpgrade();

      // install test cil in project
      await CliHelper.installCLI(
        Env.TARGET_CLI,
        false,
        mirgationDebugTestContext.testRootFolder
      );
      // enable cli v3
      CliHelper.setV3Enable();

      // remote provision
      await mirgationDebugTestContext.provisionWithCLI("dev", true);
      // remote deploy
      await CLIVersionCheck("V3", mirgationDebugTestContext.testRootFolder);
      await mirgationDebugTestContext.deployWithCLI("dev");

      const teamsAppId = await mirgationDebugTestContext.getTeamsAppId("dev");

      // UI verify
      const page = await initPage(
        mirgationDebugTestContext.context!,
        teamsAppId,
        Env.username,
        Env.password
      );
      const funcEndpoint = await getBotSiteEndpoint(
        mirgationDebugTestContext.projectPath,
        "dev"
      );
      await validateNotificationBot(page, funcEndpoint + "/api/notification");
    }
  );
});
