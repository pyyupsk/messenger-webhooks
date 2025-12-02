import type { WebhookEvent } from "@/types";

/**
 * Quick reply event (user clicked a quick reply button)
 * Backward compatible across API v19.0 - v24.0
 *
 * @see https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messages
 */
export interface QuickReplyEvent extends WebhookEvent {
  message: {
    /**
     * Message ID
     */
    mid: string;
    /**
     * Text content of the quick reply
     */
    text: string;
    /**
     * Quick reply payload data
     */
    quick_reply: {
      /**
       * Custom payload associated with the quick reply
       */
      payload: string;
    };
  };
}
