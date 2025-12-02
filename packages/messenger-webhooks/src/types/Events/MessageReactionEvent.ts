import type { WebhookEvent } from "@/types";

/**
 * Message reaction event (user reacted to a message with emoji)
 * Available in API v20.0+
 *
 * @see https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/message-reactions
 * @since v20.0
 */
export interface MessageReactionEvent extends WebhookEvent {
  reaction: {
    /**
     * Message ID that was reacted to
     */
    mid: string;
    /**
     * Action type: 'react' (added reaction) or 'unreact' (removed reaction)
     */
    action: "react" | "unreact";
    /**
     * Emoji used for reaction (present when action='react')
     */
    reaction?: string;
    /**
     * Deprecated alias for reaction field
     */
    emoji?: string;
  };
}
