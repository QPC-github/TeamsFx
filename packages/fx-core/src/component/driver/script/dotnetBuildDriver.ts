// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * @owner fanhu <fanhu@microsoft.com>
 */

import { BaseBuildDriver } from "./baseBuildDriver";
import { Service } from "typedi";
import { DriverContext } from "../interface/commonArgs";
import { FxError, Result } from "@microsoft/teamsfx-api";
import { hooks } from "@feathersjs/hooks";
import { addStartAndEndTelemetry } from "../middleware/addStartAndEndTelemetry";
import { TelemetryConstant } from "../../constant/commonConstant";
import { BaseBuildStepDriver } from "./baseBuildStepDriver";
import { getLocalizedString } from "../../../common/localizeUtils";

const ACTION_NAME = "cli/runDotnetCommand";

@Service(ACTION_NAME)
export class DotnetBuildDriver extends BaseBuildStepDriver {
  readonly description: string = getLocalizedString("driver.script.dotnetDescription");

  getImpl(args: unknown, context: DriverContext): BaseBuildDriver {
    return new DotnetBuildDriverImpl(
      args,
      context,
      "https://aka.ms/teamsfx-actions/cli-run-dotnet-command"
    );
  }

  @hooks([addStartAndEndTelemetry(ACTION_NAME, TelemetryConstant.SCRIPT_COMPONENT)])
  async run(args: unknown, context: DriverContext): Promise<Result<Map<string, string>, FxError>> {
    return super.run(args, context);
  }
}

export class DotnetBuildDriverImpl extends BaseBuildDriver {
  buildPrefix = "dotnet";
}
