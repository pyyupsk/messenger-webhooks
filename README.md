<div align="center">
    <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/512px-Facebook_Messenger_logo_2020.svg.png"
        alt="Facebook Messenger"
        width="128"
    />
    <h1>Facebook Messenger Webhooks</h1>
    <hr />
    <p>
        <a href="https://www.npmjs.com/package/@pyyupsk/messenger-webhooks">
            <img
                src="https://img.shields.io/npm/v/@pyyupsk/messenger-webhooks.svg"
                alt="NPM Version"
            />
        </a>
        <a href="https://github.com/pyyupsk/messenger-webhooks/blob/main/LICENSE">
            <img
                src="https://img.shields.io/npm/dt/@pyyupsk/messenger-webhooks.svg"
                alt="Downloads"
            />
        </a>
        <a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fpyyupsk%2Fmessenger-webhooks?ref=badge_shield">
            <img
                src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fpyyupsk%2Fmessenger-webhooks.svg?type=shield"
                alt="FOSSA Status"
            />
        </a>
        <a href="https://github.com/pyyupsk/messenger-webhooks/blob/main/LICENSE">
            <img
                src="https://img.shields.io/npm/l/@pyyupsk/messenger-webhooks.svg"
                alt="License"
            />
        </a>
    </p>
    <p style="max-width: 600px;">
        <strong>@pyyupsk/messenger-webhooks</strong> is a Node.js library that
        simplifies building chatbots for the Facebook Messenger Platform.
        It offers an easy-to-use API for messaging and efficient webhook handling,
        making chatbot development more streamlined and responsive.
    </p>
</div>

> [!WARNING]  
> This is not an official library of Facebook. Use at your own risk.

## 🎯 Features

- **Simplified Integration**: Easily integrate Facebook Messenger webhook
  handling into Node.js applications.
- **Event-Driven Architecture**: Built on an event-driven architecture, making
  it easy to listen for and respond to various events.
- **User-Friendly API**: Provides a convenient API for handling incoming events
  and sending messages.
- **Scalable**: Designed to handle multiple events efficiently, allowing for
  scalable chatbot applications.
- **TypeScript Support**: Includes type definitions for better development
  experience and fewer runtime errors.
- **Open Source**: Licensed under the MIT License, allowing for free use and
  modification.

## 🛠️ Installation

To install the library, use npm or yarn:

```bash
npm install @pyyupsk/messenger-webhooks
```

## 🚀 Quick Start

Here’s a basic example of how to use the
[`@pyyupsk/messenger-webhooks`](https://www.npmjs.com/package/@pyyupsk/messenger-webhooks)
library to set up a simple chatbot:

```typescript
import { Bot, MessageEvent } from '@pyyupsk/messenger-webhooks';

const bot = new Bot({
  accessToken: 'YOUR_ACCESS_TOKEN',
  verifyToken: 'YOUR_VERIFY_TOKEN',
});

bot.on('message', (event: MessageEvent) => {
  const { sender, message } = event;

  bot.sendTextMessage(sender.id, `You wrote: ${message.text}`);
});

bot.start();
```

### Terminal Output

When you start the bot, you should see output similar to the following:

```shell
[bot] [info] APPNAME (APPID) is running on port 8080 (/webhook)
```

## 📚 API Reference

### Bot Initialization

The `Bot` class is initialized with an object containing the following options:

- `accessToken` **(required)**: Your Facebook Page's access token.
- `verifyToken` **(required)**: The verification token you set up for webhook
  validation.
- `port` **(optional)**: The port number to run the server on. Defaults to
  `8080`.
- `endpoint` **(optional)**: The endpoint to handle webhook events. Defaults to
  `/webhook`.
- `version` **(optional)**: The version of the
  [Facebook Graph API](https://developers.facebook.com/docs/graph-api/changelog#available-graph-api-versions)
  to use. Defaults to `v19.0`.

### Event Handling

The `Bot` instance uses an event-driven architecture, allowing you to listen for
various events:

- **`message`**: Triggered when a user sends a message to your bot.

Example:

```typescript
bot.on('message', (event: MessageEvent) => {
  // Handle incoming message
});
```

### Sending Messages

The `sendTextMessage` method allows you to send a text message to a user:

```typescript
bot.sendTextMessage(senderId, 'Your message text');
```

## 🛠️ Advanced Usage

For advanced use cases, refer to the
[API documentation](https://messenger-webhooks.vercel.app/) for more detailed
examples and options.

## 🔧 Configuration

Make sure your Facebook App and Page are properly configured to use the webhook
with the correct `accessToken` and `verifyToken`. Refer to the
[Facebook Developer Documentation](https://developers.facebook.com/docs/messenger-platform/getting-started)
for setup instructions.

## 🤝 Contributing

We welcome contributions! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file
for guidelines on how to contribute.

## 📝 License

This project is licensed under the [MIT License](LICENSE). See the LICENSE file
for more details.

---

Happy coding with
[**@pyyupsk/messenger-webhooks**](https://www.npmjs.com/package/@pyyupsk/messenger-webhooks)!
🚀
