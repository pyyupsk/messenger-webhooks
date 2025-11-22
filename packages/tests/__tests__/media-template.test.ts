import { describe, it, expect } from 'vitest';

import {
    MediaElement,
    MediaTemplate,
    URLButton,
    PostbackButton,
    CallButton,
} from '@pyyupsk/messenger-webhooks';

describe('MediaElement Tests', () => {
    it('should create a MediaElement with valid media_type', () => {
        const mediaElement = new MediaElement('image');
        expect(mediaElement.media_type).toBe('image');
    });

    it('should throw an error if both attachment_id and url are set', () => {
        const mediaElement = new MediaElement('video');
        mediaElement.setAttachmentId('123');
        expect(() => mediaElement.setUrl('https://example.com/video.mp4')).toThrow(
            'Cannot set both attachment_id and url',
        );
    });

    it('should set attachment_id correctly', () => {
        const mediaElement = new MediaElement('image');
        mediaElement.setAttachmentId('123');
        expect(mediaElement.attachment_id).toBe('123');
    });

    it('should set url correctly', () => {
        const mediaElement = new MediaElement('video');
        mediaElement.setUrl('https://example.com/video.mp4');
        expect(mediaElement.url).toBe('https://example.com/video.mp4');
    });

    it('should add buttons correctly up to the maximum of 3', () => {
        const mediaElement = new MediaElement('image');
        const urlButton = new URLButton('Visit Site', 'https://example.com');
        const postbackButton = new PostbackButton('Click Me', 'payload');
        const callButton = new CallButton('Call Us', '+1234567890');

        mediaElement.addButtons([urlButton, postbackButton]);
        expect(mediaElement.buttons.length).toBe(2);

        mediaElement.addButtons([callButton]);
        expect(mediaElement.buttons.length).toBe(3);
    });

    it('should throw an error if adding more than 3 buttons', () => {
        const mediaElement = new MediaElement('image');
        const urlButton = new URLButton('Visit Site', 'https://example.com');
        const postbackButton = new PostbackButton('Click Me', 'payload');
        const callButton = new CallButton('Call Us', '+1234567890');
        const extraButton = new URLButton('Extra Button', 'https://example.com/extra');

        mediaElement.addButtons([urlButton, postbackButton, callButton]);
        expect(() => mediaElement.addButtons([extraButton])).toThrow(
            'Button template can have a maximum of 3 buttons.',
        );
    });

    it('should convert to JSON format correctly', () => {
        const mediaElement = new MediaElement('video').setUrl('https://example.com/video.mp4');

        const urlButton = new URLButton('Visit Site', 'https://example.com');
        mediaElement.addButtons([urlButton]);

        expect(mediaElement.toJSON()).toEqual({
            media_type: 'video',
            url: 'https://example.com/video.mp4',
            buttons: [urlButton],
        });
    });
});

describe('MediaTemplate Tests', () => {
    it('should create a MediaTemplate with default sharable value', () => {
        const template = new MediaTemplate();
        expect(template.sharable).toBe(false);
    });

    it('should create a MediaTemplate with custom sharable value', () => {
        const template = new MediaTemplate({ sharable: true });
        expect(template.sharable).toBe(true);
    });

    it('should add elements correctly', () => {
        const template = new MediaTemplate();
        const mediaElement = new MediaElement('image').setUrl('https://example.com/image.jpg');

        template.addElement(mediaElement);
        expect(template.elements.length).toBe(1);
        expect(template.elements[0]).toBe(mediaElement);
    });

    it('should convert to JSON format correctly', () => {
        const mediaElement = new MediaElement('image').setUrl('https://example.com/image.jpg');

        const template = new MediaTemplate({ sharable: true });
        template.addElement(mediaElement);

        expect(template.toJSON()).toEqual({
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'media',
                    elements: [
                        {
                            media_type: 'image',
                            url: 'https://example.com/image.jpg',
                            buttons: [],
                        },
                    ],
                    sharable: true,
                },
            },
        });
    });
});
