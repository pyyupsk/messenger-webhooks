---
title: Generic Template
description:
  Design rich, interactive messages with the versatile Generic Template for
  bots.
---

The `GenericTemplate` consists of a series of `GenericElement` instances, each
representing an item or a card within the template. Each `GenericElement` can
include a title, subtitle, image, default action, and up to three interactive
buttons.

## GenericElement

### Properties

- **title**: The title of the element. Must be 80 characters or less.
- **subtitle** (optional): The subtitle of the element. Must be 80 characters or
  less.
- **image_url** (optional): The URL of the image to display in the element.
- **default_action** (optional): The default action object that specifies the
  default behavior when the element is tapped.
- **buttons**: An array of buttons to include in the element. A maximum of 3
  buttons can be added.

### Methods

- **constructor(title: string)**: Initializes a new `GenericElement` with the
  specified title.

  - Throws an error if the title exceeds 80 characters.

- **setSubtitle(subtitle: string)**: Sets the subtitle of the element.

  - Throws an error if the subtitle exceeds 80 characters.

- **setImageUrl(image_url: string)**: Sets the image URL for the element.

- **setDefaultAction(default_action: { type: string; url: string;
  webview_height_ratio: string })**: Sets the default action for the element.

- **addButtons(buttons: Button[])**: Adds buttons to the element.

  - Throws an error if adding the buttons exceeds the maximum of 3 buttons.

- **toJSON()**: Converts the `GenericElement` into a JSON object for use in the
  template.

## GenericTemplate

### Properties

- **elements**: An array of `GenericElement` instances to include in the
  template. A maximum of 10 elements can be added.
- **sharable** (optional): Whether the template is sharable. Defaults to
  `false`.

### Methods

- **constructor(options: { sharable?: boolean })**: Initializes a new
  `GenericTemplate` with optional sharability.
- **addElement(element: GenericElement[])**: Adds elements to the template.

  - Throws an error if adding the elements exceeds the maximum of 10 elements.

- **toJSON()**: Converts the `GenericTemplate` into a JSON object suitable for
  sending via the messaging platform.

## Example Usage

```typescript
import { GenericTemplate, GenericElement } from '@pyyupsk/messenger-webhooks';
import { URLButton, PostbackButton } from '@pyyupsk/messenger-webhooks';

const element1 = new GenericElement('Product 1')
  .setSubtitle('Best product ever!')
  .setImageUrl('https://example.com/image1.jpg')
  .addButtons([
    new URLButton('View Details', 'https://example.com/product1'),
    new PostbackButton('Buy Now', 'BUY_PRODUCT_1'),
  ]);

const element2 = new GenericElement('Product 2')
  .setSubtitle('Another great product!')
  .setImageUrl('https://example.com/image2.jpg')
  .addButtons([
    new URLButton('View Details', 'https://example.com/product2'),
    new PostbackButton('Buy Now', 'BUY_PRODUCT_2'),
  ]);

const genericTemplate = new GenericTemplate({ sharable: true }).addElement([
  element1,
  element2,
]);
```

## JSON Representation

```json
{
  "attachment": {
    "type": "template",
    "payload": {
      "template_type": "generic",
      "elements": [
        {
          "title": "Product 1",
          "subtitle": "Best product ever!",
          "image_url": "https://example.com/image1.jpg",
          "buttons": [
            {
              "type": "web_url",
              "title": "View Details",
              "url": "https://example.com/product1"
            },
            {
              "type": "postback",
              "title": "Buy Now",
              "payload": "BUY_PRODUCT_1"
            }
          ]
        },
        {
          "title": "Product 2",
          "subtitle": "Another great product!",
          "image_url": "https://example.com/image2.jpg",
          "buttons": [
            {
              "type": "web_url",
              "title": "View Details",
              "url": "https://example.com/product2"
            },
            {
              "type": "postback",
              "title": "Buy Now",
              "payload": "BUY_PRODUCT_2"
            }
          ]
        }
      ],
      "sharable": true
    }
  }
}
```

## Additional Information

The `GenericTemplate` class provides a flexible way to display a list of items
or cards, each with its own set of actions and details. Use this template to
create rich, interactive messages that can enhance user engagement and provide a
better user experience.

For further customization, explore the `GenericElement` class and the different
button types to tailor the template to your specific needs.
