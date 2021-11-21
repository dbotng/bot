const client = require("../../clients/client.js");
const distube = require("../../clients/distube.js");

const { MessageEmbed } = require("discord.js");
const humanizedDuration = require("humanized-duration");

module.exports.play = async function (interaction) {
  const guildId = interaction.guildId;
  const queue = distube.distube.getQueue(guildId);
  const userVoiceChannel = interaction.member.voice.channel;
  const cooldown = client.cooldown;
  const memberId = interaction.member.id;
  const link = interaction.options.getString("link");
  if (cooldown.has(`${guildId}_${memberId}`)) {
    const embed = new MessageEmbed()
      .setColor("#fda238")
      .setTitle("Cooldown")
      .setDescription(
        `Please wait for ${humanizedDuration(
          cooldown.get(`${guildId}_${memberId}`) - Date.now()
        )}.`
      );
    await interaction.reply({ embeds: [embed] });
  } else {
    if (!userVoiceChannel) {
      const embed = new MessageEmbed()
        .setColor("#fda238")
        .setTitle("No VC to play")
        .setDescription(
          "How am I supposed to play if you don't join a VC? Try again!"
        );
      await interaction.reply({ embeds: [embed] });
    } else if (queue && queue.paused) {
      distube.distube.resume(guildId);
      const embed = new MessageEmbed()
        .setColor("#fda238")
        .setTitle("Success")
        .setDescription("Audio is unpaused.")
        .setFooter("Newgrounds, everything by everyone");
      await interaction.reply({ embeds: [embed] });
    } else if (queue && userVoiceChannel != queue.voiceChannel) {
      const embed = new MessageEmbed()
        .setColor("#fda238")
        .setTitle("Wrong VC")
        .setDescription(
          `Why are you doing in ${userVoiceChannel.name}? Join the ${queue.voiceChannel.name} and try again!`
        );
      await interaction.reply({ embeds: [embed] });
    } else if (!link) {
      const embed = new MessageEmbed()
        .setColor("#fda238")
        .setTitle("No link")
        .setDescription(
          "If there is no link how do you play music? Try again."
        );
      await interaction.reply({ embeds: [embed] });
    } else if (
      !link.includes("newgrounds.com") &&
      memberId != client.config.ownerId
    ) {
      const embed = new MessageEmbed()
        .setColor("#fda238")
        .setTitle("Invalid link")
        .setDescription("Your link is not from Newgrounds, please try again.");
      await interaction.reply({ embeds: [embed] });
    } else {
      if (
        queue &&
        queue.songs[0].streamURL.includes("https://stream01.ungrounded.net/")
      ) {
        distube.distube.stop(guildId);
        distube.radioStation.delete(guildId);
      }
      distube.distube.playVoiceChannel(userVoiceChannel, link, {
        member: interaction.member,
      });
      distube.playInteraction.set(`${guildId}_${memberId}`, interaction);
      await interaction.deferReply();
    }
    cooldown.set(`${guildId}_${memberId}`, Date.now() + 5000);
    setTimeout(() => {
      cooldown.delete(`${guildId}_${memberId}`);
    }, 5000);
  }
};
