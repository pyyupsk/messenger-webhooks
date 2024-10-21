---
title: Quick Replies
description:
  Learn to create interactive Quick Replies for your Messenger bot with ease.
---

The `QuickReplies` template consists of a main text prompt and a list of
`QuickReply` buttons. Each `QuickReply` can have a title, an optional payload,
and an optional image URL.

## QuickReply

### Properties

- **content_type**: The type of content for the quick reply. Options include:
  - `'text'`: Default content type.
  - `'user_phone_number'`: Requests the user's phone number.
  - `'user_email'`: Requests the user's email address.
- **title**: The title of the quick reply button. This is the text that users
  will see.

- **payload** (optional): The data sent when the quick reply is selected. This
  can be a string or a number.

- **image_url** (optional): The URL of an image to display with the quick reply.

### Methods

- **constructor(title: string)**: Initializes a new `QuickReply` with the
  specified title.

- **setPayload(payload: string | number)**: Sets the payload for the quick
  reply. This data is sent when the button is clicked.

- **setImageUrl(imageUrl: string)**: Sets the image URL for the quick reply
  button.

## QuickReplies

### Properties

- **text**: The text to display with the quick replies. This should be a message
  or prompt for the user.

- **attachment** (optional): An optional attachment object that can be included
  with the quick replies.

- **quick_replies**: An array of `QuickReply` instances to include in the
  response.

### Methods

- **constructor(text: string)**: Initializes a new `QuickReplies` instance with
  the specified text.

- **setAttachment(attachment: object)**: Sets an attachment object that can be
  used with the quick replies. This is optional.

- **addQuickReply(replies: QuickReply[])**: Adds an array of `QuickReply`
  objects to the quick replies instance. You can add multiple quick replies at
  once.

## Example Usage

```typescript
import { QuickReplies, QuickReply } from '@pyyupsk/messenger-webhooks';

const quickReply1 = new QuickReply('Yes')
  .setPayload('YES_PAYLOAD')
  .setImageUrl('https://example.com/yes-image.jpg');

const quickReply2 = new QuickReply('No')
  .setPayload('NO_PAYLOAD')
  .setImageUrl('https://example.com/no-image.jpg');

const quickReplies = new QuickReplies('Do you like our service?').addQuickReply(
  [quickReply1, quickReply2],
);
```

## JSON Representation

```json
{
  "text": "Do you like our service?",
  "quick_replies": [
    {
      "content_type": "text",
      "title": "Yes",
      "payload": "YES_PAYLOAD",
      "image_url": "https://example.com/yes-image.jpg"
    },
    {
      "content_type": "text",
      "title": "No",
      "payload": "NO_PAYLOAD",
      "image_url": "https://example.com/no-image.jpg"
    }
  ]
}
```

## Additional Information

The `QuickReplies` class is useful for creating interactive and engaging
messages. By combining quick reply buttons with relevant prompts, you can guide
users through a series of interactions in a streamlined manner.

For more details on integrating `QuickReplies` into your messaging platform,
refer to the platform’s documentation on quick replies and interactive elements.
