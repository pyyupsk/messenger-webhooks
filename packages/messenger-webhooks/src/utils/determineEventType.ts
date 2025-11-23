import type {
  EchoesEvent,
  EventType,
  MessageDeliveryEvent,
  MessageEvent,
  MessageReactionEvent,
  MessageReadEvent,
  PostbackEvent,
  QuickReplyEvent,
  ReferralsEvent,
  TemplateEvent,
} from "@/types";

type Event =
  | MessageEvent
  | QuickReplyEvent
  | EchoesEvent
  | PostbackEvent
  | TemplateEvent
  | ReferralsEvent
  | MessageReactionEvent
  | MessageReadEvent
  | MessageDeliveryEvent;

/**
 * Determines the event type based on the structure of the event object.
 * Updated for API v19.0 - v24.0 compatibility
 * @param event - The event object to evaluate.
 * @returns The event type or 'unknown' if none match.
 * @see https://developers.facebook.com/docs/messenger-platform/reference/webhook-events
 */
export function determineEventType(event: Event): EventType {
  if ("message" in event) {
    if ("quick_reply" in event.message) {
      return "quick_reply";
    } else if ("is_echo" in event.message) {
      return "echo";
    }
    return "message";
  } else if ("postback" in event) {
    return "postback";
  } else if ("template" in event) {
    return "template";
  } else if ("referral" in event) {
    return "referral";
  } else if ("reaction" in event) {
    return "reaction"; // v20+
  } else if ("read" in event) {
    return "message_reads";
  } else if ("delivery" in event) {
    return "message_deliveries";
  }
  return "unknown";
}
