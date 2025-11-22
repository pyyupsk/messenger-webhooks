import {
    GenericElement,
    GenericTemplate,
    URLButton,
    PostbackButton,
    CallButton,
} from '@pyyupsk/messenger-webhooks';
import { describe, it, expect } from 'vitest';

describe('GenericElement Tests', () => {
    it('should create a GenericElement with valid title', () => {
        const element = new GenericElement('Valid Title');
        expect(element.title).toBe('Valid Title');
    });

    it('should throw an error if title exceeds 80 characters', () => {
        const longTitle = 'a'.repeat(81); // 81 characters long
        expect(() => new GenericElement(longTitle)).toThrow('Title must be 80 characters or less.');
    });

    it('should set subtitle correctly', () => {
        const element = new GenericElement('Title');
        element.setSubtitle('This is a subtitle');
        expect(element.subtitle).toBe('This is a subtitle');
    });

    it('should throw an error if subtitle exceeds 80 characters', () => {
        const longSubtitle = 'a'.repeat(81); // 81 characters long
        const element = new GenericElement('Title');
        expect(() => element.setSubtitle(longSubtitle)).toThrow(
            'Subtitle must be 80 characters or less.',
        );
    });

    it('should set image URL correctly', () => {
        const element = new GenericElement('Title');
        element.setImageUrl('https://example.com/image.jpg');
        expect(element.image_url).toBe('https://example.com/image.jpg');
    });

    it('should set default action correctly', () => {
        const element = new GenericElement('Title');
        const action = {
            type: 'web_url',
            url: 'https://example.com',
            webview_height_ratio: 'full',
        };
        element.setDefaultAction(action);
        expect(element.default_action).toEqual(action);
    });

    it('should add buttons correctly up to the maximum of 3', () => {
        const element = new GenericElement('Title');
        const urlButton = new URLButton('Visit Site', 'https://example.com');
        const postbackButton = new PostbackButton('Click Me', 'payload');
        const callButton = new CallButton('Call Us', '+1234567890');

        element.addButtons([urlButton, postbackButton]);
        expect(element.buttons.length).toBe(2);

        element.addButtons([callButton]);
        expect(element.buttons.length).toBe(3);
    });

    it('should throw an error if adding more than 3 buttons', () => {
        const element = new GenericElement('Title');
        const urlButton = new URLButton('Visit Site', 'https://example.com');
        const postbackButton = new PostbackButton('Click Me', 'payload');
        const callButton = new CallButton('Call Us', '+1234567890');
        const extraButton = new URLButton('Extra Button', 'https://example.com/extra');

        element.addButtons([urlButton, postbackButton, callButton]);
        expect(() => element.addButtons([extraButton])).toThrow(
            'Button template can have a maximum of 3 buttons.',
        );
    });

    it('should convert to JSON format correctly', () => {
        const element = new GenericElement('Title')
            .setSubtitle('Subtitle')
            .setImageUrl('https://example.com/image.jpg')
            .setDefaultAction({
                type: 'web_url',
                url: 'https://example.com',
                webview_height_ratio: 'full',
            });

        const urlButton = new URLButton('Visit Site', 'https://example.com');
        element.addButtons([urlButton]);

        expect(element.toJSON()).toEqual({
            title: 'Title',
            subtitle: 'Subtitle',
            image_url: 'https://example.com/image.jpg',
            default_action: {
                type: 'web_url',
                url: 'https://example.com',
                webview_height_ratio: 'full',
            },
            buttons: [urlButton],
        });
    });
});

describe('GenericTemplate Tests', () => {
    it('should create a GenericTemplate with default sharable value', () => {
        const template = new GenericTemplate();
        expect(template.sharable).toBe(false);
    });

    it('should create a GenericTemplate with custom sharable value', () => {
        const template = new GenericTemplate({ sharable: true });
        expect(template.sharable).toBe(true);
    });

    it('should add elements correctly up to the maximum of 10', () => {
        const template = new GenericTemplate();
        const elements = Array.from(
            { length: 10 },
            (_, i) => new GenericElement(`Element ${i + 1}`),
        );

        template.addElement(elements);
        expect(template.elements.length).toBe(10);
    });

    it('should throw an error if adding more than 10 elements', () => {
        const template = new GenericTemplate();
        const elements = Array.from(
            { length: 11 },
            (_, i) => new GenericElement(`Element ${i + 1}`),
        );

        template.addElement(elements.slice(0, 10));
        expect(() => template.addElement(elements.slice(10))).toThrow(
            'Generic template supports a maximum of 10 elements',
        );
    });

    it('should convert to JSON format correctly', () => {
        const element = new GenericElement('Title')
            .setSubtitle('Subtitle')
            .setImageUrl('https://example.com/image.jpg')
            .setDefaultAction({
                type: 'web_url',
                url: 'https://example.com',
                webview_height_ratio: 'full',
            });

        const template = new GenericTemplate({ sharable: true });
        template.addElement([element]);

        expect(template.toJSON()).toEqual({
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'generic',
                    elements: [
                        {
                            title: 'Title',
                            subtitle: 'Subtitle',
                            image_url: 'https://example.com/image.jpg',
                            default_action: {
                                type: 'web_url',
                                url: 'https://example.com',
                                webview_height_ratio: 'full',
                            },
                            buttons: [],
                        },
                    ],
                    sharable: true,
                },
            },
        });
    });
});
