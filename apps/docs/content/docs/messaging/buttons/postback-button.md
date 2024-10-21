---
title: Postback Button
description:
  Create Postback buttons in Messenger bots to trigger server actions with
  @pyyupsk/messenger-webhooks.
---

The `PostbackButton` class creates a button that sends a payload to your server
when clicked. This is useful for triggering server-side events or actions.

## Properties

- **title**: The title of the button. Must be 20 characters or less.
- **payload**: The payload to send to the server when the button is clicked.

## Example

```typescript
const button = new PostbackButton('Confirm', 'CONFIRM_PAYLOAD');
```

## JSON Representation

```json
{
  "type": "postback",
  "title": "Confirm",
  "payload": "CONFIRM_PAYLOAD"
}
```
