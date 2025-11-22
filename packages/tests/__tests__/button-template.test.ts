import { ButtonTemplate, URLButton, PostbackButton, CallButton } from '@pyyupsk/messenger-webhooks';
import { describe, it, expect } from 'vitest';

describe('ButtonTemplate Tests', () => {
    it('should create a ButtonTemplate with valid text', () => {
        const template = new ButtonTemplate('This is a valid text.');
        expect(template.text).toBe('This is a valid text.');
    });

    it('should throw an error if text exceeds 640 characters', () => {
        const longText = 'a'.repeat(641); // 641 characters long
        expect(() => new ButtonTemplate(longText)).toThrow(
            'Button template text must be 640 characters or less.',
        );
    });

    it('should add buttons up to the maximum allowed', () => {
        const template = new ButtonTemplate('Choose an option:');
        const urlButton = new URLButton('Visit Site', 'https://example.com');
        const postbackButton = new PostbackButton('Click Me', 'payload');
        const callButton = new CallButton('Call Us', '+1234567890');

        template.addButtons([urlButton, postbackButton]);
        expect(template.buttons.length).toBe(2);

        template.addButtons([callButton]);
        expect(template.buttons.length).toBe(3);
    });

    it('should throw an error if adding more than 3 buttons', () => {
        const template = new ButtonTemplate('Choose an option:');
        const urlButton = new URLButton('Visit Site', 'https://example.com');
        const postbackButton = new PostbackButton('Click Me', 'payload');
        const callButton = new CallButton('Call Us', '+1234567890');
        const extraButton = new URLButton('Extra Button', 'https://example.com/extra');

        template.addButtons([urlButton, postbackButton, callButton]);
        expect(() => template.addButtons([extraButton])).toThrow(
            'Button template can have a maximum of 3 buttons.',
        );
    });

    it('should convert to JSON format correctly', () => {
        const template = new ButtonTemplate('Choose an option:');
        const urlButton = new URLButton('Visit Site', 'https://example.com');
        const postbackButton = new PostbackButton('Click Me', 'payload');

        template.addButtons([urlButton, postbackButton]);

        expect(template.toJSON()).toEqual({
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'button',
                    text: 'Choose an option:',
                    buttons: [
                        {
                            type: 'web_url',
                            title: 'Visit Site',
                            url: 'https://example.com',
                        },
                        {
                            type: 'postback',
                            title: 'Click Me',
                            payload: 'payload',
                        },
                    ],
                },
            },
        });
    });
});
