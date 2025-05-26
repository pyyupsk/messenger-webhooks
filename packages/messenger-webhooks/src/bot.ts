import type { Express, Request, Response } from 'express';

import EventEmitter from 'events';
import express, { json } from 'express';

import type { EventType } from '@/types';

import { GRAPH_URL } from '@/constants';
import { colors, determineEventType, logger } from '@/utils';

/** Configuration options for the Bot instance. */
interface Options {
    /** The Facebook App access token. */
    accessToken: string;
    /** The verification token for webhook setup. */
    verifyToken: string;
    /** The port number for the server (default: 8080). */
    port?: number;
    /** The webhook endpoint (default: '/webhook'). */
    endpoint?: string;
    /** The Facebook Graph API version (default: 'v19.0'). */
    version?: string;
}

/** Represents a Bot that integrates with the Facebook Messenger API. */
export class Bot extends EventEmitter {
    private readonly server: Express;
    private readonly accessToken: string;
    private readonly verifyToken: string;

    /** Public bot configuration. */
    public bot: {
        id: string;
        name: string;
        port: number;
        endpoint: string;
        version: string;
    };

    /**
     * Creates an instance of Bot.
     * @param options - Configuration options for the Bot.
     */
    constructor(options: Options) {
        super();

        this.server = express();
        this.accessToken = options.accessToken;
        this.verifyToken = options.verifyToken;

        if (!options.accessToken) {
            logger.error(
                'Access token is required: https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start',
            );
        }
        if (!options.verifyToken) {
            logger.error(
                'Verify token is required: https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start',
            );
        }

        this.bot = {
            id: '',
            name: '',
            port: options.port ?? 8080,
            endpoint: options.endpoint ?? '/webhook',
            version: options.version ?? 'v19.0',
        };
    }

    /**
     * Starts the bot server and sets up the webhook endpoints.
     */
    public start(): void {
        this.server.use(json());

        this.server.get(this.bot.endpoint, (req: Request, res: Response): void => {
            const {
                'hub.mode': mode,
                'hub.challenge': challenge,
                'hub.verify_token': verifyToken,
            } = req.query;

            if (mode && verifyToken) {
                if (mode === 'subscribe' && verifyToken === this.verifyToken) {
                    res.status(200).send(challenge);
                } else {
                    res.status(403).send('Forbidden');
                }
            } else {
                res.status(400).send('Bad Request');
            }
        });

        this.server.post(this.bot.endpoint, (req: Request, res: Response): void => {
            const { object, entry } = req.body;

            if (object !== 'page') {
                res.status(400).send('Bad Request');
                return;
            }

            for (const e of entry) {
                const messaging = e.messaging[0];
                const event = determineEventType(messaging);

                if (event) {
                    this.emit(event, messaging as EventType[keyof EventType]);
                }
            }

            res.sendStatus(200);
        });

        this.server.listen(this.bot.port, async (): Promise<void> => {
            if (!this.bot.id || !this.bot.name) {
                await this.getAppInfo().catch((error): void => {
                    logger.error(
                        'Error getting app info:',
                        error instanceof Error ? error.message : String(error),
                    );
                });
            }

            logger.info(
                `${this.bot.name} ${colors.gray}(${this.bot.id})${colors.reset} is running on port ${colors.yellow}${this.bot.port}${colors.reset} ${colors.gray}(${this.bot.endpoint})${colors.reset}`,
            );
        });
    }

    /**
     * Sends an HTTP request to the Facebook Graph API.
     * @template T - The type of the response data.
     * @param method - The HTTP method.
     * @param endpoint - The API endpoint.
     * @param requestBody - The request body for 'POST' requests.
     * @returns A promise that resolves with the response data.
     * @throws Will throw an error if the response is not ok.
     */
    public async sendRequest<T>(
        method: 'GET' | 'POST',
        endpoint: string,
        requestBody?: Record<string, unknown>,
    ): Promise<T> {
        const response = await fetch(
            `${GRAPH_URL}/${this.bot.version}/${endpoint}?access_token=${this.accessToken}`,
            {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody ? JSON.stringify(requestBody) : undefined,
            },
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error!: ${response.statusText}`, { cause: errorData });
        }

        return response.json() as Promise<T>;
    }

    /**
     * Retrieves the bot's application information from the Facebook API.
     */
    private async getAppInfo(): Promise<void> {
        interface AppInfo {
            id: string;
            name: string;
        }

        const response = await this.sendRequest<AppInfo>('GET', 'me');
        this.bot.id = response.id;
        this.bot.name = response.name;
    }

    /**
     * Sends a message to a recipient.
     * @param recipientId - The ID of the recipient.
     * @param message - The message object to send.
     */
    public async sendMessage(recipientId: string, message: object): Promise<void> {
        await this.sendRequest('POST', '/me/messages', {
            recipient: { id: recipientId },
            message,
        });
    }

    /**
     * Sends a text message to a recipient.
     * @param recipientId - The ID of the recipient.
     * @param message - The text message to send.
     * @throws Will throw an error if the message exceeds 2000 characters.
     */
    public async sendTextMessage(recipientId: string, message: string): Promise<void> {
        if (message.length > 2000) {
            throw new Error('Message exceeds 2000 character limit');
        }
        await this.sendRequest('POST', '/me/messages', {
            recipient: { id: recipientId },
            message: { text: message },
        });
    }

    /**
     * Sends an attachment (audio, file, image, video, or template) to a recipient.
     * @param recipientId - The ID of the recipient.
     * @param type - The type of the attachment.
     * @param url - The URL of the attachment.
     * @param isReusable - Whether the attachment is reusable.
     */
    public async sendAttachment(
        recipientId: string,
        type: 'audio' | 'file' | 'image' | 'video' | 'template',
        url: string,
        isReusable: boolean = true,
    ): Promise<void> {
        await this.sendRequest('POST', 'me/messages', {
            recipient: { id: recipientId },
            message: {
                attachment: {
                    type,
                    payload: {
                        url,
                        is_reusable: isReusable,
                    },
                },
            },
        });
    }

    /**
     * Sets the typing status of the recipient.
     * @param recipientId - The ID of the recipient.
     * @param isTyping - Whether the recipient is typing.
     */
    public async setTyping(recipientId: string, isTyping: boolean): Promise<void> {
        await this.sendRequest('POST', '/me/messages', {
            recipient: { id: recipientId },
            sender_action: isTyping ? 'typing_on' : 'typing_off',
        });
    }
}
