import type express from 'express';

import { Bot, logger } from '@pyyupsk/messenger-webhooks';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('Bot Class Tests', () => {
    let bot: InstanceType<typeof Bot>;
    let mockExpress: ReturnType<typeof express>;
    let mockFetch: ReturnType<typeof vi.fn>;

    const mockOptions = {
        accessToken: 'mockAccessToken',
        verifyToken: 'mockVerifyToken',
        port: 8080,
        endpoint: '/webhook',
        version: 'v19.0',
    };

    beforeEach(() => {
        mockFetch = vi.fn();
        global.fetch = mockFetch; // Mocking fetch for HTTP requests

        // Mock express server
        mockExpress = {
            use: vi.fn(),
            get: vi.fn(),
            post: vi.fn(),
            listen: vi.fn(),
        } as unknown as ReturnType<typeof express>;

        // Mock logger
        vi.spyOn(logger, 'error').mockImplementation(() => {});
        vi.spyOn(logger, 'info').mockImplementation(() => {});

        bot = new Bot(mockOptions);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should initialize with the provided options', () => {
        expect(bot.bot.port).toBe(mockOptions.port);
        expect(bot.bot.endpoint).toBe(mockOptions.endpoint);
        expect(bot.bot.version).toBe(mockOptions.version);
        expect(bot['accessToken']).toBe(mockOptions.accessToken);
        expect(bot['verifyToken']).toBe(mockOptions.verifyToken);
    });

    it('should throw an error if accessToken is missing', () => {
        const badOptions = { ...mockOptions, accessToken: '' };
        bot = new Bot(badOptions); // Create new bot with bad options
        expect(logger.error).toHaveBeenCalledWith(
            'Access token is required: https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start',
        );
    });

    it('should throw an error if verifyToken is missing', () => {
        const badOptions = { ...mockOptions, verifyToken: '' };
        bot = new Bot(badOptions);
        expect(logger.error).toHaveBeenCalledWith(
            'Verify token is required: https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start',
        );
    });

    it('should handle invalid webhook subscription mode', () => {
        bot['server'] = mockExpress;

        const mockReq = {
            query: {
                'hub.mode': 'invalid_mode',
                'hub.challenge': '1234',
                'hub.verify_token': bot['verifyToken'],
            },
        } as unknown as express.Request;

        const mockRes = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn(),
        } as unknown as express.Response;

        bot.start();

        // @ts-ignore
        const getHandler = mockExpress.get.mock.calls[0][1];
        getHandler(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(403);
        expect(mockRes.send).toHaveBeenCalledWith('Forbidden');
    });

    it('should handle missing hub.verify_token in webhook GET request', () => {
        const mockReq = {
            query: {
                'hub.mode': 'subscribe',
                'hub.challenge': '1234',
            },
        } as unknown as express.Request;

        const mockRes = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn(),
        } as unknown as express.Response;

        bot['server'] = mockExpress;
        bot.start();

        // @ts-ignore
        const getHandler = mockExpress.get.mock.calls[0][1];
        getHandler(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.send).toHaveBeenCalledWith('Bad Request');
    });

    it('should start the server and set up the webhook endpoints', () => {
        bot['server'] = mockExpress;

        bot.start();
        expect(mockExpress.use).toHaveBeenCalledWith(expect.any(Function));
        expect(mockExpress.get).toHaveBeenCalledWith(bot.bot.endpoint, expect.any(Function));
        expect(mockExpress.post).toHaveBeenCalledWith(bot.bot.endpoint, expect.any(Function));
        expect(mockExpress.listen).toHaveBeenCalledWith(bot.bot.port, expect.any(Function));
    });

    it('should start the server with options', () => {
        bot = new Bot({
            accessToken: 'mockAccessToken',
            verifyToken: 'mockVerifyToken',
            port: 3000,
            endpoint: '/api/webhook',
            version: 'v20.0',
        });

        expect(bot.bot.port).toBe(3000);
        expect(bot.bot.endpoint).toBe('/api/webhook');
        expect(bot.bot.version).toBe('v20.0');
    });

    it('should emit an event when receiving a message in POST webhook', () => {
        const mockReq = {
            body: {
                object: 'page',
                entry: [
                    {
                        messaging: [
                            {
                                sender: { id: '123' },
                                message: {
                                    text: 'Hello',
                                },
                            },
                        ],
                    },
                ],
            },
        } as unknown as express.Request;

        const mockRes = {
            sendStatus: vi.fn(),
        } as unknown as express.Response;

        bot['server'] = mockExpress;
        const emitSpy = vi.spyOn(bot, 'emit');

        bot.start();

        // @ts-ignore
        const postHandler = mockExpress.post.mock.calls[0][1];
        postHandler(mockReq, mockRes);

        expect(emitSpy).toHaveBeenCalledWith('message', {
            sender: { id: '123' },
            message: { text: 'Hello' },
        });
        expect(mockRes.sendStatus).toHaveBeenCalledWith(200);
    });

    it('should not emit an event if the object is not "page" in webhook POST', () => {
        const mockReq = {
            body: {
                object: 'not_page',
                entry: [
                    {
                        messaging: [{ message: 'Hello', sender: { id: '123' } }],
                    },
                ],
            },
        } as unknown as express.Request;

        const mockRes = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn(),
        } as unknown as express.Response;

        bot['server'] = mockExpress;
        const emitSpy = vi.spyOn(bot, 'emit');

        bot.start();

        // @ts-ignore
        const postHandler = mockExpress.post.mock.calls[0][1];
        postHandler(mockReq, mockRes);

        expect(emitSpy).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.send).toHaveBeenCalledWith('Bad Request');
    });

    it('should call sendRequest with correct parameters when sending a message', async () => {
        const sendRequestSpy = vi.spyOn(bot, 'sendRequest').mockResolvedValueOnce({});

        const recipientId = '123456';
        const message = { text: 'Hello!' };

        await bot.sendMessage(recipientId, message);

        expect(sendRequestSpy).toHaveBeenCalledWith('POST', '/me/messages', {
            recipient: { id: recipientId },
            message,
        });
    });

    it('should throw an error when sendTextMessage exceeds 2000 characters', async () => {
        const longMessage = 'a'.repeat(2001); // Create a string longer than 2000 chars

        await expect(bot.sendTextMessage('123', longMessage)).rejects.toThrow(
            'Message exceeds 2000 character limit',
        );
    });

    it('should throw an error when sending an attachment with invalid type', async () => {
        const invalidType = 'invalid_type' as any; // force an invalid type
        await expect(
            bot.sendAttachment('123', invalidType, 'http://example.com/file'),
        ).rejects.toThrow();
    });

    it('should call fetch with the correct URL and method in sendRequest', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: '123', name: 'TestBot' }),
        });

        const result = await bot.sendRequest('GET', 'me');

        expect(mockFetch).toHaveBeenCalledWith(
            `${process.env.GRAPH_URL || 'https://graph.facebook.com'}/v19.0/me?access_token=${mockOptions.accessToken}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: undefined,
            },
        );
        expect(result).toEqual({ id: '123', name: 'TestBot' });
    });
});
