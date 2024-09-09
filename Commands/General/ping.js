const { SlashCommandBuilder, CommandInteraction, Client, ApplicationIntegrationType, InteractionContextType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Get bot latency")
        .setIntegrationTypes(ApplicationIntegrationType.UserInstall)
        .setContexts(InteractionContextType.BotDM, InteractionContextType.Guild, InteractionContextType.PrivateChannel),

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