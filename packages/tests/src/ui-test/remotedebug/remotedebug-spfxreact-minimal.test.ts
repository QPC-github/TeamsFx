/**
 * @author Helly Zhang <v-helzha@microsoft.com>
 */
import * as path from "path";
import * as fs from "fs-extra";
import { expect } from "chai";
import { InputBox, VSBrowser } from "vscode-extension-tester";
import { CommandPaletteCommands, Timeout, Notification } from "../../constants";
import { RemoteDebugTestContext } from "./remotedebugContext";
import {
  execCommandIfExist,
  getNotification,
  createNewProject,
  clearNotifications,
} from "../../vscodeOperation";
import { initPage, validateSpfx } from "../../playwrightOperation";
import { Env } from "../../utils/env";
import { cleanUpLocalProject } from "../../utils/cleanHelper";
import { it } from "../../utils/it";

describe("Remote debug Tests", function () {
  this.timeout(Timeout.testCase);
  let remoteDebugTestContext: RemoteDebugTestContext;
  let testRootFolder: string;
  let appName: string;
  const appNameCopySuffix = "copy";
  let newAppFolderName: string;
  let projectPath: string;

  beforeEach(async function () {
    this.timeout(Timeout.prepareTestCase);
    remoteDebugTestContext = new RemoteDebugTestContext("spfx");
    testRootFolder = remoteDebugTestContext.testRootFolder;
    appName = remoteDebugTestContext.appName;
    newAppFolderName = appName + appNameCopySuffix;
    projectPath = path.resolve(testRootFolder, newAppFolderName);
    await remoteDebugTestContext.before();
  });

  afterEach(async function () {
    this.timeout(Timeout.finishTestCase);
    await remoteDebugTestContext.after();
    // Close the folder and cleanup local sample project
    await execCommandIfExist("Workspaces: Close Workspace", Timeout.webView);
    cleanUpLocalProject(projectPath);
  });

  it(
    "[auto] Create, provision and run SPFx project with Minimal framework",
    {
      testPlanCaseId: 9426251,
      author: "v-helzha@microsoft.com",
    },
    async function () {
      const driver = VSBrowser.instance.driver;
      await createNewProject("spfxmin", appName);
      await clearNotifications();
      await execCommandIfExist(CommandPaletteCommands.ProvisionCommand);
      await driver.sleep(Timeout.spfxProvision);
      await getNotification(
        Notification.ProvisionSucceeded,
        Timeout.shortTimeWait
      );
      await clearNotifications();
      await execCommandIfExist(CommandPaletteCommands.DeployCommand);
      try {
        const deployConfirmInput = await InputBox.create();
        await deployConfirmInput.confirm();
      } catch (error) {
        console.log("No need to confirm to deploy.");
      }
      await driver.sleep(Timeout.spfxDeploy);
      await getNotification(Notification.DeploySucceeded, Timeout.longTimeWait);

      // Verify the sppkg file path
      const sppkgFolderPath = path.resolve(
        projectPath,
        "src",
        "sharepoint",
        "solution"
      );

      const teamsAppId = await remoteDebugTestContext.getTeamsAppId(
        projectPath
      );
      // const page = await initPage(
      //   remoteDebugTestContext.context!,
      //   teamsAppId,
      //   Env.username,
      //   Env.password
      // );
      // await driver.sleep(Timeout.longTimeWait);

      // // Validate app name is in the page
      // await validateSpfx(page, appName);
    }
  );
});
