const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const fs = require("fs");
const YAML = require("yaml");

const config = YAML.parse(
  fs.readFileSync(`${__dirname}/../config.yaml`).toString()
);

const commands = [];
const commandFiles = fs
  .readdirSync(`${__dirname}/commands/`)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`${__dirname}/commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(config.token);

if (config.environment == "development") {
  (async () => {
    try {
      await rest.put(
        Routes.applicationGuildCommands(config.clientId, config.guildId),
        {
          body: commands,
        }
      );
      console.log("[Bot] Commands registered.");
    } catch (error) {
      console.error(error);
    }
  })();
} else {
  (async () => {
    try {
      await rest.put(Routes.applicationCommands(config.clientId), {
        body: commands,
      });
      console.log("[Bot] Commands registered.");
    } catch (error) {
      console.error(error);
    }
  })();
}
