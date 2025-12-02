import type { Event } from "@/types";

/**
 * Facebook Messenger webhook request body structure
 * Backward compatible across API v19.0 - v24.0
 *
 * @see https://developers.facebook.com/docs/messenger-platform/webhook
 */
export type WebhookBody = {
  /**
   * Always "page" for Messenger webhooks
   */
  object: string;
  /**
   * Array of webhook entries, one per page
   */
  entry: Event[];
};
