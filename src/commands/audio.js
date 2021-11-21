const { SlashCommandBuilder } = require("@discordjs/builders");

const commandFiles = `${__dirname}/audio`;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("audio")
    .setDescription("Play audio from Newgrounds and Newgrounds audio")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("play")
        .setDescription("Play audio from Newgrounds")
        .addStringOption((option) =>
          option.setName("link").setDescription("Newgrounds audio link")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("radio").setDescription("Play from Newgrounds radio")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("pause").setDescription("Pause the audio")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("skip")
        .setDescription("Skip to the next song in the queue")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("stop")
        .setDescription("Stop the audio and deletes the queue")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("leave")
        .setDescription(
          "Stop the audio, deletes the queue and leave the channel"
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("volume")
        .setDescription("Set volume")
        .addNumberOption((option) =>
          option
            .setName("percent")
            .setDescription("The volume percentage")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("repeat")
        .setDescription("Set repeat mode")
        .addStringOption((option) =>
          option.setName("mode").setDescription("Mode to repeat")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("playing").setDescription("See what's playing")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("queue").setDescription("See what's next on the queue")
    ),
  async execute(interaction) {
    switch (interaction.options.getSubcommand()) {
      case "play": {
        const play = require(`${commandFiles}/play.js`);
        await play.play(interaction);
        break;
      }
      case "radio": {
        const radio = require(`${commandFiles}/radio.js`);
        await radio.radio(interaction);
        break;
      }
      case "pause": {
        const pause = require(`${commandFiles}/pause.js`);
        await pause.pause(interaction);
        break;
      }
      case "skip": {
        const skip = require(`${commandFiles}/skip.js`);
        await skip.skip(interaction);
        break;
      }
      case "stop": {
        const stop = require(`${commandFiles}/stop.js`);
        await stop.stop(interaction);
        break;
      }
      case "leave": {
        const leave = require(`${commandFiles}/leave.js`);
        await leave.leave(interaction);
        break;
      }
      case "volume": {
        const volume = require(`${commandFiles}/volume.js`);
        await volume.volume(interaction);
        break;
      }
      case "repeat": {
        const repeat = require(`${commandFiles}/repeat.js`);
        await repeat.repeat(interaction);
        break;
      }
      case "playing": {
        const playing = require(`${commandFiles}/playing.js`);
        await playing.playing(interaction);
        break;
      }
      case "queue": {
        const queue = require(`${commandFiles}/queue.js`);
        await queue.queue(interaction);
        break;
      }
    }
  },
};
