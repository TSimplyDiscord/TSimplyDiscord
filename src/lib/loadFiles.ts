import { readdirSync } from 'node:fs';
import { join } from 'node:path';

export async function loadFiles(type: string) {
	const directory = join(import.meta.dirname + '/..', type);
	const files = [];

	for (const file of readdirSync(directory, {
		recursive: true,
	}) as string[]) {
		if (file.search(/\.[jt]s$/) > 0) {
			files.push(import(`${directory}/${file}`));
		}
	}

	const results: Array<Record<string, unknown>> = [];

	await Promise.all(files)
		.then((result) => {
			for (const element of result) {
				const contents = element.default as Record<string, unknown>;
				results.push(contents);
			}
		})
		.catch((error) => {
			console.log(error.message);
		});

	return results;
}
