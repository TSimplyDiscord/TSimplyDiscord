import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const command: Command = {
	command: new SlashCommandBuilder()
		.setName('ping')
		.setDescription("Shows the bot's ping"),
	async execute(interaction) {
		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setAuthor({ name: 'MRC License' })
					.setDescription(`🏓 Pong! \n 📡 Ping: ${interaction.client.ws.ping}`),
			],
		});
	},
	cooldown: 10,
};

export default command;
