const { SlashCommandBuilder, ChatInputCommandInteraction, Client, AttachmentBuilder, EmbedBuilder } = require("discord.js");
const { UniverseClient } = require("@mgalacyber/universeapi");
const uAPI = new UniverseClient(process.env.UNIVERSE_TOKEN);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ai")
        .setDescription("Start conversation using AI")
        .addSubcommandGroup((grup) => grup.setName("google").setDescription("Start conversation using Google")
            .addSubcommand((sub) => sub.setName("gemini").setDescription("Start conversation using Google Gemini")
                .addStringOption((string) => string.setName("model").setDescription("💡 Select the model.").setRequired(true)
                    .addChoices(
                        { name: "GEMINI 1.0-PRO", value: "1.0-pro" },
                        { name: "GEMINI 1.0-PRO-VISION (Deprecated)", value: "1.0-pro-vision" },
                    )
                )
                .addStringOption((string) => string.setName("version").setDescription("💡 Select the api model version.").setRequired(true)
                    .addChoices(
                        { name: "v1 (Support: 1.0-Pro, (1.0-Pro-Vision > {Image required}))", value: "1" },
                        { name: "v2 (Support: 1.0-Pro)", value: "2" },
                        { name: "v3 (Support: 1.0-Pro)", value: "3" },
                    )
                )
                .addStringOption((string) => string.setName("prompt").setDescription("💡 Input the prompt.").setRequired(true))
                .addAttachmentOption((attach) => attach.setName("image").setDescription("💡 Input the image.").setRequired(false))
            )
        )
        .addSubcommand((sub) => sub.setName("blackbox").setDescription("Start conversation using Blackbox")
            .addStringOption((string) => string.setName("version").setDescription("💡 Select the api model version.").setRequired(true)
                .addChoices(
                    { name: "v1", value: "1" },
                    { name: "v2", value: "2" },
                )
            )
            .addStringOption((string) => string.setName("prompt").setDescription("💡 Input the prompt.").setRequired(true))
        )
        .addSubcommand((sub) => sub.setName("openai").setDescription("Start conversation using OpenAI")
            .addStringOption((string) => string.setName("model").setDescription("💡 Select the model.").setRequired(true)
                .addChoices(
                    { name: "GPT 3.5-Turbo", value: "gpt3.5-turbo" },
                    { name: "GPT 4", value: "gpt4" },
                    { name: "DALLE-2", value: "dalle-2" },
                )
            )
            .addStringOption((string) => string.setName("version").setDescription("💡 Select the api model version.").setRequired(true)
                .addChoices(
                    { name: "v1 (Support: GPT3.5-Turbo, GPT4, Dalle-2)", value: "1" },
                    { name: "v2 (Support: GPT3.5-Turbo, GPT4, Dalle-2)", value: "2" },
                    { name: "v3 (Support: GPT3.5-Turbo, GPT4)", value: "3" },
                    { name: "v4 (Support: GPT3.5-Turbo)", value: "4" },
                    { name: "v5 (Support: GPT3.5-Turbo)", value: "5" },
                    { name: "v6 (Support: GPT3.5-Turbo)", value: "6" },
                    { name: "v7 (Support: GPT3.5-Turbo)", value: "7" },
                    { name: "v8 (Support: GPT3.5-Turbo)", value: "8" },
                )
            )
            .addStringOption((string) => string.setName("prompt").setDescription("💡 Input the prompt.").setRequired(true))
        )
        .addSubcommand((sub) => sub.setName("text2image").setDescription("Start conversation using Text To Image")
            .addStringOption((string) => string.setName("version").setDescription("💡 Select the api model version.").setRequired(true)
                .addChoices(
                    { name: "v1", value: "1" },
                    { name: "v2", value: "2" },
                    { name: "v3", value: "3" },
                    { name: "v4", value: "4" },
                    { name: "v5", value: "5" },
                    { name: "v6", value: "6" },
                    { name: "v7", value: "7" },
                )
            )
            .addStringOption((string) => string.setName("prompt").setDescription("💡 Input the prompt.").setRequired(true))
        )
        .addSubcommand((sub) => sub.setName("stablediffusion").setDescription("Start conversation using Stable Diffusion")
            .addStringOption((string) => string.setName("version").setDescription("💡 Select the api model version.").setRequired(true)
                .addChoices(
                    { name: "v1", value: "1" },
                )
            )
            .addStringOption((string) => string.setName("prompt").setDescription("💡 Input the prompt.").setRequired(true))
        ),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     * @returns 
     */
    async execute(client, interaction) {
        const getSubCommandGroup = interaction.options.getSubcommandGroup();
        const getSubCommand = interaction.options.getSubcommand();
        const getPrompt = interaction.options.getString("prompt");
        const getImage = interaction.options.getAttachment("image");
        const getVersion = interaction.options.getString("version");
        const getModel = interaction.options.getString("model");
        
        client.sendReply(interaction, "Processing... Please wait.");

        if (getSubCommandGroup === "google") {
            if (getSubCommand === "gemini") {
                switch (getModel) {
                    case "1.0-pro":
                        await uAPI.V1.AI.Google.Gemini.Text({
                            model: getModel,
                            version: parseInt(getVersion),
                            prompt: getPrompt
            
                        }).then(result => {
                            if (result.status) return client.sendEmbedText(interaction, result.data.text);
                            if (!result.status) return client.editReply(interaction, result.message);
                        });
                        
                        break;
                    case "1.0-pro-vision":
                        await uAPI.V1.AI.Google.Gemini.Vision({
                            model: getModel,
                            type: "url",
                            version: parseInt(getVersion),
                            image: getImage,
                            prompt: getPrompt
            
                        }).then(result => {
                            if (result.status) return client.sendEmbedText(interaction, result.data.text);
                            if (!result.status) return client.editReply(interaction, result.message);
                        });
                        
                        break;
                
                    default:
                        break;
                }
            }
        }
        if (getSubCommand === "blackbox") {
            await uAPI.V1.AI.Blackbox.Text({
                version: parseInt(getVersion),
                prompt: getPrompt

            }).then(result => {
                if (result.status) return client.sendEmbedText(interaction, result.data.text);
                if (!result.status) return client.editReply(interaction, result.message);
            });
        }
        if (getSubCommand === "openai") {
            switch (getModel) {
                case "gpt3.5-turbo":
                case "gpt4":
                    await uAPI.V1.AI.OpenAI.GPT.Text({
                        model: getModel,
                        version: parseInt(getVersion),
                        prompt: getPrompt
        
                    }).then(result => {
                        if (result.status) return client.sendEmbedText(interaction, result.data.text);
                        if (!result.status) return client.editReply(interaction, result.message);
                    });
                    
                    break;
                case "dalle-2":
                    await uAPI.V1.AI.OpenAI.DALLE.Generate({
                        model: getModel,
                        version: parseInt(getVersion),
                        prompt: getPrompt
        
                    }).then(result => {
                        if (result.status) return client.sendEmbedImage(interaction, result.data.url);
                        if (!result.status) return client.editReply(interaction, result.message);
                    });
                    
                    break;
            
                default:
                    break;
            }
        }
        if (getSubCommand === "text2image") {
            await uAPI.V1.AI.TextToImage.Generate({
                version: parseInt(getVersion),
                prompt: getPrompt

            }).then(result => {
                if (result.status) return client.sendEmbedImage(interaction, result.data.url);
                if (!result.status) return client.editReply(interaction, result.message);
            });
        }
        if (getSubCommand === "stablediffusion") {
            await uAPI.V1.AI.StableDiffusion.Generate({
                version: parseInt(getVersion),
                prompt: getPrompt

            }).then(result => {
                if (result.status) return client.sendEmbedImage(interaction, result);
                if (!result.status) return client.editReply(interaction, result.message);
            });
        }
    }
};