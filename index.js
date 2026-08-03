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

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once(Events.ClientReady, () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
});

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

  if (interaction.isButton()) {

    if (interaction.customId === "verificar") {

      const modal = new ModalBuilder()
        .setCustomId("modal_verificacion")
        .setTitle("Verificación Habbo");

      const nombreHabbo = new TextInputBuilder()
        .setCustomId("nombre_habbo")
        .setLabel("Tu nombre en Habbo")
        .setPlaceholder("Ejemplo: NombreHabbo")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const fila = new ActionRowBuilder()
        .addComponents(nombreHabbo);

      modal.addComponents(fila);

      await interaction.showModal(modal);

    }

  }

  if (interaction.isModalSubmit()) {

    if (interaction.customId === "modal_verificacion") {

      const nombre = interaction.fields.getTextInputValue("nombre_habbo");

      await interaction.reply({
        content: `✅ Recibido. Tu nombre de Habbo es: **${nombre}**`,
        ephemeral: true
      });

    }

  }

});

client.login(process.env.DISCORD_TOKEN);
