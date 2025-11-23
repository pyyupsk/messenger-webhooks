import type { WebhookEvent } from "@/types";

/**
 * Message read event (user read messages up to a watermark)
 * Backward compatible across API v19.0 - v24.0
 * @see https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/message-reads
 */
export interface MessageReadEvent extends WebhookEvent {
  read: {
    /** Unix timestamp of last read message (watermark) */
    watermark: number;
  };
}
