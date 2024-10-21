---
title: Call Button
description:
  Add Call buttons to Messenger bots to let users call your business directly.
---

The `CallButton` class creates a button that initiates a phone call when
clicked. This button is useful for providing a quick way for users to contact
your business directly.

## Properties

- **title**: The title of the button. Must be 20 characters or less.
- **phone_number**: The phone number to call when the button is clicked.

## Example

```typescript
const button = new CallButton('Call Us', '+1234567890');
```

## JSON Representation

```json
{
  "type": "phone_number",
  "title": "Call Us",
  "payload": "+1234567890"
}
```
