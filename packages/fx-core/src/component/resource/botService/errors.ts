// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @author zhijie <zhihuan@microsoft.com>
 */
import { ErrorNames } from "./constants";
import { Messages } from "./messages";
import { getDefaultString, getLocalizedString } from "../../../common/localizeUtils";
import { UserError } from "@microsoft/teamsfx-api";
import { CreateAppError, CreateSecretError } from "../aadApp/errors";
import { GraphErrorCodes } from "../aadApp/errorCodes";
import { HelpLinks } from "../../../common/constants";

export const ErrorType = {
  USER: "User",
  SYSTEM: "System",
} as const;

export type ErrorType = typeof ErrorType[keyof typeof ErrorType];

export type InnerError = HttpError | Error | ErrorWithMessage | ErrorWithCode | unknown;

export type HttpError = {
  response: {
    status?: number;
    data?: {
      errorMessage?: string;
      error?: {
        code?: string;
        message?: string;
      };
      errors?: any;
    };
  };
};

export type ErrorWithMessage = {
  message: string;
};

export type ErrorWithCode = {
  code: string;
};

export function isHttpError(e: InnerError): e is HttpError {
  return e instanceof Object && "response" in e;
}

export function isErrorWithMessage(e: InnerError): e is ErrorWithMessage {
  return e instanceof Object && "message" in e;
}

export function isPluginError(e: unknown): e is PluginError {
  return e instanceof Object && "innerError" in e;
}

function resolveInnerError(target: PluginError, helpLinkMap: Map<string, string>): void {
  if (!target.innerError) return;

  const statusCode = isHttpError(target.innerError) ? target.innerError.response?.status : 500;
  if (statusCode) {
    if (statusCode >= 400 && statusCode < 500) {
      target.errorType = ErrorType.USER;
    } else {
      target.errorType = ErrorType.SYSTEM;
    }
  }

  if (isHttpError(target.innerError)) {
    const errorCode = target.innerError.response?.data?.error?.code;
    if (errorCode) {
      const helpLink = helpLinkMap.get(errorCode);
      if (helpLink) target.helpLink = helpLink;
    }
    // Try to concat error messages in response payload to expose specific reasons.
    // Based on https://learn.microsoft.com/en-us/graph/errors
    const errorMessage = target.innerError.response.data?.error?.message;
    if (errorMessage) {
      target.details[0] += errorMessage;
    }
  }
}

export class PluginError extends Error {
  public name: string;
  public details: [string, string];
  public suggestions: string[];
  public errorType: ErrorType;
  public innerError?: InnerError;
  public helpLink?: string;

  constructor(
    type: ErrorType,
    name: string,
    details: [string, string],
    suggestions: string[],
    innerError?: InnerError,
    helpLink?: string
  ) {
    super(details[0]);
    this.name = name;
    this.details = details;
    this.suggestions = suggestions;
    this.errorType = type;
    this.innerError = innerError;
    this.helpLink = helpLink;
    Object.setPrototypeOf(this, PluginError.prototype);
  }

  genMessage(): string {
    let msg = `${this.details[0]} `;
    if (this.suggestions.length > 0) {
      msg += getDefaultString("plugins.bot.ErrorSuggestions", this.suggestions.join(" "));
    }
    return msg;
  }
  genDisplayMessage(): string {
    let msg = `${this.details[1]} `;
    if (this.suggestions.length > 0) {
      msg += getLocalizedString("plugins.bot.ErrorSuggestions", this.suggestions.join(" "));
    }
    return msg;
  }
}

export class CreateAADAppError extends PluginError {
  constructor(innerError?: InnerError) {
    super(ErrorType.USER, CreateAppError.name, CreateAppError.message(), [], innerError);
    resolveInnerError(this, GraphErrorCodes);
  }
}

export class CreateAADSecretError extends PluginError {
  constructor(innerError?: InnerError) {
    super(ErrorType.USER, CreateSecretError.name, CreateSecretError.message(), [], innerError);
    resolveInnerError(this, GraphErrorCodes);
  }
}

export class ProvisionError extends PluginError {
  constructor(resource: string, innerError?: InnerError) {
    super(
      ErrorType.USER,
      ErrorNames.PROVISION_ERROR,
      Messages.FailToProvisionSomeResource(resource),
      [Messages.CheckOutputLogAndTryToFix, Messages.RetryTheCurrentStep],
      innerError
    );
  }
}

export class ConfigUpdatingError extends PluginError {
  constructor(configName: string, innerError?: InnerError) {
    super(
      ErrorType.USER,
      ErrorNames.CONFIG_UPDATING_ERROR,
      Messages.FailToUpdateConfigs(configName),
      [Messages.CheckOutputLogAndTryToFix, Messages.RetryTheCurrentStep],
      innerError
    );
  }
}

export class BotRegistrationNotFoundError extends PluginError {
  constructor(botId: string, innerError?: InnerError) {
    super(
      ErrorType.USER,
      ErrorNames.BOT_REGISTRATION_NOTFOUND_ERROR,
      Messages.BotRegistrationNotFoundWith(botId),
      [Messages.CheckOutputLogAndTryToFix],
      innerError
    );
  }
}

export class BotFrameworkNotAllowedToAcquireTokenError extends PluginError {
  constructor() {
    super(
      ErrorType.USER,
      ErrorNames.ACQUIRE_BOT_FRAMEWORK_TOKEN_ERROR,
      Messages.NotAllowedToAcquireBotFrameworkToken(),
      [Messages.CheckOutputLogAndTryToFix]
    );
  }
}

export class BotFrameworkForbiddenResultError extends PluginError {
  constructor() {
    super(
      ErrorType.USER,
      ErrorNames.FORBIDDEN_RESULT_BOT_FRAMEWORK_ERROR,
      Messages.BotProvisionReturnsForbiddenResult(),
      [Messages.CheckOutputLogAndTryToFix, Messages.RetryTheCurrentStep]
    );
  }
}

export class BotFrameworkConflictResultError extends PluginError {
  constructor() {
    super(
      ErrorType.USER,
      ErrorNames.CONFLICT_RESULT_BOT_FRAMEWORK_ERROR,
      Messages.BotProvisionReturnsConflictResult(),
      [Messages.CheckOutputLogAndTryToFix, Messages.RetryTheCurrentStep]
    );
  }
}

export const AlreadyCreatedBotNotExist = (botId: string | undefined, innerError: any) => {
  return new UserError({
    source: "RegisterBot",
    name: "AlreadyCreatedBotNotExist",
    message: getLocalizedString(
      "plugins.bot.FailedToGetAlreadyCreatedBot",
      botId,
      HelpLinks.SwitchAccountOrSub
    ),
    displayMessage: getLocalizedString(
      "plugins.bot.FailedToGetAlreadyCreatedBot",
      botId,
      HelpLinks.SwitchAccountOrSub
    ),
    error: innerError,
  });
};

export class PreconditionError extends PluginError {
  constructor(name: string) {
    super(ErrorType.USER, ErrorNames.PRECONDITION_ERROR, Messages.SomethingIsMissing(name), [
      Messages.RetryTheCurrentStep,
    ]);
  }
}

export function CheckThrowSomethingMissing<T>(name: string, value: T | undefined): T {
  if (!value) {
    throw new PreconditionError(name);
  }
  return value;
}
