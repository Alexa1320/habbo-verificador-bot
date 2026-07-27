
require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  Events,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} = require("discord.js");

const axios = require("axios");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once(Events.ClientReady, () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);

client.on(Events.InteractionCreate, async (interaction) => {

    if (interaction.isChatInputCommand()) {

        if (interaction.commandName === "panel") {

            const boton = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("verificar")
                    .setLabel("✅ Verificarme")
                    .setStyle(ButtonStyle.Success)
            );

            await interaction.reply({
                content: "Pulsa el botón para comenzar tu verificación de Habbo.",
                components: [boton]
            });

        }

    }

});
