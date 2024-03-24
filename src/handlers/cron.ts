import cron from 'node-cron';
import { loadFiles } from '../lib/loadFiles.js';

const handler: Handler = {
	name: 'cron',
	elements: (await loadFiles('crontabs')) as CronTab[],
	execute(client) {
		for (const element of this.elements as CronTab[]) {
			if (cron.validate(element.schedule)) {
				cron.schedule(element.schedule, () => {
					element.execute(client);
				});
			} else {
				client.logger.error(`${element.name} crontab has an invalid schedule`);
			}
		}
	},
};

export default handler;
