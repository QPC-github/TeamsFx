/**
 * @author Helly Zhang <v-helzha@microsoft.com>
 */
import * as path from "path";
import { VSBrowser } from "vscode-extension-tester";
import { Timeout, ValidationContent } from "../../constants";
import {
  RemoteDebugTestContext,
  runProvision,
  runDeploy,
  setSkuNameToB1,
} from "./remotedebugContext";
import { execCommandIfExist, createNewProject } from "../../vscodeOperation";
import { initPage, validateBasicTab } from "../../playwrightOperation";
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
    remoteDebugTestContext = new RemoteDebugTestContext("tab");
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
    "[auto] [Javascript] Remote debug for tab project without sso",
    {
      testPlanCaseId: 9454406,
      author: "v-helzha@microsoft.com",
    },
    async function () {
      //create tab project
      const driver = VSBrowser.instance.driver;
      await createNewProject("tabnsso", appName);
      await setSkuNameToB1(projectPath);
      await driver.sleep(Timeout.shortTimeWait);
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
      await validateBasicTab(page, ValidationContent.Tab);
    }
  );
});
