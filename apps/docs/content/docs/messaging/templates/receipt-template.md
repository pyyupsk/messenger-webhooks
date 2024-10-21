---
title: Receipt Template
description:
  Create comprehensive receipt messages for purchases, featuring items,
  summaries, and order details.
---

The `ReceiptTemplate` class is designed to create detailed receipt messages for
users. It includes information such as the recipient's name, order details, and
a list of purchased items. This template can also include adjustments and
address information.

## ReceiptElement

### Properties

- **title**: The title or name of the receipt element (e.g., item name).
- **subtitle** (optional): A secondary line of text providing more details about
  the element.
- **quantity** (optional): The quantity of the item. This is useful for items
  that are purchased in bulk.
- **price**: The price of the item.
- **currency** (optional): The currency in which the price is specified.
- **image_url** (optional): A URL to an image representing the item.

### Methods

- **constructor(title: string, price: number)**: Initializes a new
  `ReceiptElement` with the specified title and price.

- **setSubtitle(subtitle: string)**: Sets a subtitle for the `ReceiptElement`.

- **setQuantity(quantity: number)**: Sets the quantity for the `ReceiptElement`.

- **setCurrency(currency: string)**: Sets the currency for the `ReceiptElement`.

- **setImageUrl(imageUrl: string)**: Sets the image URL for the
  `ReceiptElement`.

## ReceiptTemplate

### Properties

- **sharable** (optional): Whether the receipt template is sharable. Defaults to
  `false`.

- **recipient_name**: The name of the recipient of the receipt.

- **merchant_name** (optional): The name of the merchant or store issuing the
  receipt.

- **order_number**: The unique order number for the receipt.

- **order_url** (optional): A URL where more information about the order can be
  found.

- **currency**: The currency used for the transaction.

- **payment_method**: The method of payment used for the transaction.

- **timestamp** (optional): The timestamp when the transaction occurred.

- **elements**: An array of `ReceiptElement` instances, representing the items
  purchased.

- **address** (optional): The address where the receipt is sent or the delivery
  address.

- **summary**: A summary object containing the subtotal, shipping cost, total
  tax, and total cost.

- **adjustments** (optional): An array of adjustments applied to the receipt,
  such as discounts or additional fees.

### Methods

- **constructor(recipient_name: string, order_number: string, currency: string,
  payment_method: string, { sharable = false }: { sharable?: boolean } = {})**:
  Initializes a new `ReceiptTemplate` with the required information and optional
  sharable flag.

- **setMerchantName(merchant_name: string)**: Sets the merchant name for the
  `ReceiptTemplate`.

- **setOrderUrl(order_url: string)**: Sets the order URL for the
  `ReceiptTemplate`.

- **setTimestamp(timestamp: number)**: Sets the timestamp for the
  `ReceiptTemplate`.

- **setAddress(address: Address)**: Sets the address for the `ReceiptTemplate`.

- **setSummary(summary: Summary)**: Sets the summary for the `ReceiptTemplate`.

- **addAdjustment(adjustment: Adjustment[])**: Adds an array of adjustments to
  the `ReceiptTemplate`.

- **addElement(element: ReceiptElement[])**: Adds an array of `ReceiptElement`
  instances to the `ReceiptTemplate`. A maximum of 100 elements can be added.

## Example Usage

```typescript
import { ReceiptTemplate, ReceiptElement } from '@pyyupsk/messenger-webhooks';

const item1 = new ReceiptElement('Laptop', 999.99)
  .setQuantity(1)
  .setCurrency('USD')
  .setImageUrl('https://example.com/laptop.jpg');

const item2 = new ReceiptElement('Mouse', 25.0)
  .setQuantity(2)
  .setCurrency('USD');

const receipt = new ReceiptTemplate(
  'John Doe',
  '1234567890',
  'USD',
  'Credit Card',
  {
    sharable: true,
  },
)
  .setMerchantName('Tech Store')
  .setOrderUrl('https://example.com/order/1234567890')
  .setTimestamp(Date.now())
  .setAddress({
    street_1: '123 Tech Lane',
    city: 'Tech City',
    postal_code: '12345',
    state: 'TS',
    country: 'Techland',
  })
  .setSummary({
    subtotal: 1049.99,
    shipping_cost: 0,
    total_tax: 0,
    total_cost: 1049.99,
  })
  .addAdjustment([{ name: 'Discount', amount: -50.0 }])
  .addElement([item1, item2]);
```

## JSON Representation

```json
{
  "attachment": {
    "type": "template",
    "payload": {
      "template_type": "receipt",
      "sharable": true,
      "recipient_name": "John Doe",
      "merchant_name": "Tech Store",
      "order_number": "1234567890",
      "order_url": "https://example.com/order/1234567890",
      "currency": "USD",
      "payment_method": "Credit Card",
      "timestamp": 1633035600000,
      "elements": [
        {
          "title": "Laptop",
          "subtitle": "High-end gaming laptop",
          "quantity": 1,
          "price": 999.99,
          "currency": "USD",
          "image_url": "https://example.com/laptop.jpg"
        },
        {
          "title": "Mouse",
          "quantity": 2,
          "price": 25.0,
          "currency": "USD"
        }
      ],
      "address": {
        "street_1": "123 Tech Lane",
        "city": "Tech City",
        "postal_code": "12345",
        "state": "TS",
        "country": "Techland"
      },
      "summary": {
        "subtotal": 1049.99,
        "shipping_cost": 0,
        "total_tax": 0,
        "total_cost": 1049.99
      },
      "adjustments": [
        {
          "name": "Discount",
          "amount": -50.0
        }
      ]
    }
  }
}
```

## Additional Information

The `ReceiptTemplate` class provides a comprehensive way to structure receipt
messages for various applications, including order confirmations and purchase
receipts. By including detailed elements, address information, and a summary,
you can create a complete and informative receipt for your users.

For more details on integrating `ReceiptTemplate` into your messaging platform,
refer to the platform’s documentation on receipt templates and interactive
messages.
