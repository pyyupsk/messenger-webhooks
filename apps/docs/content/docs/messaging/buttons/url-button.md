---
title: URL Button
description:
  Create URL buttons in Messenger bots to open web pages with
  @pyyupsk/messenger-webhooks library.
---

The `URLButton` class creates a button that opens a web page when clicked. This
button is useful for directing users to external resources or websites.

## Properties

- **title**: The title of the button. Must be 20 characters or less.
- **url**: The URL to open when the button is clicked.
- **webview_height_ratio** (optional): The height ratio of the webview
  ('compact', 'tall', 'full').
- **messenger_extensions** (optional): Whether to enable Messenger extensions
  (boolean).
- **fallback_url** (optional): A fallback URL if Messenger extensions are not
  supported.
- **webview_share_button** (optional): Whether to hide or show the webview share
  button ('hide' or 'show').

## Example

```typescript
const button = new URLButton('Visit Website', 'https://example.com')
  .setWebviewHeightRatio('tall')
  .setMessengerExtensions(true)
  .setFallbackUrl('https://fallback.example.com')
  .setWebviewShareButton('show');
```

## JSON Representation

```json
{
  "type": "web_url",
  "title": "Visit Website",
  "url": "https://example.com",
  "webview_height_ratio": "tall",
  "messenger_extensions": true,
  "fallback_url": "https://fallback.example.com",
  "webview_share_button": "show"
}
```
