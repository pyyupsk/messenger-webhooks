---
title: Button Template
description:
  Build engaging messages with interactive buttons using the ButtonTemplate
  class.
---

The `ButtonTemplate` class enables you to display a text message with up to
three interactive buttons. Each button can be a URL button, postback button, or
call button. This template is ideal for presenting choices to users or guiding
them to take specific actions.

## Properties

- **text**: The text to display in the template. Must be 640 characters or less.
- **buttons**: An array of buttons (up to 3) to include in the template.

## Methods

- **constructor(text: string)**: Initializes a new `ButtonTemplate` with the
  specified text.

  - Throws an error if the text exceeds 640 characters.

- **addButtons(buttons: Button[])**: Adds buttons to the template.

  - Throws an error if adding the buttons exceeds the maximum limit of 3
    buttons.

- **toJSON()**: Converts the `ButtonTemplate` into the JSON format required for
  sending the template in a messaging platform.

## Example Usage

```typescript
import { ButtonTemplate } from '@pyyupsk/messenger-webhooks';
import { URLButton, PostbackButton } from '@pyyupsk/messenger-webhooks';

const buttonTemplate = new ButtonTemplate('Choose an option:').addButtons([
  new URLButton('Visit Website', 'https://example.com'),
  new PostbackButton('Confirm', 'CONFIRM_PAYLOAD'),
  new CallButton('Call Us', '+1234567890'),
]);
```

## JSON Representation

```json
{
  "attachment": {
    "type": "template",
    "payload": {
      "template_type": "button",
      "text": "Choose an option:",
      "buttons": [
        {
          "type": "web_url",
          "title": "Visit Website",
          "url": "https://example.com"
        },
        {
          "type": "postback",
          "title": "Confirm",
          "payload": "CONFIRM_PAYLOAD"
        },
        {
          "type": "phone_number",
          "title": "Call Us",
          "payload": "+1234567890"
        }
      ]
    }
  }
}
```

## Additional Information

The `ButtonTemplate` class is a versatile way to create interactive messages
with multiple buttons. By using this class, you can enhance user engagement by
offering clear choices and actions in your Messenger bot.

For further customization, you can refer to the individual button types
documentation to understand their specific properties and usage.
