const { SlashCommandBuilder, CommandInteraction, Client } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Get bot latency"),

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     * @returns 
     */
    async execute(client, interaction) {
        return interaction.reply({
            ephemeral: true,
            content: `${client.ws.ping}ms`
        });
    }
};