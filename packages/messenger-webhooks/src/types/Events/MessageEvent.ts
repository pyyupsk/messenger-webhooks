import type { WebhookEvent } from "@/types";

export interface MessageEvent extends WebhookEvent {
  message: {
    mid: string;
    text: string;
    quick_reply?: {
      payload: string;
    };
    is_echo?: boolean;
  };
}
