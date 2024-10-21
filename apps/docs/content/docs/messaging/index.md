---
title: Messaging
description:
  Use @pyyupsk/messenger-webhooks library to send text, images, audio, videos,
  files, and templates on Messenger.
---

To send messages to a user on Messenger, the conversation must be initiated by
that user. The
[`@pyyupsk/messenger-webhooks`](https://www.npmjs.com/package/@pyyupsk/messenger-webhooks)
library provides the `sendMessage` method for sending different types of
messages, each with its own content and structure.

## Content Types

The `sendMessage` method supports several types of content, including:

- **Text**
- **Images**
- **Audio**
- **Videos**
- **Files**
- **Templates**

### Sending Messages

All messages are sent using the `sendMessage` method in the `Bot` class. Here is
an example of how to send a message using a template:

#### Example: Sending a Generic Template

```typescript title="index.ts"
import {
  Bot,
  GenericTemplate,
  GenericElement,
  URLButton,
  PostbackButton,
} from '@pyyupsk/messenger-webhooks';

const bot = new Bot({
  accessToken: process.env.ACCESS_TOKEN || '',
  verifyToken: process.env.VERIFY_TOKEN || '',
});

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

bot.sendMessage(recipientId, genericTemplate);
```

### JSON Representation

The `sendMessage` method constructs the following JSON payload for the above
example:

```json
{
  "attachment": {
    "type": "template",
    "payload": {
      "template_type": "generic",
      "elements": [
        // ...
      ],
      "sharable": true
    }
  }
}
```

### Message Types

Here’s how you can use different types of content with the `sendMessage` method:

#### Text Messages

```typescript
bot.sendTextMessage(recipientId, 'Hello, how can I help you today?');
```

#### Images

```typescript
bot.sendAttachment(recipientId, 'image', 'https://example.com/image.jpg');
```

#### Audio

```typescript
bot.sendAttachment(recipientId, 'audio', 'https://example.com/audio.mp3');
```

#### Videos

```typescript
bot.sendAttachment(recipientId, 'video', 'https://example.com/video.mp4');
```

#### Files

```typescript
bot.sendAttachment(recipientId, 'file', 'https://example.com/file.pdf');
```

#### Templates

Templates can include various interactive elements such as buttons. You can
create different types of templates like Generic Templates, Button Templates,
and more, using the corresponding classes and methods provided by the library.

By using these methods, you can create rich and interactive messages tailored to
your needs, ensuring a better user experience on Messenger.
