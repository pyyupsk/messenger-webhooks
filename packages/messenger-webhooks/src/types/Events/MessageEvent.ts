import type { WebhookEvent } from "@/types";

/**
 * Message event (user sent a message)
 * Backward compatible across API v19.0 - v24.0
 *
 * @see https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messages
 */
export interface MessageEvent extends WebhookEvent {
  message: {
    /**
     * Message ID
     */
    mid: string;
    /**
     * Message text content (optional if attachments present)
     */
    text?: string;
    /**
     * Message attachments (images, videos, files, etc.)
     */
    attachments?: Array<{
      type: "image" | "video" | "audio" | "file" | "template" | "fallback";
      payload: {
        url?: string;
        sticker_id?: number;
      };
    }>;
    /**
     * Quick reply payload if user clicked a quick reply
     */
    quick_reply?: {
      payload: string;
    };
    /**
     * Reply to another message
     */
    reply_to?: {
      mid: string;
    };
    /**
     * Whether this message was deleted (v22+, optional)
     *
     * @since v22.0
     */
    is_deleted?: boolean;
    /**
     * Whether this is an echo of bot's own message
     */
    is_echo?: boolean;
  };
}
