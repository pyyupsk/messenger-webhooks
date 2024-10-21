---
title: Core API
description:
  Explore @pyyupsk/messenger-webhooks Bot class for building scalable Facebook
  Messenger bots.
---

## Bot Class

The `Bot` class provides the main interface for interacting with the
[Facebook Messenger API](https://developers.facebook.com/docs/messenger-platform/).
It simplifies the process of setting up a webhook server, handling incoming
messages, and sending responses.

### Constructor

```typescript
constructor(options: Options)
```

### Parameters:

- `options`: Configuration options for the Bot instance. The `Options` interface
  includes:
- `accessToken` (string): The Facebook App access token.
- `verifyToken` (string): The verification token for webhook setup.
- `port` (number, optional): The port number for the server (default: 8080).
- `endpoint` (string, optional): The webhook endpoint (default: '/webhook').
- `version` (string, optional): The Facebook Graph API version (default:
  'v19.0').

## start

```typescript
public start(): void
```

Starts the bot server and sets up the webhook endpoints. This method handles
both the verification of the webhook setup and the reception of incoming
messages.

- **Webhook Verification**: Responds to Facebook's GET request for webhook
  verification using the `verifyToken`.
- **Message Handling**: Receives POST requests and emits events based on the
  incoming messages.

## sendRequest<T>

```typescript
public async sendRequest<T>(
    method: 'GET' | 'POST',
    endpoint: string,
    requestBody?: Record<string, unknown>,
): Promise<T>
```

Sends an HTTP request to the Facebook Graph API.

### Parameters:

- `method`: The HTTP method to use ('GET' or 'POST').
- `endpoint`: The API endpoint to request.
- `requestBody` (optional): The body of the request for 'POST' requests.

## sendMessage

```typescript
public async sendMessage(recipientId: string, message: object): Promise<void>
```

Sends a message to a recipient.

### Parameters:

- `recipientId`: The ID of the recipient.
- `message`: The message object to send.

## sendTextMessage

```typescript
public async sendTextMessage(recipientId: string, message: string): Promise<void>
```

Sends a text message to a recipient.

### Parameters:

- `recipientId`: The ID of the recipient.
- `message`: The text message to send.

- **Throws**: Will throw an error if the message exceeds 2000 characters.

## sendAttachment

```typescript
public async sendAttachment(
    recipientId: string,
    type: 'audio' | 'file' | 'image' | 'video' | 'template',
    url: string,
    isReusable?: boolean
): Promise<void>
```

Sends an attachment (audio, file, image, video, or template) to a recipient.

### Parameters:

- `recipientId`: The ID of the recipient.
- `type`: The type of the attachment.
- `url`: The URL of the attachment.
- `isReusable` (optional): Whether the attachment is reusable (default: true).

## setTyping

```typescript
public async setTyping(recipientId: string, isTyping: boolean): Promise<void>
```

Sets the typing status of the recipient.

### Parameters:

- `recipientId`: The ID of the recipient.
- `isTyping`: Whether the recipient is typing (`true` or `false`).

## Additional Information

- **Error Handling**: The `sendRequest` method throws an error if the response
  is not successful, providing detailed error information.
- **Event Emission**: The `Bot` class extends `EventEmitter` and can emit events
  based on incoming messages.

This class provides a powerful and flexible way to interact with the Facebook
Messenger Platform, handling both message reception and response efficiently.
