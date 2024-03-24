import { type TextChannel } from 'discord.js';

const crontab: CronTab = {
	name: 'test',
	schedule: '* * * * *',
	async execute(client) {
		const channel = client.channels.cache.get(
			'xxxxxxxxxxxxxxxxxxx',
		) as TextChannel;
		await channel?.send('content');
	},
};

export default crontab;
