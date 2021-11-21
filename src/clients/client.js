const { Client, Collection, Intents } = require("discord.js");

const fs = require("fs");

module.exports = {
  client: new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES],
  }),
  cooldown: new Map(),
  init(config) {
    module.exports.config = config;
    this.client.commands = new Collection();

    const commandFiles = fs
      .readdirSync(`${__dirname}/../commands/`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`${__dirname}/../commands/${file}`);
      this.client.commands.set(command.data.name, command);
    }

    const eventFiles = fs
      .readdirSync(`${__dirname}/../events/client`)
      .filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
      const event = require(`${__dirname}/../events/client/${file}`);
      if (event.once) {
        this.client.once(event.name, (...args) => event.execute(...args));
      } else {
        this.client.on(event.name, (...args) => event.execute(...args));
      }
    }
  },
};
