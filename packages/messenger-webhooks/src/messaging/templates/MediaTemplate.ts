import type { Button } from "@/messaging";

type MediaType = "image" | "video";

export class MediaElement {
  media_type: MediaType;
  attachment_id?: string;
  url?: string;
  buttons: Button[] = [];

  /**
   * Creates a new MediaElement.
   * @param media_type - The type of media (image or video).
   */
  constructor(media_type: MediaType) {
    this.media_type = media_type;
  }

  /**
   * Sets the attachment ID for the MediaElement.
   * @param attachment_id - The attachment ID to set.
   * @returns The current instance of MediaElement.
   * @throws Error if both attachment_id and url are set.
   */
  setAttachmentId(attachment_id: string): this {
    if (this.url) {
      throw new Error("Cannot set both attachment_id and url");
    }

    this.attachment_id = attachment_id;
    return this;
  }

  /**
   * Sets the URL for the MediaElement.
   * @param url - The URL to set.
   * @returns The current instance of MediaElement.
   * @throws Error if both attachment_id and url are set.
   */
  setUrl(url: string): this {
    if (this.attachment_id) {
      throw new Error("Cannot set both attachment_id and url");
    }

    this.url = url;
    return this;
  }

  /**
   * Adds buttons to the MediaElement. A maximum of 3 buttons can be added.
   * @param buttons - An array of Button objects to add.
   * @returns The current instance of MediaElement.
   * @throws Error if adding the buttons exceeds the maximum of 3 buttons.
   */
  addButtons(buttons: Button[]): this {
    if (this.buttons && this.buttons.length + buttons.length > 3) {
      throw new Error("Button template can have a maximum of 3 buttons.");
    }
    this.buttons = this.buttons ? [...this.buttons, ...buttons] : buttons;
    return this;
  }

  /**
   * Converts the MediaElement into a JSON object.
   * @returns The MediaElement as a JSON object.
   */
  toJSON(): object {
    return {
      media_type: this.media_type,
      ...(this.attachment_id && { attachment_id: this.attachment_id }),
      ...(this.url && { url: this.url }),
      buttons: this.buttons,
    };
  }
}

export class MediaTemplate {
  elements: MediaElement[] = [];
  sharable: boolean;

  /**
   * Creates a new MediaTemplate.
   * @param options - The options for creating the MediaTemplate.
   * @param options.sharable - Whether the template is sharable. Defaults to false.
   */
  constructor({ sharable = false }: { sharable?: boolean } = {}) {
    this.sharable = sharable;
  }

  /**
   * Adds an element to the MediaTemplate.
   * @param element - The MediaElement to add.
   * @returns The current instance of MediaTemplate.
   */
  addElement(element: MediaElement): this {
    this.elements.push(element);
    return this;
  }

  /**
   * Converts the MediaTemplate into a JSON object.
   * @returns The MediaTemplate as a JSON object.
   */
  toJSON(): object {
    return {
      attachment: {
        type: "template",
        payload: {
          template_type: "media",
          elements: this.elements,
          sharable: this.sharable,
        },
      },
    };
  }
}
