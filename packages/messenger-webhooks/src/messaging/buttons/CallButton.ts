/**
 * Represents a Call button that initiates a phone call when clicked.
 * Backward compatible across API v19.0 - v24.0 (no schema changes)
 * @see https://developers.facebook.com/docs/messenger-platform/reference/buttons/call
 */
export class CallButton {
  title: string;
  phone_number: string;

  /**
   * Creates a new CallButton.
   * @param title - The title of the button.
   * @param phone_number - The phone number to call when clicked.
   */
  constructor(title: string, phone_number: string) {
    if (title.length > 20) {
      throw new Error("Button title must be 20 characters or less.");
    }

    this.title = title;
    this.phone_number = phone_number;
  }

  /**
   * Converts the CallButton object to a JSON representation.
   * @returns The JSON representation of the CallButton.
   */
  toJSON(): object {
    return {
      type: "phone_number",
      title: this.title,
      payload: this.phone_number,
    };
  }
}
