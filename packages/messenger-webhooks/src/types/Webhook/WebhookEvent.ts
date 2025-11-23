/**
 * Base webhook event structure shared by all Messenger webhook events
 * Backward compatible across API v19.0 - v24.0
 * @see https://developers.facebook.com/docs/messenger-platform/reference/webhook-events
 */
export type WebhookEvent = {
  /** Sender information */
  sender: Sender;
  /** Recipient information (the bot/page) */
  recipient: Recipient;
  /** Unix timestamp in milliseconds */
  timestamp: number;
};

/**
 * Sender information
 * Contains user-scoped page ID (PSID)
 */
type Sender = {
  /** Page-scoped user ID (PSID) */
  id: string;
  /** Whether the sender is a guest user (v21+, optional)
   * @since v21.0
   */
  is_guest_user?: boolean;
};

/**
 * Recipient information
 * Contains the bot/page ID
 */
type Recipient = {
  /** Page ID */
  id: string;
};
