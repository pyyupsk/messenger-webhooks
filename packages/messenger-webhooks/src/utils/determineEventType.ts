import type {
  EchoesEvent,
  EventType,
  MessageEvent,
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
  | ReferralsEvent;

/**
 * Determines the event type based on the structure of the event object.
 * @param event - The event object to evaluate.
 * @returns The event type or 'unknown' if none match.
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
  }
  return "unknown";
}
