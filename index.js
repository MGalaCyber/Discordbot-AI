const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const Betterlog = require("betterlogs.js");
require("dotenv").config();
require("colors");

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User
    ],
});

client.commands = new Collection();
client.events = new Collection();

client.login(process.env.DISCORD_TOKEN).then(() => {
    Betterlog.info("1", "Start logging into Discord application...".yellow);

    require("./Handlers/loadEvents")(client);
    require("./Handlers/loadCommands")(client);

}).catch((err) => {
    Betterlog.error("1", `\n${err}`.bgRed);
});