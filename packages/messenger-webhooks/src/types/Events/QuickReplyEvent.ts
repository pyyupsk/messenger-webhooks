import type { WebhookEvent } from "@/types";

export interface QuickReplyEvent extends WebhookEvent {
  message: {
    mid: string;
    text: string;
    quick_reply: {
      payload: string;
    };
  };
}
