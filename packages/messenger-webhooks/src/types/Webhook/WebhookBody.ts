import type { Event } from "@/types";

export type WebhookBody = {
  object: string;
  entry: Event[];
};
