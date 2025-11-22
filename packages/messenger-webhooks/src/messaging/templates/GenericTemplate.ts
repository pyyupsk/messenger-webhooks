import type { Button } from "@/messaging";

export class GenericElement {
  title: string;
  subtitle?: string;
  image_url?: string;
  default_action?: {
    type: string;
    url: string;
    webview_height_ratio: string;
  };
  buttons: Button[] = [];

  /**
   * Creates a new GenericElement.
   * @param title - The title of the element. Must be 80 characters or less.
   * @throws Error if the title exceeds 80 characters.
   */
  constructor(title: string) {
    if (title.length > 80) {
      throw new Error("Title must be 80 characters or less.");
    }

    this.title = title;
  }

  /**
   * Sets the subtitle of the GenericElement.
   * @param subtitle - The subtitle to set. Must be 80 characters or less.
   * @returns The current instance of GenericElement.
   * @throws Error if the subtitle exceeds 80 characters.
   */
  setSubtitle(subtitle: string): this {
    if (subtitle.length > 80) {
      throw new Error("Subtitle must be 80 characters or less.");
    }
    this.subtitle = subtitle;
    return this;
  }

  /**
   * Sets the image URL of the GenericElement.
   * @param image_url - The image URL to set.
   * @returns The current instance of GenericElement.
   */
  setImageUrl(image_url: string): this {
    this.image_url = image_url;
    return this;
  }

  /**
   * Sets the default action of the GenericElement.
   * @param default_action - The default action object to set.
   * @returns The current instance of GenericElement.
   */
  setDefaultAction(default_action: {
    type: string;
    url: string;
    webview_height_ratio: string;
  }): this {
    this.default_action = default_action;
    return this;
  }

  /**
   * Adds buttons to the GenericElement. A maximum of 3 buttons can be added.
   * @param buttons - An array of Button objects to add.
   * @returns The current instance of GenericElement.
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
   * Converts the GenericElement into a JSON object.
   * @returns The GenericElement as a JSON object.
   */
  toJSON(): object {
    return {
      title: this.title,
      subtitle: this.subtitle,
      image_url: this.image_url,
      default_action: this.default_action,
      buttons: this.buttons,
    };
  }
}

export class GenericTemplate {
  elements: GenericElement[] = [];
  sharable: boolean;

  /**
   * Creates a new GenericTemplate.
   * @param options - The options for creating the GenericTemplate.
   * @param options.sharable - Whether the template is sharable. Defaults to false.
   */
  constructor({ sharable = false }: { sharable?: boolean } = {}) {
    this.elements = [];
    this.sharable = sharable;
  }

  /**
   * Adds an element to the GenericTemplate. A maximum of 10 elements can be added.
   * @param element - The GenericElement to add.
   * @returns The current instance of GenericTemplate.
   * @throws Error if adding the element exceeds the maximum of 10 elements.
   */
  addElement(element: GenericElement[]): this {
    if (this.elements.length >= 10) {
      throw new Error("Generic template supports a maximum of 10 elements");
    }
    this.elements.push(...element);
    return this;
  }

  /**
   * Converts the GenericTemplate into a JSON object.
   * @returns The GenericTemplate as a JSON object.
   */
  toJSON(): object {
    return {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: this.elements,
          sharable: this.sharable,
        },
      },
    };
  }
}
