import type {
	SlashCommandBuilder,
	Collection,
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	ModalSubmitInteraction,
	Client,
} from 'discord.js';
import type { SecretsStore } from './lib/SecretsStore/SecretsStore.js';
import type { Logger } from './lib/Logger/Logger.js';

declare global {
	type Command = {
		command: SlashCommandBuilder;
		execute: (interaction: ChatInputCommandInteraction) => void;
		autocomplete?: (interaction: AutocompleteInteraction) => void;
		modal?: (interaction: ModalSubmitInteraction) => void;
		cooldown?: number; // In seconds
	};

	type Handler = {
		name: string;
		elements: Command[] | BotEvent[] | Cron[];
		execute: (client: Client) => void;
	};

	type BotEvent = {
		name: string;
		once?: boolean | false;
		execute: (...arguments) => void;
	};

	type Cron = {
		name: string;
	};
}

declare module 'discord.js' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Client {
		secrets: SecretsStore;
		logger: Logger;
		commands: Collection<string, Command>;
		cooldowns: Collection<string, number>;
		API_KEY: string;
		APP_ID: string;
	}
}
