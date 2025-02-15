export const CONFIGURATION_PREFIX = "fx-extension";
export enum ConfigurationKey {
  BicepEnvCheckerEnable = "prerequisiteCheck.bicep",
}

export const AzurePortalUrl = "https://portal.azure.com";
export const AzureAssignRoleHelpUrl = "https://aka.ms/teamsfx-azure-role-assignments-help-link";

export const SpfxManageSiteAdminUrl =
  "https://aka.ms/teamsfx-sharepoint-manage-site-admin-help-link";

export enum SyncedState {
  Version = "teamsToolkit:synced:version",
}

export enum UserState {
  IsExisting = "teamsToolkit:user:isExisting",
}

export enum PrereleaseState {
  Version = "teamsToolkit:prerelease:version",
}

export enum GlobalKey {
  OpenWalkThrough = "fx-extension.openWalkThrough",
  OpenReadMe = "fx-extension.openReadMe",
  OpenSampleReadMe = "fx-extension.openSampleReadMe",
  ShowLocalDebugMessage = "ShowLocalDebugMessage",
  ShowLocalPreviewMessage = "ShowLocalPreviewMessage",
}

export const environmentVariableRegex = /\${{[a-zA-Z-_]+}}/g;

export const SUPPORTED_SPFX_VERSION = "1.16.1";
export const CLI_FOR_M365 =
  "https://pnp.github.io/cli-microsoft365/cmd/spfx/project/project-upgrade/";

export const SwitchToPreReleaseVersionLink =
  "https://code.visualstudio.com/updates/v1_63#_pre-release-extensions";

export const PublishAppLearnMoreLink =
  "https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/deploy-and-publish/apps-publish-overview";

export const DeveloperPortalHomeLink = "https://dev.teams.microsoft.com/home";

export const YmlEnvNamePlaceholder = "-${{TEAMSFX_ENV}}";

export const TerminalName = "Teams Toolkit";
