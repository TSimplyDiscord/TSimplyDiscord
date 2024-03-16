import process from 'node:process';
import { type SecretsLoader, type SecretsStore } from './SecretsStore.js';

export const secretsLoader: SecretsLoader = (options) => {
	const secrets: SecretsStore = {
		discordAPIKey: '',
		discordAPPID: '',
	};

	for (const key of options.keys) {
		if (process.env[key]) {
			secrets[key] = process.env[key]!;
		} else {
			throw new Error(`Missing ${key} in environment.`);
		}
	}

	return secrets;
};
