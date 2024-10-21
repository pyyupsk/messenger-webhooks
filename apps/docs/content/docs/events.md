---
title: Events
description:
  Manage Message, Postback, Quick Reply, and more events with
  @pyyupsk/messenger-webhooks library.
---

The
[`@pyyupsk/messenger-webhooks`](https://www.npmjs.com/package/@pyyupsk/messenger-webhooks)
library provides a robust mechanism for handling different types of events that
occur on
[Facebook Messenger](https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/).
When users interact with your Messenger bot, various events are triggered, and
your bot can respond to these events using the library’s event handling system.

## Event Handling

### Event Types

The library can handle several types of events, each representing different
interactions or messages from users. The event types supported are:

- **Message**: Represents a message sent by the user.
- **Quick Reply**: Represents a quick reply button click.
- **Echo**: Represents a echoes event.
- **Postback**: Represents a postback button click.
- **Template**: Represents a template message.
- **Referral**: Represents a referral event.

### Event Structure

Each event type extends the base `WebhookEvent` interface, which includes common
properties:

```typescript
export interface WebhookEvent {
  sender: Sender;
  recipient: Recipient;
  timestamp: number;
}

interface Sender {
  id: string;
}

interface Recipient {
  id: string;
}
```

### Event Interfaces

Here are the specific interfaces for each event type:

#### Message Event

Represents a message sent by the user. May include a quick reply and echo
payload.

```typescript
export interface MessageEvent extends WebhookEvent {
  message: {
    mid: string;
    text: string;
    quick_reply?: {
      payload: string;
    };
    is_echo?: boolean;
  };
}
```

#### Quick Reply Event

Represents a quick reply button click.

```typescript
export interface QuickReplyEvent extends WebhookEvent {
  message: {
    mid: string;
    text: string;
    quick_reply: {
      payload: string;
    };
  };
}
```

#### Echo Event

Represents a message sent by the user. May include a quick reply and echo
payload.

```typescript
export interface EchoesEvent extends WebhookEvent {
  message: {
    mid: string;
    text: string;
    is_echo: boolean;
  };
}
```

#### Postback Event

Represents a postback button click.

```typescript
export interface PostbackEvent extends WebhookEvent {
  postback: {
    title: string;
    payload: string;
  };
}
```

#### Template Event

Represents a template message. Includes template type and associated buttons.

```typescript
export interface TemplateEvent extends WebhookEvent {
  template: {
    template_type: string;
    text: string;
    buttons: CallButton[] | PostbackButton[] | URLButton[];
  };
}
```

#### Referral Event

Represents a referral event, typically used for deep linking or tracking.

```typescript
export interface ReferralsEvent extends WebhookEvent {
  referral: {
    source: string;
    type: string;
    ref?: string;
  };
}
```

### Handling Events in the Bot

The `Bot` class emits events based on the event type determined by the
`determineEventType` function. Here’s how you can handle events in your bot:

```typescript
import {
  Bot,
  MessageEvent,
  PostbackEvent,
  QuickReplyEvent,
  TemplateEvent,
  ReferralsEvent,
} from '@pyyupsk/messenger-webhooks';

const bot = new Bot({
  accessToken: process.env.ACCESS_TOKEN || '',
  verifyToken: process.env.VERIFY_TOKEN || '',
});

bot.on('message', async (event: MessageEvent) => {
  const { sender, message } = event;
  // Handle the message event
});

bot.on('postback', async (event: PostbackEvent) => {
  const { sender, postback } = event;
  // Handle the postback event
});

bot.on('quick_reply', async (event: QuickReplyEvent) => {
  const { sender, message } = event;
  // Handle the quick reply event
});

bot.on('template', async (event: TemplateEvent) => {
  const { sender, template } = event;
  // Handle the template event
});

bot.on('referral', async (event: ReferralsEvent) => {
  const { sender, referral } = event;
  // Handle the referral event
});

bot.start();
```

In this setup, the bot listens for different event types and executes the
appropriate handler for each event type.

By understanding and utilizing these event types and handlers, you can create
dynamic and interactive Messenger bots that respond to user actions effectively.
