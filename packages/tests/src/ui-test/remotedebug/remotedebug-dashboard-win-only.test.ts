/**
 * @author Ivan Chen <v-ivanchen@microsoft.com>
 */
import * as path from "path";
import { Timeout } from "../../constants";
import {
  RemoteDebugTestContext,
  runProvision,
  runDeploy,
} from "./remotedebugContext";
import { execCommandIfExist, createNewProject } from "../../vscodeOperation";
import { initPage, validateBasicDashboardTab } from "../../playwrightOperation";
import { Env } from "../../utils/env";
import { it } from "../../utils/it";

describe("Remote debug Tests", function () {
  this.timeout(Timeout.testAzureCase);
  let remoteDebugTestContext: RemoteDebugTestContext;
  let testRootFolder: string;
  let appName: string;
  const appNameCopySuffix = "copy";
  let newAppFolderName: string;
  let projectPath: string;

  beforeEach(async function () {
    // ensure workbench is ready
    this.timeout(Timeout.prepareTestCase);
    remoteDebugTestContext = new RemoteDebugTestContext("dashboard");
    testRootFolder = remoteDebugTestContext.testRootFolder;
    appName = remoteDebugTestContext.appName;
    newAppFolderName = appName + appNameCopySuffix;
    projectPath = path.resolve(testRootFolder, newAppFolderName);
    await remoteDebugTestContext.before();
  });

  afterEach(async function () {
    this.timeout(Timeout.finishAzureTestCase);
    await remoteDebugTestContext.after();

    //Close the folder and cleanup local sample project
    await execCommandIfExist("Workspaces: Close Workspace", Timeout.webView);
    console.log(`[Successfully] start to clean up for ${projectPath}`);
    await remoteDebugTestContext.cleanUp(
      appName,
      projectPath,
      false,
      false,
      false
    );
  });

  it(
    "[auto] [Typescript] Remote debug for Dashboard tab project in javascript",
    {
      testPlanCaseId: 16565720,
      author: "v-ivanchen@microsoft.com",
    },
    async function () {
      await createNewProject("dashboard", appName, "JavaScript");
      await runProvision(appName);
      await runDeploy();
      const teamsAppId = await remoteDebugTestContext.getTeamsAppId(
        projectPath
      );
      const page = await initPage(
        remoteDebugTestContext.context!,
        teamsAppId,
        Env.username,
        Env.password
      );
      await validateBasicDashboardTab(page);
    }
  );
});
