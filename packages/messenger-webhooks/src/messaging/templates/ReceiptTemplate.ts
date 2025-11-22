type Address = {
  street_1: string;
  street_2?: string;
  city: string;
  postal_code: string;
  state: string;
  country: string;
};

type Summary = {
  subtotal?: number;
  shipping_cost?: number;
  total_tax?: number;
  total_cost: number;
};

type Adjustment = {
  name: string;
  amount: number;
};

export class ReceiptElement {
  title: string;
  subtitle?: string;
  quantity?: number;
  price: number;
  currency?: string;
  image_url?: string;

  /**
   * Creates a new ReceiptElement.
   * @param title - The title of the element.
   * @param price - The price of the element.
   */
  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }

  /**
   * Sets the subtitle of the ReceiptElement.
   * @param subtitle - The subtitle to set.
   * @returns The current instance of ReceiptElement.
   */
  setSubtitle(subtitle: string): this {
    this.subtitle = subtitle;
    return this;
  }

  /**
   * Sets the quantity of the ReceiptElement.
   * @param quantity - The quantity to set.
   * @returns The current instance of ReceiptElement.
   */
  setQuantity(quantity: number): this {
    this.quantity = quantity;
    return this;
  }

  /**
   * Sets the currency of the ReceiptElement.
   * @param currency - The currency to set.
   * @returns The current instance of ReceiptElement.
   */
  setCurrency(currency: string): this {
    this.currency = currency;
    return this;
  }

  /**
   * Sets the image URL of the ReceiptElement.
   * @param imageUrl - The image URL to set.
   * @returns The current instance of ReceiptElement.
   */
  setImageUrl(imageUrl: string): this {
    this.image_url = imageUrl;
    return this;
  }

  /**
   * Converts the ReceiptElement into a JSON object.
   * @returns The ReceiptElement as a JSON object.
   */
  toJSON(): object {
    return {
      title: this.title,
      subtitle: this.subtitle,
      quantity: this.quantity,
      price: this.price,
      currency: this.currency,
      image_url: this.image_url,
    };
  }
}

export class ReceiptTemplate {
  sharable?: boolean;
  recipient_name: string;
  merchant_name?: string;
  order_number: string;
  order_url?: string;
  currency: string;
  payment_method: string;
  timestamp?: number;
  elements: ReceiptElement[];
  address?: Address;
  summary: Summary;
  adjustments?: Adjustment[];

  /**
   * Creates a new ReceiptTemplate.
   * @param recipient_name - The name of the recipient.
   * @param order_number - The order number.
   * @param currency - The currency used.
   * @param payment_method - The payment method used.
   * @param options - Additional options for the ReceiptTemplate.
   * @param options.sharable - Whether the template is sharable. Defaults to false.
   */
  constructor(
    recipient_name: string,
    order_number: string,
    currency: string,
    payment_method: string,
    { sharable = false }: { sharable?: boolean } = {},
  ) {
    this.recipient_name = recipient_name;
    this.order_number = order_number;
    this.currency = currency;
    this.payment_method = payment_method;
    this.sharable = sharable;
    this.elements = [];
    this.summary = { total_cost: 0 };
  }

  /**
   * Sets the merchant name for the ReceiptTemplate.
   * @param merchant_name - The merchant name to set.
   * @returns The current instance of ReceiptTemplate.
   */
  setMerchantName(merchant_name: string): this {
    this.merchant_name = merchant_name;
    return this;
  }

  /**
   * Sets the order URL for the ReceiptTemplate.
   * @param order_url - The order URL to set.
   * @returns The current instance of ReceiptTemplate.
   */
  setOrderUrl(order_url: string): this {
    this.order_url = order_url;
    return this;
  }

  /**
   * Sets the timestamp for the ReceiptTemplate.
   * @param timestamp - The timestamp to set.
   * @returns The current instance of ReceiptTemplate.
   */
  setTimestamp(timestamp: number): this {
    this.timestamp = timestamp;
    return this;
  }

  /**
   * Sets the address for the ReceiptTemplate.
   * @param address - The address object to set.
   * @returns The current instance of ReceiptTemplate.
   */
  setAddress(address: Address): this {
    this.address = address;
    return this;
  }

  /**
   * Sets the summary for the ReceiptTemplate.
   * @param summary - The summary object to set.
   * @returns The current instance of ReceiptTemplate.
   */
  setSummary(summary: Summary): this {
    this.summary = { ...this.summary, ...summary };
    return this;
  }

  /**
   * Adds an adjustment to the ReceiptTemplate.
   * @param adjustment - The adjustment object to add.
   * @returns The current instance of ReceiptTemplate.
   */
  addAdjustment(adjustment: Adjustment[]): this {
    this.adjustments ??= [];
    this.adjustments.push(...adjustment);
    return this;
  }

  /**
   * Adds an element to the ReceiptTemplate. A maximum of 100 elements can be added.
   * @param element - The ReceiptElement to add.
   * @returns The current instance of ReceiptTemplate.
   * @throws Error if adding the element exceeds the maximum of 100 elements.
   */
  addElement(element: ReceiptElement[]): this {
    if (this.elements.length >= 100) {
      throw new Error("Receipt template supports a maximum of 100 elements");
    }
    this.elements.push(...element);
    return this;
  }

  /**
   * Converts the ReceiptTemplate into a JSON object.
   * @returns The ReceiptTemplate as a JSON object.
   */
  toJSON(): object {
    return {
      attachment: {
        type: "template",
        payload: {
          template_type: "receipt",
          sharable: this.sharable,
          recipient_name: this.recipient_name,
          merchant_name: this.merchant_name,
          order_number: this.order_number,
          order_url: this.order_url,
          currency: this.currency,
          payment_method: this.payment_method,
          timestamp: this.timestamp,
          elements: this.elements,
          address: this.address,
          summary: this.summary,
          adjustments: this.adjustments,
        },
      },
    };
  }
}
