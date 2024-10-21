# Weather Bot Example

This is a simple weather bot example using the `@pyyupsk/messenger-webhooks`
library. The bot responds to user messages with weather information for the
specified city.

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:

   - `ACCESS_TOKEN`: Your Facebook Page Access Token
   - `VERIFY_TOKEN`: Your Webhook Verify Token

4. Build the project:

   ```bash
   npm run build
   ```

5. Start the bot:
   ```bash
   npm start
   ```

## Usage

Once the bot is running and properly configured with Facebook Messenger:

1. Send a message to your Facebook Page with a any place.
2. The bot will respond with the current weather information for that place.

## Development

To run the bot in development mode with hot reloading:

```bash
npm run dev
```

This will start the bot with hot reloading, allowing you to make changes to the
code and see them take effect without restarting the bot.
