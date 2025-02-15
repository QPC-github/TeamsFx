/**
 * @author Ivan Chen <v-ivanchen@microsoft.com>
 */
import { SampledebugContext } from "../../samples/sampledebugContext";
import {
  Timeout,
  TemplateProject,
  Notification,
  TemplateProjectFolder,
} from "../../../constants";
import { it } from "../../../utils/it";
import { CliHelper } from "../../cliHelper";
import {
  validateNotification,
  validateUpgrade,
  upgradeByTreeView,
} from "../../../vscodeOperation";
import { initPage, validateBot } from "../../../playwrightOperation";
import { Env } from "../../../utils/env";
import { CLIVersionCheck } from "../../../utils/commonUtils";

describe("Migration Tests", function () {
  this.timeout(Timeout.testAzureCase);
  let sampledebugContext: SampledebugContext;

  beforeEach(async function () {
    // ensure workbench is ready
    this.timeout(Timeout.prepareTestCase);

    sampledebugContext = new SampledebugContext(
      TemplateProject.HelloWorldBotSSO,
      TemplateProjectFolder.HelloWorldBotSSO
    );
    await sampledebugContext.before();
  });

  afterEach(async function () {
    this.timeout(Timeout.finishTestCase);
    await sampledebugContext.after();
  });

  it(
    "[auto] V4.0.0 sample bot sso V2 to V3 upgrade test",
    {
      testPlanCaseId: 17431834,
      author: "v-ivanchen@microsoft.com",
    },
    async () => {
      // create v2 project using CLI
      await sampledebugContext.createTemplateCLI(false);
      // verify popup
      await validateNotification(Notification.Upgrade);

      // upgrade
      await upgradeByTreeView();
      //verify upgrade
      await validateUpgrade();

      // install test cil in project
      await CliHelper.installCLI(
        Env.TARGET_CLI,
        false,
        sampledebugContext.projectPath
      );
      CliHelper.setV3Enable();

      // v3 provision
      await sampledebugContext.provisionWithCLI("dev", true);
      await CLIVersionCheck("V3", sampledebugContext.projectPath);
      // v3 deploy
      await sampledebugContext.deployWithCLI("dev");

      const teamsAppId = await sampledebugContext.getTeamsAppId("dev");
      console.log(teamsAppId);
      const page = await initPage(
        sampledebugContext.context!,
        teamsAppId,
        Env.username,
        Env.password
      );
      await validateBot(page);
      console.log("debug finish!");
    }
  );
});
