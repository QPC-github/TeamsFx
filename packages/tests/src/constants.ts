import * as os from "os";

export class Extension {
  public static readonly displayName: string = "Teams Toolkit";
  public static readonly treeViewSectionName: string = "Development";
  public static readonly activatedItemName: string = "DEVELOPMENT";
  public static readonly sidebarWelcomeSectionName: string = "Teams Toolkit";
  public static readonly sidebarWelcomeContentName: string = "Create a New App";
  public static readonly settingsCategory: string = "Fx-extension";
  public static readonly settingsInsiderPreview: string = "Insider Preview";
}

export class Project {
  public static readonly namePrefix = "fxui";
}

export class TeamsFxProject {
  public static readonly ExtensionConfigFolderName = "fx";
  public static readonly TelemetryLoggerFileName = "telemetryTest.log";
  public static readonly TelemetryLoggerFilePath =
    os.homedir +
    `/.${TeamsFxProject.ExtensionConfigFolderName}/${TeamsFxProject.TelemetryLoggerFileName}`;
}

export enum TemplateProject {
  HelloWorldTabBackEnd = "Tab App with Azure Backend",
  ContactExporter = "Contact Exporter using Graph Toolkit",
  OneProductivityHub = "One Productivity Hub using Graph Toolkit",
  HelloWorldBotSSO = "Bot App with SSO Enabled",
  TodoListBackend = "Todo List with backend on Azure",
  TodoListSpfx = "Todo List with SPFx",
  ShareNow = "Share Now",
  MyFirstMetting = "My First Meeting App",
  TodoListM365 = "Todo List (Works in Teams, Outlook and Office)",
  NpmSearch = "NPM Search Connector",
  ProactiveMessaging = "Proactive Messaging",
  AdaptiveCard = "Adaptive Card Notification",
  IncomingWebhook = "Incoming Webhook Notification",
  GraphConnector = "Graph Connector App",
  StockUpdate = "Stocks Update",
  QueryOrg = "Org User Search Connector",
  Deeplinking = "Hello World Deeplinking Navigation Tab App",
  Dashboard = "Team Central Dashboard",
  DeveloperAssist = "Developer Assist Dashboard",
  DiceRoller = "Dice Roller in meeting",
  OutlookTab = "Hello World Teams Tab Outlook add-in",
  OutlookSignature = "Set signature using Outlook add-in",
}

export enum TemplateProjectFolder {
  HelloWorldTabBackEnd = "hello-world-tab-with-backend",
  ContactExporter = "graph-toolkit-contact-exporter",
  OneProductivityHub = "graph-toolkit-one-productivity-hub",
  HelloWorldBotSSO = "bot-sso",
  TodoListBackend = "todo-list-with-Azure-backend",
  TodoListSpfx = "todo-list-SPFx",
  ShareNow = "share-now",
  MyFirstMetting = "hello-world-in-meeting",
  TodoListM365 = "todo-list-with-Azure-backend-M365",
  NpmSearch = "NPM-search-connector-M365",
  ProactiveMessaging = "bot-proactive-messaging-teamsfx",
  AdaptiveCard = "adaptive-card-notification",
  IncomingWebhook = "incoming-webhook-notification",
  GraphConnector = "graph-connector-app",
  StockUpdate = "stocks-update-notification-bot",
  QueryOrg = "query-org-user-with-message-extension-sso",
  Deeplinking = "deep-linking-hello-world-tab-without-sso-M365",
  Dashboard = "team-central-dashboard",
  DeveloperAssist = "developer-assist-dashboard",
  DiceRoller = "live-share-dice-roller",
  OutlookTab = "hello-world-teams-tab-and-outlook-add-in",
  OutlookSignature = "outlook-add-in-set-signature",
}

export enum Resource {
  AzureKeyVault = "azure-keyvault",
  AzureFunction = "azure-function",
  AzureApim = "azure-apim",
  AzureSql = "azure-sql",
}

export enum ResourceToDeploy {
  Spfx = "spfx",
  FrontendHosting = "frontend-hosting",
  Bot = "bot",
  Function = "azure-function",
  Apim = "apim",
  AadManifest = "aad-manifest",
}

export enum Capability {
  Notification = "notification",
  CommandBot = "command-bot",
  WorkflowBot = "workflow-bot",
  DashboardTab = "dashboard-tab",
  Tab = "tab",
  TabNonSso = "tab-non-sso",
  Bot = "bot",
  MessageExtension = "message-extension",
  M365SsoLaunchPage = "sso-launch-page",
  M365SearchApp = "search-app",
  Spfx = "tab-spfx",
  BasicTab = "tab-non-sso",
}

export enum Trigger {
  Http = "http-functions",
  Restify = "http-restify",
  Timmer = "timer-functions",
}

export enum Framework {
  React = "react",
  Minimal = "minimal",
  None = "none",
}

export class Timeout {
  /**
   * Wait a while to ensure the input is ready
   */
  public static readonly input: number = 500;

  /**
   * Wait until the command takes effect
   */
  public static readonly command: number = 4 * 60 * 1000;

  /**
   * Wait until the webView takes effect
   */
  public static readonly webView: number = 20 * 1000;

  /**
   * Wait for some time to take effect
   */
  public static readonly shortTimeWait: number = 5 * 1000;
  public static readonly shortTimeLoading: number = 30 * 1000;
  public static readonly longTimeWait: number = 60 * 1000;

  /**
   * Wait until extension is activated
   */
  public static readonly activatingExtension: number = 3 * 60 * 1000;

  /**
   * Wait until terminal exist and contains target message
   */
  public static readonly terminal: number = 12 * 60 * 1000;

  public static readonly reloadWindow: number = 60 * 1000;

  public static readonly closeDebugWindow: number = 30 * 1000;

  public static readonly copyBotTerminal: number = 30 * 1000;

  public static readonly installWait: number = 5 * 60 * 1000;
  /**
   * playwright
   */
  public static readonly chromiumLaunchTimeout: number = 1 * 60 * 1000;
  public static readonly playwrightDefaultTimeout: number = 2 * 60 * 1000;
  public static readonly playwrightConsentPageReload: number = 500;
  public static readonly playwrightBotConsentContinueButton: number =
    2 * 60 * 1000;
  public static readonly playwrightConsentPopupPage: number = 10 * 1000;
  public static readonly playwrightAddAppButton: number = 180 * 1000;

  // mocha
  public static readonly prepareTestCase: number = 10 * 60 * 1000;
  public static readonly finishTestCase: number = 10 * 60 * 1000;
  public static readonly testCase: number = 20 * 60 * 1000;
  public static readonly finishAzureTestCase: number = 15 * 60 * 1000;
  public static readonly testAzureCase: number = 45 * 60 * 1000;

  // SPFx
  public static readonly spfxProvision: number = 10 * 1000;
  public static readonly spfxDeploy: number = 4 * 60 * 1000;

  // Tab
  public static readonly tabProvision: number = 5 * 60 * 1000;
  public static readonly tabDeploy: number = 6 * 60 * 1000;

  // Bot
  public static readonly botDeploy: number = 10 * 60 * 1000;

  // Add Collaborator
  public static readonly addCollaborator: number = 60 * 1000;
}

export class TreeViewCommands {
  public static readonly CreateProjectCommand: string = "Create a New App";
  public static readonly SamplesCommand: string = "View Samples";
  public static readonly QuickStartCommand: string = "Get Started";
  public static readonly BuildTeamsPackageCommand: string =
    "Zip Teams App Package";
  public static readonly DevelopmentSectionName: string = "DEVELOPMENT";
  public static readonly DevelopmentSectionItems: string[] = [
    "Create a New App",
    "View Samples",
    "View How-to Guides",
    "Preview Your Teams App (F5)",
  ];
  public static readonly EnvSectionName: string = "ENVIRONMENT";
}

export class CommandPaletteCommands {
  public static readonly QuickStartCommand: string = "Teams: Get Started";
  public static readonly AccountsCommand: string = "Teams: Accounts";
  public static readonly SamplesCommand: string = "Teams: View Samples";
  public static readonly CreateProjectCommand: string =
    "Teams: Create a New App";
  public static readonly ManifestValidateCommand: string =
    "Teams: Validate manifest file";
  public static readonly BuildTeamsPackageCommand: string =
    "Teams: Zip Teams App Package";
  public static readonly ProvisionCommand: string = "Teams: Provision";
  public static readonly DeployCommand: string = "Teams: Deploy";
  public static readonly PublishCommand: string = "Teams: Publish";
  public static readonly CreateEnvironmentCommand: string =
    "Teams: Create New Environment";
  public static readonly DeployAadAppManifestCommand: string =
    "Teams: Update Azure Active Directory App";
  public static readonly UpgradeProjectCommand: string =
    "Teams: Upgrade Project";
  public static readonly InstallTTK: string =
    "Extensions: Install Specific Version of Extension";
}

export type OptionType =
  | "tab"
  | "tabnsso"
  | "tabbot"
  | "bot"
  | "crbot" // command and response bot (name cannot be too long or it will exceed teams app name limit)
  | "funcnoti" // functions notification bot
  | "restnoti" // restify notification bot
  | "msg"
  | "msgsa"
  | "m365lp"
  | "spfxreact"
  | "spfxnone"
  | "spfxmin"
  | "dashboard"
  | "workflow"
  | "timenoti"
  | "functimernoti"
  | "addin"
  | "importaddin";

export class FeatureFlagName {
  static readonly InsiderPreview = "__TEAMSFX_INSIDER_PREVIEW";
}

export class LocalDebugTaskLabel {
  static readonly StartLocalTunnel = "Start local tunnel";
  static readonly StartBot = "Start bot";
  static readonly StartBotApp = "Start application";
  static readonly StartFrontend = "Start frontend";
  static readonly StartApplication = "Start application";
  static readonly StartBackend = "Start backend";
  static readonly StartWebhook = "Start Incoming Webhook";
  static readonly WatchBackend = "Watch backend";
  static readonly InstallNpmPackages = "Install npm packages";
  static readonly ApiNpmInstall = "api npm install";
  static readonly BotNpmInstall = "bot npm install";
  static readonly TabsNpmInstall = "tabs npm install";
  static readonly SpfxNpmInstall = "SPFx npm install";
  static readonly GulpServe = "gulp serve";
  static readonly Azurite = "Start Azurite emulator";
  static readonly Compile = "Compile typescript";
}

export class LocalDebugTaskResult {
  static readonly FrontendSuccess = "Compiled successfully";
  static readonly StartSuccess = "started successfully";
  static readonly AzuriteSuccess = "Azurite Table service is successfully";
  static readonly CompiledSuccess = "Found 0 errors";
  static readonly BotAppSuccess = "Functions:";
  static readonly AppSuccess = "Bot Started";
  static readonly GulpServeSuccess = "Running server";
  static readonly Failed = "failed";
  static readonly Error = "error";
  static readonly DebuggerAttached = "Debugger attached";
}

export class LocalDebugTaskInfo {
  static readonly StartBotAppInfo = "App Started";
  static readonly StartBotInfo = "Bot Started";
}

export class DebugItemSelect {
  static readonly DebugUsingChrome = "Debug (Chrome)";
  static readonly DebugInTeamsUsingChrome = "Debug in Teams (Chrome)";
}

export class TestFilePath {
  static readonly configurationFolder = "env";
}

export class Notification {
  static readonly Incompatible =
    "The current project is incompatible with the installed version of Teams Toolkit.";
  static readonly TaskError =
    "There are task errors. See the output for details.";
  static readonly Upgrade =
    "Upgrade your Teams Toolkit project to stay compatible with the latest version. A backup directory will be created along with an Upgrade Summary.";
  static readonly Upgrade_dicarded =
    "Please upgrade your project to stay compatible with the latest version, your current project contains configurations from an older Teams Toolkit. The auto-upgrade process will generate backups in case an error occurs.";
  static readonly ProvisionSucceeded = "Successfully executed";
  static readonly DeploySucceeded = "Successfully executed";
  static readonly PublishSucceeded = "Successfully executed";
  static readonly UnresolvedPlaceholderError =
    "MissingEnvironmentVariablesError";
  static readonly ZipAppPackageSucceeded = "successfully built";
}

export class CreateProjectQuestion {
  static readonly Bot = "Bot";
  static readonly Tab = "Tab";
  static readonly MessageExtension = "Message Extension";
  static readonly OfficeAddin = "Outlook Add-in";
  static readonly NewTeamsApp = "Start with a Teams capability";
  static readonly SpfxSharepointFrameworkInTtk = "Install the latest SPFx";
  static readonly NewAddinApp = "Start with an Outlook add-in";
}

export class ValidationContent {
  static readonly Tab = "Hello, World";
  static readonly Bot = "Your Hello World Bot is Running";
}

export class CliVersion {
  static readonly V2TeamsToolkitStable425 = "1.2.6";
  static readonly V2TeamsToolkit400 = "1.0.0";
}
