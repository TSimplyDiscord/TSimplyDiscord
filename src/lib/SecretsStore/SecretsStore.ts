/*
 * A SecretsStore must contain a Discord API key and App ID, and may contain
 * additional secrets to enable additional services.
 *
 * When implementing a loader is vital the loader allows for optional keys.
 */
export type SecretsStore = {
	[key: string]: string;
	discordAPIKey: string;
	discordAPPID: string;
};

/*
 * A SecretsLoader is a function called by loadSecrets that retrieves secrets
 * from a specified secrets management system.returns a SecretsStore.
 *
 * PRs implementing SecretsLoaders for various secret management systems are
 * encouraged and appreciated.
 */
export type SecretsLoader = (options: {
	[key: string]: any;
	keys: string[];
}) => SecretsStore | Promise<SecretsStore>;

/*
 * This function should not be edited. If you need secrets from a system not
 * already provided you should write a SecretsLoader for loadSecrets to call.
 */
export async function loadSecrets(
	loader: SecretsLoader,
	options?: { [key: string]: any; additionalKeys?: string[] },
) {
	let keys = ['discordAPIKey', 'discordAPPID'];
	if (options?.additionalKeys) {
		keys = keys.concat(options.additionalKeys);
	}

	return loader({ keys, ...options });
}
