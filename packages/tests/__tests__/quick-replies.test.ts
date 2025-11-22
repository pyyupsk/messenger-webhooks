import { QuickReply, QuickReplies } from '@pyyupsk/messenger-webhooks';
import { describe, it, expect } from 'vitest';

describe('QuickReply Tests', () => {
    it('should create a QuickReply with a title', () => {
        const quickReply = new QuickReply('Reply Title');
        expect(quickReply.title).toBe('Reply Title');
    });

    it('should set payload correctly', () => {
        const quickReply = new QuickReply('Reply Title');
        quickReply.setPayload('some_payload');
        expect(quickReply.payload).toBe('some_payload');
    });

    it('should set image URL correctly', () => {
        const quickReply = new QuickReply('Reply Title');
        quickReply.setImageUrl('https://example.com/image.jpg');
        expect(quickReply.image_url).toBe('https://example.com/image.jpg');
    });

    it('should convert to JSON format correctly', () => {
        const quickReply = new QuickReply('Reply Title')
            .setPayload('some_payload')
            .setImageUrl('https://example.com/image.jpg');

        expect(quickReply.toJSON()).toEqual({
            content_type: 'text',
            title: 'Reply Title',
            payload: 'some_payload',
            image_url: 'https://example.com/image.jpg',
        });
    });
});

describe('QuickReplies Tests', () => {
    it('should create a QuickReplies instance with text', () => {
        const quickReplies = new QuickReplies('Choose an option');
        expect(quickReplies.text).toBe('Choose an option');
    });

    it('should set attachment correctly', () => {
        const quickReplies = new QuickReplies('Choose an option');
        const attachment = { type: 'image', url: 'https://example.com/image.jpg' };
        quickReplies.setAttachment(attachment);
        expect(quickReplies.attachment).toEqual(attachment);
    });

    it('should add quick replies correctly', () => {
        const quickReplies = new QuickReplies('Choose an option');
        const quickReply1 = new QuickReply('Reply 1').setPayload('payload1');
        const quickReply2 = new QuickReply('Reply 2').setPayload('payload2');

        quickReplies.addQuickReply([quickReply1, quickReply2]);
        expect(quickReplies.quick_replies.length).toBe(2);
        expect(quickReplies.quick_replies[0]).toBe(quickReply1);
        expect(quickReplies.quick_replies[1]).toBe(quickReply2);
    });

    it('should convert to JSON format correctly', () => {
        const quickReply1 = new QuickReply('Reply 1').setPayload('payload1');
        const quickReply2 = new QuickReply('Reply 2').setPayload('payload2');
        const quickReplies = new QuickReplies('Choose an option')
            .addQuickReply([quickReply1, quickReply2])
            .setAttachment({ type: 'image', url: 'https://example.com/image.jpg' });

        expect(quickReplies.toJSON()).toEqual({
            text: 'Choose an option',
            attachment: { type: 'image', url: 'https://example.com/image.jpg' },
            quick_replies: [
                {
                    content_type: 'text',
                    title: 'Reply 1',
                    payload: 'payload1',
                },
                {
                    content_type: 'text',
                    title: 'Reply 2',
                    payload: 'payload2',
                },
            ],
        });
    });
});
