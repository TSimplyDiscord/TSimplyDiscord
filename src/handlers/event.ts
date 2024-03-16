import { loadFiles } from '../lib/loadFiles.js';

const handler: Handler = {
	name: 'event',
	execute(client) {
		for (const element of this.elements as BotEvent[]) {
			if (element.once) {
				client.once(element.name, (...arguments_) => {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
					element.execute(client, ...arguments_);
				});
			} else {
				client.on(element.name, (...arguments_) => {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
					element.execute(client, ...arguments_);
				});
			}

			client.logger.info(`🌠 Successfully loaded event ${element.name}`);
		}
	},
	elements: (await loadFiles('events')) as BotEvent[],
};

export default handler;
