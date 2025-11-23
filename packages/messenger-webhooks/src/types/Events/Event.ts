import type {
  EchoesEvent,
  MessageEvent,
  PostbackEvent,
  QuickReplyEvent,
  ReferralsEvent,
  TemplateEvent,
} from "@/types";

/**
 * Webhook entry representing events from a single page
 * Backward compatible across API v19.0 - v24.0
 * @see https://developers.facebook.com/docs/messenger-platform/reference/webhook-events
 */
export type Event = {
  /** Page ID */
  id: string;
  /** Unix timestamp in milliseconds */
  time: number;
  /** Array of messaging events */
  messaging:
    | MessageEvent[]
    | PostbackEvent[]
    | QuickReplyEvent[]
    | EchoesEvent[]
    | ReferralsEvent[]
    | TemplateEvent[];
};
