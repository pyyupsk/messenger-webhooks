import type { WebhookEvent } from "@/types";

/**
 * Message echo event (bot's own messages echoed back)
 * Backward compatible across API v19.0 - v24.0
 * @see https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/message-echoes
 */
export interface EchoesEvent extends WebhookEvent {
  message: {
    /** Always true for echo events */
    is_echo: true;
    /** App ID of the bot that sent the message */
    app_id: number;
    /** Message ID */
    mid: string;
    /** Message text content (optional if attachments present) */
    text?: string;
    /** Message attachments */
    attachments?: Array<{
      type: "image" | "video" | "audio" | "file" | "template" | "fallback";
      payload: {
        url?: string;
        sticker_id?: number;
      };
    }>;
    /** Custom metadata (v20+, max 1000 chars, optional)
     * @since v20.0
     */
    metadata?: string;
  };
}
