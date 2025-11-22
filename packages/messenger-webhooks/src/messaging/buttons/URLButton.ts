/**
 * Represents a URL button that opens a web page when clicked.
 * Extends the Button class.
 */
export class URLButton {
  title: string;
  url: string;
  webview_height_ratio?: "compact" | "tall" | "full";
  messenger_extensions?: boolean;
  fallback_url?: string;
  webview_share_button?: "hide" | "show";

  /**
   * Creates a new URLButton.
   * @param title - The title of the button.
   * @param url - The URL to open when the button is clicked.
   */
  constructor(title: string, url: string) {
    if (title.length > 20) {
      throw new Error("Button title must be 20 characters or less.");
    }

    this.title = title;
    this.url = url;
  }

  /**
   * Sets the height ratio for the webview.
   * @param webview_height_ratio - The height ratio of the webview.
   * @returns The current instance of the URLButton.
   */
  setWebviewHeightRatio(
    webview_height_ratio: "compact" | "tall" | "full",
  ): this {
    this.webview_height_ratio = webview_height_ratio;
    return this;
  }

  /**
   * Enables or disables Messenger extensions.
   * @param messenger_extensions - Whether to enable Messenger extensions.
   * @returns The current instance of the URLButton.
   */
  setMessengerExtensions(messenger_extensions: boolean): this {
    this.messenger_extensions = messenger_extensions;
    return this;
  }

  /**
   * Sets a fallback URL if Messenger extensions are not supported.
   * @param fallback_url - The fallback URL.
   * @returns The current instance of the URLButton.
   */
  setFallbackUrl(fallback_url: string): this {
    this.fallback_url = fallback_url;
    return this;
  }

  /**
   * Hides or shows the webview share button.
   * @param webview_share_button - Whether to hide or show the share button.
   * @returns The current instance of the URLButton.
   */
  setWebviewShareButton(webview_share_button: "hide" | "show"): this {
    this.webview_share_button = webview_share_button;
    return this;
  }

  /**
   * Converts the URLButton object to a JSON representation.
   * @returns The JSON representation of the URLButton.
   */
  toJSON(): object {
    return {
      type: "web_url",
      title: this.title,
      url: this.url,
      webview_height_ratio: this.webview_height_ratio,
      messenger_extensions: this.messenger_extensions,
      fallback_url: this.fallback_url,
      webview_share_button: this.webview_share_button,
    };
  }
}
