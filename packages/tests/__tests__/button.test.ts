import { URLButton, PostbackButton, CallButton } from '@pyyupsk/messenger-webhooks';
import { describe, it, expect } from 'vitest';

describe('Button Classes Tests', () => {
    describe('URLButton', () => {
        it('should create a URLButton with valid title and URL', () => {
            const button = new URLButton('Valid Title', 'https://example.com');
            expect(button.title).toBe('Valid Title');
            expect(button.url).toBe('https://example.com');
        });

        it('should throw an error if title exceeds 20 characters', () => {
            expect(
                () => new URLButton('This title is way too long', 'https://example.com'),
            ).toThrow('Button title must be 20 characters or less.');
        });

        it('should set webview height ratio', () => {
            const button = new URLButton('Title', 'https://example.com').setWebviewHeightRatio(
                'full',
            );
            expect(button.webview_height_ratio).toBe('full');
        });

        it('should enable Messenger extensions', () => {
            const button = new URLButton('Title', 'https://example.com').setMessengerExtensions(
                true,
            );
            expect(button.messenger_extensions).toBe(true);
        });

        it('should set fallback URL', () => {
            const button = new URLButton('Title', 'https://example.com').setFallbackUrl(
                'https://fallback.com',
            );
            expect(button.fallback_url).toBe('https://fallback.com');
        });

        it('should set webview share button', () => {
            const button = new URLButton('Title', 'https://example.com').setWebviewShareButton(
                'show',
            );
            expect(button.webview_share_button).toBe('show');
        });

        it('should convert to JSON correctly', () => {
            const button = new URLButton('Title', 'https://example.com')
                .setWebviewHeightRatio('compact')
                .setMessengerExtensions(true)
                .setFallbackUrl('https://fallback.com')
                .setWebviewShareButton('hide');

            expect(button.toJSON()).toEqual({
                type: 'web_url',
                title: 'Title',
                url: 'https://example.com',
                webview_height_ratio: 'compact',
                messenger_extensions: true,
                fallback_url: 'https://fallback.com',
                webview_share_button: 'hide',
            });
        });
    });

    describe('PostbackButton', () => {
        it('should create a PostbackButton with valid title and payload', () => {
            const button = new PostbackButton('Valid Title', 'payload_data');
            expect(button.title).toBe('Valid Title');
            expect(button.payload).toBe('payload_data');
        });

        it('should throw an error if title exceeds 20 characters', () => {
            expect(() => new PostbackButton('This title is way too long', 'payload_data')).toThrow(
                'Button title must be 20 characters or less.',
            );
        });

        it('should convert to JSON correctly', () => {
            const button = new PostbackButton('Title', 'payload_data');
            expect(button.toJSON()).toEqual({
                type: 'postback',
                title: 'Title',
                payload: 'payload_data',
            });
        });
    });

    describe('CallButton', () => {
        it('should create a CallButton with valid title and phone number', () => {
            const button = new CallButton('Valid Title', '+1234567890');
            expect(button.title).toBe('Valid Title');
            expect(button.phone_number).toBe('+1234567890');
        });

        it('should throw an error if title exceeds 20 characters', () => {
            expect(() => new CallButton('This title is way too long', '+1234567890')).toThrow(
                'Button title must be 20 characters or less.',
            );
        });

        it('should convert to JSON correctly', () => {
            const button = new CallButton('Title', '+1234567890');
            expect(button.toJSON()).toEqual({
                type: 'phone_number',
                title: 'Title',
                payload: '+1234567890',
            });
        });
    });
});
