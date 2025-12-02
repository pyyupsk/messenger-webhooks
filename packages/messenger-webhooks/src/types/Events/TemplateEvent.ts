import type { CallButton, PostbackButton, URLButton } from "@/messaging";
import type { WebhookEvent } from "@/types";

/**
 * Template event received when a user interacts with a template message.
 *
 * Backward compatible across API v19.0 - v24.0.
 *
 * @see https://developers.facebook.com/docs/messenger-platform/reference/webhook-events
 */
export interface TemplateEvent extends WebhookEvent {
  template: {
    template_type: string;
    text: string;
    buttons: CallButton[] | PostbackButton[] | URLButton[];
  };
}
