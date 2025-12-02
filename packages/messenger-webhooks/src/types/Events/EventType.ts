/**
 * Supported webhook event types across API v19.0 - v24.0
 *
 * @see https://developers.facebook.com/docs/messenger-platform/reference/webhook-events
 */
export type EventType =
  | "message"
  | "postback"
  | "quick_reply"
  | "template"
  | "referral"
  | "echo"
  | "reaction" // NEW in v20+: Message reactions
  | "message_reads" // Message read receipts
  | "message_deliveries" // Message delivery confirmations
  | "unknown";
