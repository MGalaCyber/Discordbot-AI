const { SlashCommandBuilder, ChatInputCommandInteraction, Client, AttachmentBuilder, EmbedBuilder } = require("discord.js");
const { universeAPIClient } = require("@mgalacyber/universeapi");
const uAPI = new universeAPIClient(process.env.UNIVERSE_TOKEN);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ai")
        .setDescription("Start conversation using AI")
        .addSubcommandGroup((grup) => grup.setName("google").setDescription("Start conversation using Google")
            .addSubcommand((sub) => sub.setName("gemini").setDescription("Start conversation using Google Gemini")
                .addStringOption((string) => string.setName("model").setDescription("💡 Select the model version.").setRequired(true)
                    .addChoices(
                        { name: "v1 (Text Only)", value: "v1" },
                        { name: "v2 (With Vision, Image upload option required)", value: "v2" },
                    )
                )
                .addStringOption((string) => string.setName("prompt").setDescription("💡 Input the prompt.").setRequired(true))
                .addAttachmentOption((attach) => attach.setName("image").setDescription("💡 Input the image.").setRequired(false))
            )
        )
        .addSubcommand((sub) => sub.setName("blackbox").setDescription("Start conversation using Blackbox")
            .addStringOption((string) => string.setName("model").setDescription("💡 Select the model version.").setRequired(true)
                .addChoices(
                    { name: "v1 (Model 1)", value: "v1" },
                    { name: "v2 (Model 4)", value: "v2" },
                )
            )
            .addStringOption((string) => string.setName("prompt").setDescription("💡 Input the prompt.").setRequired(true))
        )
        .addSubcommand((sub) => sub.setName("chatgpt").setDescription("Start conversation using ChatGPT")
            .addStringOption((string) => string.setName("model").setDescription("💡 Select the model version.").setRequired(true)
                .addChoices(
                    { name: "v1 (Model 3.5)", value: "v1" },
                    { name: "v2 (Model 4)", value: "v2" },
                    { name: "v3 (Model 4)", value: "v3" },
                )
            )
            .addStringOption((string) => string.setName("prompt").setDescription("💡 Input the prompt.").setRequired(true))
        )
        .addSubcommand((sub) => sub.setName("stablediffusion").setDescription("Start conversation using Stable Diffusion")
            .addStringOption((string) => string.setName("model").setDescription("💡 Select the model version.").setRequired(true)
                .addChoices(
                    { name: "v1", value: "v1" },
                    { name: "v2", value: "v2" },
                    { name: "v3", value: "v3" },
                    { name: "v4", value: "v4" },
                    { name: "v5", value: "v5" },
                    { name: "v6", value: "v6" },
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
        const getModel = interaction.options.getString("model");
        const getImage = interaction.options.getAttachment("image");
        
        client.sendReply(interaction, "Processing... Please wait.");

        if (getSubCommandGroup === "google") {
            if (getSubCommand === "gemini") {
                switch (getModel) {
                    case "v1":
                        await uAPI.V1.AI.Google.Gemini.Pro(getPrompt).then(result => {
                            if (result.status) return client.sendEmbedText(interaction, result.data.text);
                            if (!result.status) return client.editReply(interaction, result.message);
                        });
                        break;
                    case "v2":
                        const attachment = new AttachmentBuilder(getImage, { name: "Image.png" });
                        console.log(attachment)
                        // await uAPI.V1.AI.Google.Gemini.ProVisionModelUrl(getPrompt).then(result => {
                        //     if (result.status) return interaction.editReply({
                        //         content: "",
                        //         embeds: []
                        //     });
                        //     if (!result.status) return interaction.editReply({
                        //         content: result.message
                        //     });
                        // });
                        break;
                
                    default:
                        break;
                }
            }
        }
        if (getSubCommand === "blackbox") {
            switch (getModel) {
                case "v1":
                    await uAPI.V1.AI.Blackbox.Model1(getPrompt).then(result => {
                        if (result.status) return client.sendEmbedText(interaction, result.data.text);
                        if (!result.status) return client.editReply(interaction, result.message);
                    });
                    break;

                case "v2":
                    await uAPI.V1.AI.Blackbox.Model2v4(getPrompt).then(result => {
                        if (result.status) return client.sendEmbedText(interaction, result.data.text);
                        if (!result.status) return client.editReply(interaction, result.message);
                    });
                    break;
            
                default:
                    break;
            }
        }
        if (getSubCommand === "chatgpt") {
            switch (getModel) {
                case "v1":
                    await uAPI.V1.AI.ChatGPT.Model6(getPrompt).then(result => {
                        if (result.status) return client.sendEmbedText(interaction, result.data.text);
                        if (!result.status) return client.editReply(interaction, result.message);
                    });
                    break;

                case "v2":
                    await uAPI.V1.AI.ChatGPT.Model9v4(getPrompt).then(result => {
                        if (result.status) return client.sendEmbedText(interaction, result.data.text);
                        if (!result.status) return client.editReply(interaction, result.message);
                    });
                    break;

                case "v3":
                    await uAPI.V1.AI.ChatGPT.Model10v4(getPrompt).then(result => {
                        if (result.status) return client.sendEmbedText(interaction, result.data.text);
                        if (!result.status) return client.editReply(interaction, result.message);
                    });
                    break;
            
                default:
                    break;
            }
        }
        if (getSubCommand === "stablediffusion") {
            switch (getModel) {
                case "v1":
                    await uAPI.V1.AI.TextToImage.Model1(getPrompt).then(result => {
                        if (result.status) return client.sendEmbedImage(interaction, result.data.url);
                        if (!result.status) return client.editReply(interaction, result.message);
                    });
                    break;

                case "v2":
                    await uAPI.V1.AI.TextToImage.Model2(getPrompt).then(result => {
                        if (result.status) return client.sendEmbedImage(interaction, result.data.url);
                        if (!result.status) return client.editReply(interaction, result.message);
                    });
                    break;

                case "v3":
                    await uAPI.V1.AI.TextToImage.Model3(getPrompt).then(result => {
                        if (result.status) return client.sendEmbedImage(interaction, result.data.url);
                        if (!result.status) return client.editReply(interaction, result.message);
                    });
                    break;

                case "v4":
                    await uAPI.V1.AI.TextToImage.Model4(getPrompt).then(result => {
                        if (result.status) return client.sendEmbedImage(interaction, result.data.url);
                        if (!result.status) return client.editReply(interaction, result.message);
                    });
                    break;

                case "v5":
                    await uAPI.V1.AI.TextToImage.Model5(getPrompt).then(result => {
                        if (result.status) return client.sendEmbedImage(interaction, result.data.url);
                        if (!result.status) return client.editReply(interaction, result.message);
                    });
                    break;

                case "v6":
                    await uAPI.V1.AI.TextToImage.Model6(getPrompt).then(result => {
                        if (result.status) return client.sendEmbedImage(interaction, result.data.url);
                        if (!result.status) return client.editReply(interaction, result.message);
                    });
                    break;
            
                default:
                    break;
            }
        }
    }
};