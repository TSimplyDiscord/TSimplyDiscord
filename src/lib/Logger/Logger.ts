export abstract class Logger {
	abstract error(error: Error | string): void;
	abstract warn(message: string): void;
	abstract info(message: string): void;
	abstract debug(message: string): void;
}
