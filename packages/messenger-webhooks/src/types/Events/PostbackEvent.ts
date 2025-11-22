import type { WebhookEvent } from "@/types";

export interface PostbackEvent extends WebhookEvent {
  postback: {
    title: string;
    payload: string;
  };
}
