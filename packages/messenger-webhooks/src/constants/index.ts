/**
 * Constant values used throughout the library.
 */

/** The base URL for the Facebook Graph API */
export const GRAPH_URL: string = "https://graph.facebook.com";

/**
 * Supported Facebook Graph API versions for Messenger Platform
 * @see https://developers.facebook.com/docs/graph-api/changelog
 */
export const API_VERSIONS = {
  V19_0: "v19.0",
  V20_0: "v20.0",
  V21_0: "v21.0",
  V22_0: "v22.0",
  V23_0: "v23.0",
  V24_0: "v24.0",
} as const;

/**
 * Type representing all supported API versions
 */
export type APIVersion = (typeof API_VERSIONS)[keyof typeof API_VERSIONS];

/**
 * Default API version used when not explicitly specified
 * Updated to v24.0 as of library version 2.0.0
 */
export const DEFAULT_API_VERSION: APIVersion = API_VERSIONS.V24_0;
