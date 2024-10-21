---
title: Media Template
description:
  Enhance user interaction with media-rich templates featuring images or videos.
---

The `MediaTemplate` consists of a series of `MediaElement` instances. Each
`MediaElement` can include a media type (image or video), an attachment ID or
URL, and up to three interactive buttons.

## MediaElement

### Properties

- **media_type**: The type of media. Can be either 'image' or 'video'.
- **attachment_id** (optional): The attachment ID for the media. Used when
  uploading media to the platform.
- **url** (optional): The URL of the media. Used for referencing media hosted
  elsewhere.
- **buttons**: An array of buttons to include with the media element. A maximum
  of 3 buttons can be added.

### Methods

- **constructor(media_type: MediaType)**: Initializes a new `MediaElement` with
  the specified media type ('image' or 'video').

- **setAttachmentId(attachment_id: string)**: Sets the attachment ID for the
  media.

  - Throws an error if both `attachment_id` and `url` are set.

- **setUrl(url: string)**: Sets the URL for the media.

  - Throws an error if both `attachment_id` and `url` are set.

- **addButtons(buttons: Button[])**: Adds buttons to the media element.

  - Throws an error if adding the buttons exceeds the maximum of 3 buttons.

- **toJSON()**: Converts the `MediaElement` into a JSON object for use in the
  template.

## MediaTemplate

### Properties

- **elements**: An array of `MediaElement` instances to include in the template.
- **sharable** (optional): Whether the template is sharable. Defaults to
  `false`.

### Methods

- **constructor(options: { sharable?: boolean })**: Initializes a new
  `MediaTemplate` with optional sharability.

- **addElement(element: MediaElement)**: Adds a `MediaElement` to the template.
  Maximum of 1 element.

- **toJSON()**: Converts the `MediaTemplate` into a JSON object suitable for
  sending via the messaging platform.

## Example Usage

```typescript
import { MediaTemplate, MediaElement } from '@pyyupsk/messenger-webhooks';
import { URLButton, PostbackButton } from '@pyyupsk/messenger-webhooks';

const mediaElement = new MediaElement('image')
  .setUrl('https://example.com/image1.jpg')
  .addButtons([
    new URLButton('Learn More', 'https://example.com'),
    new PostbackButton('Contact Us', 'CONTACT_US'),
  ]);

const mediaTemplate = new MediaTemplate({ sharable: true }).addElement(
  mediaElement,
);
```

## JSON Representation

```json
{
  "attachment": {
    "type": "template",
    "payload": {
      "template_type": "media",
      "elements": [
        {
          "media_type": "image",
          "url": "https://example.com/image1.jpg",
          "buttons": [
            {
              "type": "web_url",
              "title": "Learn More",
              "url": "https://example.com"
            },
            {
              "type": "postback",
              "title": "Contact Us",
              "payload": "CONTACT_US"
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

The `MediaTemplate` class provides a flexible way to send media content with
interactive options. By using `MediaElement`, you can include images or videos
with customizable buttons to enhance user interaction.

For detailed usage, consider exploring the `MediaElement` class and its methods
to tailor the media elements according to your application's needs.
