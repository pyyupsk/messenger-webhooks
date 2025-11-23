import type { WebhookEvent } from "@/types";

/**
 * Message delivery event (messages delivered to user)
 * Backward compatible across API v19.0 - v24.0
 * @see https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/message-deliveries
 */
export interface MessageDeliveryEvent extends WebhookEvent {
  delivery: {
    /** Array of delivered message IDs */
    mids?: string[];
    /** Unix timestamp of last delivered message (watermark) */
    watermark: number;
  };
}
