import process from 'node:process';
import { Client, Collection, GatewayIntentBits, Events } from 'discord.js';
import { type Logger } from './lib/Logger/Logger.js';
import { PinoLogger } from './lib/Logger/PinoLogger.js';
import { loadSecrets } from './lib/SecretsStore/SecretsStore.js';
import { secretsLoader } from './lib/SecretsStore/envLoader.js';
import { loadFiles } from './lib/loadFiles.js';

// Initialize Discord.js client
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

// Load secrets
client.secrets = await loadSecrets(secretsLoader, { additionalKeys: [] });

// Initialize logger and register to log uncaught errors
client.logger = new PinoLogger(client.secrets) as Logger;
process.on('uncaughtException', (error) => {
	client.logger.error(new Error('Uncaught Exception:', { cause: error }));
	process.exit(1);
});
process.on('unhandledRejection', (error) => {
	client.logger.error(
		new Error('Unhandled promise rejection:', { cause: error }),
	);
	process.exit(1);
});

// Register events related to logging here, so they are available
// as the remainder of the client loads.
client.on(Events.Debug, (message) => {
	client.logger.debug(message);
});
client.on(Events.Warn, (message) => {
	client.logger.warn(message);
});
client.on(Events.Error, (message) => {
	client.logger.error(message);
});

// Populate client with needed data
client.commands = new Collection<string, Command>();
client.cooldowns = new Collection<string, number>();

const handlers = (await loadFiles('handlers')) as Handler[];

for (const handler of handlers) {
	handler.execute(client);
}

// Login
await client.login(client.secrets.discordAPIKey);
