const { Client, Events } = require("discord.js");
const Betterlog = require("betterlogs.js");
require("colors");

module.exports = {
    name: Events.ClientReady,
    once: true,
    
    /**
     * @param {Client} client
     */
    async execute(client) {
        Betterlog.event("1", "Successfully logging to Dicord application client.".yellow);
        Betterlog.event("2", `${client.user.username} `.magenta + "is online.".yellow);
    }
}