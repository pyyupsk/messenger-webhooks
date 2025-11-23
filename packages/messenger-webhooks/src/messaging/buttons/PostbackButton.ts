/**
 * Represents a Postback button that triggers an event to the server when clicked.
 * Backward compatible across API v19.0 - v24.0 (no schema changes)
 * @see https://developers.facebook.com/docs/messenger-platform/reference/buttons/postback
 */
export class PostbackButton {
  title: string;
  payload: string;

  /**
   * Creates a new PostbackButton.
   * @param title - The title of the button.
   * @param payload - The payload to send to the server when clicked.
   */
  constructor(title: string, payload: string) {
    if (title.length > 20) {
      throw new Error("Button title must be 20 characters or less.");
    }

    this.title = title;
    this.payload = payload;
  }

  /**
   * Converts the PostbackButton object to a JSON representation.
   * @returns The JSON representation of the PostbackButton.
   */
  toJSON(): object {
    return {
      type: "postback",
      title: this.title,
      payload: this.payload,
    };
  }
}
