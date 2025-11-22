import type { WebhookEvent } from "@/types";

export interface EchoesEvent extends WebhookEvent {
  message: {
    mid: string;
    text: string;
    is_echo: boolean;
  };
}
