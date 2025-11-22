import type {
  MessageEvent,
  PostbackEvent,
  QuickReplyEvent,
  TemplateEvent,
} from "@/types";

export type Event = {
  id: string;
  time: number;
  messaging:
    | MessageEvent[]
    | PostbackEvent[]
    | QuickReplyEvent[]
    | TemplateEvent[];
};
