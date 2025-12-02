/**
 * Index file for exporting all type definitions used in the library.
 */

import type { APIVersion } from "../constants";

export * from "./Events";
export * from "./Webhook";

/**
 * Configuration options for initializing the Bot
 *
 * @see https://developers.facebook.com/docs/messenger-platform/
 */
export type BotConfig = {
  /**
   * Facebook Page access token
   *
   * @see https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup
   */
  accessToken: string;

  /**
   * Webhook verification token (must match webhook settings in Facebook App)
   *
   * @see https://developers.facebook.com/docs/messenger-platform/getting-started/webhook-setup
   */
  verifyToken: string;

  /**
   * Server port for webhook endpoint
   *
   * @default 8080
   */
  port?: number;

  /**
   * Webhook endpoint path
   *
   * @default "/webhook"
   */
  endpoint?: string;

  /**
   * Facebook Graph API version to use
   * Defaults to v24.0 for optimal compatibility and features
   *
   * @default "v24.0"
   * @see https://developers.facebook.com/docs/graph-api/changelog
   */
  version?: APIVersion;
};
