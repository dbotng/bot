const { SlashCommandBuilder } = require("@discordjs/builders");

const commandFiles = `${__dirname}/info`;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("The information category")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("info")
        .setDescription(
          "Information about this bot, uptime, user and server status, and more"
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("invite").setDescription("How to invite this bot")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("devbot")
        .setDescription(
          "Excited about the bot? Learn more to try out latest revision of the bot"
        )
    ),
  async execute(interaction) {
    switch (interaction.options.getSubcommand()) {
      case "info": {
        const info = require(`${commandFiles}/info.js`);
        await info.info(interaction);
        break;
      }
      case "invite": {
        const invite = require(`${commandFiles}/invite.js`);
        await invite.invite(interaction);
        break;
      }
      case "devbot": {
        const devbot = require(`${commandFiles}/devbot.js`);
        await devbot.devbot(interaction);
        break;
      }
    }
  },
};
