import { Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
import { loadFiles } from '../lib/loadFiles.js';

const handler: Handler = {
	name: 'command',
	execute(client) {
		const commands = [];
		for (const element of this.elements as Command[]) {
			commands.push(element.command);
			client.commands.set(element.command.name, element);
		}

		// Register commands
		const rest = new REST({ version: '10' }).setToken(
			client.secrets.discordAPIKey,
		);
		rest
			.put(Routes.applicationCommands(client.secrets.discordAPPID), {
				body: commands.map((command) => command.toJSON()),
			})
			.then((data: any) => {
				client.logger.info(
					`🔥 Successfully loaded ${data.length} slash command(s)`,
				);
			})
			.catch((error) => {
				if (error instanceof Error) {
					client.logger.error(error);
				} else {
					client.logger.error(String(error));
				}
			});
	},
	elements: (await loadFiles('commands')) as Command[],
};

export default handler;
