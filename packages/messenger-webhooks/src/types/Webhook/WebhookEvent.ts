export type WebhookEvent = {
  sender: Sender;
  recipient: Recipient;
  timestamp: number;
};

type Sender = {
  id: string;
};

type Recipient = {
  id: string;
};
