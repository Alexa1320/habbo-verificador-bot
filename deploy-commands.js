require("dotenv").config();

const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "panel",
    description: "Abre el panel de verificación de Habbo"
  }
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Registrando comando...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("✅ Comando /panel registrado correctamente");
  } catch (error) {
    console.error(error);
  }
})();
