// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  FxError,
  LogLevel,
  LogProvider,
  PermissionRequestProvider,
  Result,
  TelemetryReporter,
  UserInteraction,
  ok,
} from "@microsoft/teamsfx-api";
import faker from "faker";
import { DEFAULT_PERMISSION_REQUEST } from "../../../../src/component/constants";
import { AppUser } from "../../../../src/component/driver/teamsApp/interfaces/appdefinitions/appUser";
import { MockUserInteraction } from "../../../core/utils";

const mockPermissionRequestProvider: PermissionRequestProvider = {
  async checkPermissionRequest(): Promise<Result<undefined, FxError>> {
    return ok(undefined);
  },
  async getPermissionRequest(): Promise<Result<string, FxError>> {
    return ok(JSON.stringify(DEFAULT_PERMISSION_REQUEST));
  },
};

const mockLogProvider: LogProvider = {
  async log(logLevel: LogLevel, message: string): Promise<boolean> {
    console.log("Log log");
    console.log(message);
    return true;
  },
  async info(message: string | Array<any>): Promise<boolean> {
    console.log("Log info");
    console.log(message);
    return true;
  },
  async debug(message: string): Promise<boolean> {
    console.log("Log debug");
    console.log(message);
    return true;
  },
  async error(message: string): Promise<boolean> {
    console.log("Log error");
    console.error(message);
    return true;
  },
  async trace(message: string): Promise<boolean> {
    console.log("Log trace");
    console.log(message);
    return true;
  },
  async warning(message: string): Promise<boolean> {
    console.log("Log warning");
    console.log(message);
    return true;
  },
  async fatal(message: string): Promise<boolean> {
    console.log("Log fatal");
    console.log(message);
    return true;
  },
  getLogFilePath(): string {
    return "";
  },
};

const mockUI: UserInteraction = new MockUserInteraction();

const mockTelemetryReporter: TelemetryReporter = {
  async sendTelemetryEvent(
    eventName: string,
    properties?: { [key: string]: string },
    measurements?: { [key: string]: number }
  ) {
    console.log("Telemetry event");
    console.log(eventName);
    console.log(properties);
  },

  async sendTelemetryErrorEvent(
    eventName: string,
    properties?: { [key: string]: string },
    measurements?: { [key: string]: number }
  ) {
    console.log("Telemetry Error");
    console.log(eventName);
    console.log(properties);
  },

  async sendTelemetryException(
    error: Error,
    properties?: { [key: string]: string },
    measurements?: { [key: string]: number }
  ) {
    console.log("Telemetry Exception");
    console.log(error.message);
    console.log(properties);
  },
};

const userList: AppUser = {
  tenantId: faker.datatype.uuid(),
  aadId: faker.datatype.uuid(),
  displayName: "displayName",
  userPrincipalName: "userPrincipalName",
  isAdministrator: true,
};

export class TestHelper {
  // TODO: update type
  static async pluginContext(
    // eslint-disable-next-line @typescript-eslint/ban-types
    config?: object,
    frontend = true,
    bot = true,
    isLocalDebug = false
  ) {
    let domain: string | undefined = undefined;
    let endpoint: string | undefined = undefined;
    if (frontend) {
      domain = faker.internet.domainName();
      endpoint = "https://" + domain;
    }

    let botId: string | undefined = undefined;
    let botEndpoint: string | undefined = undefined;
    if (bot) {
      botId = faker.datatype.uuid();
      botEndpoint = "https://botendpoint" + botId + ".test";
    }

    const configOfOtherPlugins = new Map();

    const pluginContext: any = {
      logProvider: mockLogProvider,
      ui: mockUI,
      telemetryReporter: mockTelemetryReporter,
      config: config,
      envInfo: {
        envName: "dev",
        config: {
          manifest: {
            appName: {
              short: "teamsfx_app",
            },
            description: {
              short: `Short description of teamsfx_app`,
              full: `Full description of teamsfx_app`,
            },
            icons: {
              color: "resources/color.png",
              outline: "resources/outline.png",
            },
          },
        },
        state: configOfOtherPlugins,
      },
      projectSettings: {
        appName: "aad-plugin-unit-test",
        solutionSettings: {
          capabilities: ["Tab"],
          hostType: "Azure",
          azureResources: [],
          activeResourcePlugins: ["fx-resource-aad-app-for-teams"],
        },
        components: [{ name: "teams-tab" }, { name: "aad-app" }],
      },
      permissionRequestProvider: mockPermissionRequestProvider,
    } as any;

    const localSettings: any = {
      teamsApp: new Map(),
      auth: new Map(),
    };
    if (frontend) {
      localSettings.frontend = new Map([
        ["tabDomain", domain],
        ["tabEndpoint", endpoint],
      ]);
    }
    if (bot) {
      localSettings.bot = new Map([
        ["botEndpoint", botEndpoint],
        ["botId", botId],
      ]);
    }
    pluginContext.localSettings = localSettings;

    return pluginContext;
  }
}
