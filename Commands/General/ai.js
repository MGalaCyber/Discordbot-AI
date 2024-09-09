const { SlashCommandBuilder, ChatInputCommandInteraction, Client, ApplicationIntegrationType, InteractionContextType } = require("discord.js");
const { UniverseClient } = require("@mgalacyber/universeapi");
const uAPI = new UniverseClient(process.env.UNIVERSE_TOKEN);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ai")
        .setDescription("Start conversation using AI")
        .setIntegrationTypes(ApplicationIntegrationType.UserInstall)
        .setContexts(InteractionContextType.BotDM, InteractionContextType.Guild, InteractionContextType.PrivateChannel)
        .addSubcommandGroup((grup) => grup.setName("google").setDescription("Start conversation using Google")
            .addSubcommand((sub) => sub.setName("gemini").setDescription("Start conversation using Google Gemini")
                .addStringOption((string) => string.setName("model").setDescription("💡 Select the model.").setRequired(true)
                    .addChoices(
                        { name: "GEMINI 1.0-PRO", value: "1.0-pro" },
                        { name: "GEMINI 1.5-PRO", value: "1.5-pro" },
                        { name: "GEMINI 1.0-PRO-VISION (Deprecated)", value: "1.0-pro-vision" },
                    )
                )
                .addStringOption((string) => string.setName("version").setDescription("💡 Select the api model version.").setRequired(true)
                    .addChoices(
                        { name: "v1 (Support: 1.0-Pro, 1.5-Pro, (1.0-Pro-Vision > {Image required}))", value: "1" },
                        { name: "v2 (Support: 1.0-Pro)", value: "2" },
                        { name: "v3 (Support: 1.0-Pro)", value: "3" },
                    )
                )
                .addStringOption((string) => string.setName("prompt").setDescription("💡 Input the prompt.").setRequired(true))
                .addAttachmentOption((attach) => attach.setName("image").setDescription("💡 Input the image.").setRequired(false))
                .addBooleanOption((boolean) => boolean.setName("ephemeral").setDescription("💡 Select the ephemeral mode (default: true).").setRequired(false))
            )
            .addSubcommand((sub) => sub.setName("gemma").setDescription("Start conversation using Google Gemma")
                .addStringOption((string) => string.setName("version").setDescription("💡 Select the api model version.").setRequired(true)
                    .addChoices(
                        { name: "v1", value: "1" },
                    )
                )
                .addStringOption((string) => string.setName("prompt").setDescription("💡 Input the prompt.").setRequired(true))
                .addAttachmentOption((attach) => attach.setName("image").setDescription("💡 Input the image.").setRequired(false))
                .addBooleanOption((boolean) => boolean.setName("ephemeral").setDescription("💡 Select the ephemeral mode (default: true).").setRequired(false))
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
            .addBooleanOption((boolean) => boolean.setName("ephemeral").setDescription("💡 Select the ephemeral mode (default: true).").setRequired(false))
        )
        .addSubcommand((sub) => sub.setName("openai").setDescription("Start conversation using OpenAI")
            .addStringOption((string) => string.setName("model").setDescription("💡 Select the model.").setRequired(true)
                .addChoices(
                    { name: "GPT 3", value: "gpt3" },
                    { name: "GPT 3.5", value: "gpt3.5" },
                    { name: "GPT 3.5-Turbo", value: "gpt3.5-turbo" },
                    { name: "GPT 4", value: "gpt4" },
                    { name: "DALLE-2", value: "dalle-2" },
                    { name: "Davinci", value: "davinci" },
                    { name: "Babbage", value: "babbage" },
                    { name: "ADA", value: "ada" },
                    { name: "Curie", value: "curie" },
                )
            )
            .addStringOption((string) => string.setName("version").setDescription("💡 Select the api model version.").setRequired(true)
                .addChoices(
                    { name: "v1 (Support: GPT3, GPT3.5, GPT3.5-Turbo, GPT4, Dalle, Davinci, Babbage)", value: "1" },
                    { name: "v2 (Support: GPT3.5, GPT3.5-Turbo, GPT4, Davinci, Babbage)", value: "2" },
                    { name: "v3 (Support: GPT3.5-Turbo, GPT4)", value: "3" },
                    { name: "v4 (Support: GPT3.5-Turbo, GPT4)", value: "4" },
                    { name: "v5 (Support: GPT3.5-Turbo, GPT4)", value: "5" },
                    { name: "v6 (Support: GPT4)", value: "6" },
                )
            )
            .addStringOption((string) => string.setName("prompt").setDescription("💡 Input the prompt.").setRequired(true))
            .addBooleanOption((boolean) => boolean.setName("ephemeral").setDescription("💡 Select the ephemeral mode (default: true).").setRequired(false))
        )
        .addSubcommand((sub) => sub.setName("text2image").setDescription("Start conversation using Text To Image")
            .addStringOption((string) => string.setName("version").setDescription("💡 Select the api model version.").setRequired(true)
                .addChoices(
                    { name: "v1", value: "1" },
                    { name: "v2", value: "2" },
                    { name: "v3", value: "3" },
                    { name: "v4", value: "4" },
                )
            )
            .addStringOption((string) => string.setName("prompt").setDescription("💡 Input the prompt.").setRequired(true))
            .addStringOption((string) => string.setName("model").setDescription("💡 Select the ai model (v4 only).").setRequired(false))
            .addBooleanOption((boolean) => boolean.setName("ephemeral").setDescription("💡 Select the ephemeral mode (default: true).").setRequired(false))
        )
        .addSubcommand((sub) => sub.setName("stablediffusion").setDescription("Start conversation using Stable Diffusion")
            .addStringOption((string) => string.setName("version").setDescription("💡 Select the api model version.").setRequired(true)
                .addChoices(
                    { name: "v1", value: "1" },
                )
            )
            .addStringOption((string) => string.setName("prompt").setDescription("💡 Input the prompt.").setRequired(true))
            .addBooleanOption((boolean) => boolean.setName("ephemeral").setDescription("💡 Select the ephemeral mode (default: true).").setRequired(false))
        )
        .addSubcommand((sub) => sub.setName("llama").setDescription("Start conversation using Llama")
            .addStringOption((string) => string.setName("version").setDescription("💡 Select the api model version.").setRequired(true)
                .addChoices(
                    { name: "v1", value: "1" },
                )
            )
            .addStringOption((string) => string.setName("prompt").setDescription("💡 Input the prompt.").setRequired(true))
            .addBooleanOption((boolean) => boolean.setName("ephemeral").setDescription("💡 Select the ephemeral mode (default: true).").setRequired(false))
        )
        .addSubcommand((sub) => sub.setName("chatglm").setDescription("Start conversation using ChatGLM")
            .addStringOption((string) => string.setName("version").setDescription("💡 Select the api model version.").setRequired(true)
                .addChoices(
                    { name: "v1", value: "1" },
                )
            )
            .addStringOption((string) => string.setName("prompt").setDescription("💡 Input the prompt.").setRequired(true))
            .addBooleanOption((boolean) => boolean.setName("ephemeral").setDescription("💡 Select the ephemeral mode (default: true).").setRequired(false))
        )
        .addSubcommand((sub) => sub.setName("deepseek").setDescription("Start conversation using Deepseek")
            .addStringOption((string) => string.setName("version").setDescription("💡 Select the api model version.").setRequired(true)
                .addChoices(
                    { name: "v1", value: "1" },
                )
            )
            .addStringOption((string) => string.setName("prompt").setDescription("💡 Input the prompt.").setRequired(true))
            .addBooleanOption((boolean) => boolean.setName("ephemeral").setDescription("💡 Select the ephemeral mode (default: true).").setRequired(false))
        )
        .addSubcommand((sub) => sub.setName("miaxtral").setDescription("Start conversation using Miaxtral")
            .addStringOption((string) => string.setName("version").setDescription("💡 Select the api model version.").setRequired(true)
                .addChoices(
                    { name: "v1", value: "1" },
                )
            )
            .addStringOption((string) => string.setName("prompt").setDescription("💡 Input the prompt.").setRequired(true))
            .addBooleanOption((boolean) => boolean.setName("ephemeral").setDescription("💡 Select the ephemeral mode (default: true).").setRequired(false))
        )
        .addSubcommand((sub) => sub.setName("qwen").setDescription("Start conversation using Qwen")
            .addStringOption((string) => string.setName("version").setDescription("💡 Select the api model version.").setRequired(true)
                .addChoices(
                    { name: "v1", value: "1" },
                )
            )
            .addStringOption((string) => string.setName("prompt").setDescription("💡 Input the prompt.").setRequired(true))
            .addBooleanOption((boolean) => boolean.setName("ephemeral").setDescription("💡 Select the ephemeral mode (default: true).").setRequired(false))
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
        const getMode = interaction.options.getBoolean("ephemeral") || true;
        
        client.sendReply(interaction, "Processing... Please wait.", getMode);

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
                    case "1.5-pro":
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
            if (getSubCommand === "gemma") {
                await uAPI.V1.AI.Google.Gemma.Text({
                    model: getModel,
                    version: parseInt(getVersion),
                    prompt: getPrompt
    
                }).then(result => {
                    if (result.status) return client.sendEmbedText(interaction, result.data.text);
                    if (!result.status) return client.editReply(interaction, result.message);
                });
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
                case "gpt3":
                case "gpt3.5":
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
                case "davinci":
                    await uAPI.V1.AI.OpenAI.Davinci.Generate({
                        model: getModel,
                        version: parseInt(getVersion),
                        prompt: getPrompt
        
                    }).then(result => {
                        if (result.status) return client.sendEmbedImage(interaction, result.data.url);
                        if (!result.status) return client.editReply(interaction, result.message);
                    });
                    break;
                case "babbage":
                    await uAPI.V1.AI.OpenAI.Babbage.Text({
                        model: getModel,
                        version: parseInt(getVersion),
                        prompt: getPrompt
        
                    }).then(result => {
                        if (result.status) return client.sendEmbedText(interaction, result.data.text);
                        if (!result.status) return client.editReply(interaction, result.message);
                    });
                    break;
                case "ada":
                    await uAPI.V1.AI.OpenAI.ADA.Text({
                        model: getModel,
                        version: parseInt(getVersion),
                        prompt: getPrompt
        
                    }).then(result => {
                        if (result.status) return client.sendEmbedText(interaction, result.data.text);
                        if (!result.status) return client.editReply(interaction, result.message);
                    });
                    break;
                case "curie":
                    await uAPI.V1.AI.OpenAI.Curie.Text({
                        model: getModel,
                        version: parseInt(getVersion),
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
        if (getSubCommand === "text2image") {
            if (getVersion === "4") {
                await uAPI.V1.AI.TextToImage.Generate({
                    model: getModel,
                    version: parseInt(getVersion),
                    prompt: getPrompt
    
                }).then(result => {
                    if (result.status) return client.sendEmbedImage(interaction, result.data.url);
                    if (!result.status) return client.editReply(interaction, `${result.message}, [Click Here](https://rentry.co/universe-text2img-models)`);
                });

            } else {
                await uAPI.V1.AI.TextToImage.Generate({
                    version: parseInt(getVersion),
                    prompt: getPrompt
    
                }).then(result => {
                    if (result.status) return client.sendEmbedImage(interaction, result.data.url);
                    if (!result.status) return client.editReply(interaction, result.message);
                });
            }
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
        if (getSubCommand === "llama") {
            await uAPI.V1.AI.Llama.Text({
                version: parseInt(getVersion),
                prompt: getPrompt

            }).then(result => {
                if (result.status) return client.sendEmbedText(interaction, result.data.text);
                if (!result.status) return client.editReply(interaction, result.message);
            });
        }
        if (getSubCommand === "chatglm") {
            await uAPI.V1.AI.ChatGLM.Text({
                version: parseInt(getVersion),
                prompt: getPrompt

            }).then(result => {
                if (result.status) return client.sendEmbedText(interaction, result.data.text);
                if (!result.status) return client.editReply(interaction, result.message);
            });
        }
        if (getSubCommand === "deepseek") {
            await uAPI.V1.AI.Deepseek.Text({
                version: parseInt(getVersion),
                prompt: getPrompt

            }).then(result => {
                if (result.status) return client.sendEmbedText(interaction, result.data.text);
                if (!result.status) return client.editReply(interaction, result.message);
            });
        }
        if (getSubCommand === "miaxtral") {
            await uAPI.V1.AI.Miaxtral.Text({
                version: parseInt(getVersion),
                prompt: getPrompt

            }).then(result => {
                if (result.status) return client.sendEmbedText(interaction, result.data.text);
                if (!result.status) return client.editReply(interaction, result.message);
            });
        }
        if (getSubCommand === "qwen") {
            await uAPI.V1.AI.Qwen.Text({
                version: parseInt(getVersion),
                prompt: getPrompt

            }).then(result => {
                if (result.status) return client.sendEmbedText(interaction, result.data.text);
                if (!result.status) return client.editReply(interaction, result.message);
            });
        }
    }
};