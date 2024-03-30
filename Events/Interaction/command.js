const { BaseInteraction, Client, Events } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    
    /**
     * @param {BaseInteraction} interaction
     * @param {Client} client
     * @returns
     */
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            if (interaction.user.bot) return;
            if (interaction.user.system) return;

            const getCommand = client.commands.get(interaction.commandName);
            if (getCommand) {
                getCommand.execute(client, interaction);
            };
        };
    }
};