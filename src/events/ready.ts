import { Events, type Client } from 'discord.js';

const event: BotEvent = {
	name: Events.ClientReady,
	once: true,
	execute(client: Client) {
		client.logger.info(`💪 Logged in as ${client.user?.tag}`);
	},
};

export default event;
