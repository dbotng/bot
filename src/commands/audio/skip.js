const client = require("../../clients/client.js");
const distube = require("../../clients/distube.js");

const { MessageEmbed } = require("discord.js");
const humanizedDuration = require("humanized-duration");

module.exports.skip = async function (interaction) {
  const guildId = interaction.guildId;
  const queue = distube.distube.getQueue(guildId);
  const userVoiceChannel = interaction.member.voice.channel;
  const cooldown = client.cooldown;
  const memberId = interaction.member.id;
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
        .setTitle("Warning")
        .setDescription(
          `To avoid bad actors, you must join the VC to stop. Join ${queue.voiceChannel.name} and try again.`
        );
      await interaction.reply({ embeds: [embed] });
    } else if (!queue) {
      const embed = new MessageEmbed()
        .setColor("#fda238")
        .setTitle("No queue")
        .setDescription("Why are you using this if nothing is playing?");
      await interaction.reply({ embeds: [embed] });
    } else if (queue && userVoiceChannel != queue.voiceChannel) {
      const embed = new MessageEmbed()
        .setColor("#fda238")
        .setTitle("Wrong VC")
        .setDescription(
          `Why are you doing in ${userVoiceChannel.name}? Join the ${queue.voiceChannel.name} and try again!`
        );
      await interaction.reply({ embeds: [embed] });
    } else if (
      queue &&
      queue.songs[0].streamURL.includes("https://stream01.ungrounded.net/")
    ) {
      const embed = new MessageEmbed()
        .setColor("#fda238")
        .setTitle("Radio mode enabled")
        .setDescription(
          "You cannot skip a radio right? Switch to audio mode and try again!"
        );
      await interaction.reply({ embeds: [embed] });
    } else if (!queue.songs[1]) {
      const embed = new MessageEmbed()
        .setColor("#fda238")
        .setTitle("No music next")
        .setDescription("You should use /audio stop or /audio leave instead.");
      await interaction.reply({ embeds: [embed] });
    } else {
      distube.distube.skip(guildId);
      const embed = new MessageEmbed()
        .setColor("#fda238")
        .setTitle("Success")
        .setDescription(
          `Skipped to ${queue.songs[0].name}by ${queue.songs[0].uploader.name}, requested by ${queue.songs[0].user.tag}`
        )
        .setFooter("Newgrounds, everything by everyone");
      await interaction.reply({ embeds: [embed] });
    }
    cooldown.set(`${guildId}_${memberId}`, Date.now() + 5000);
    setTimeout(() => {
      cooldown.delete(`${guildId}_${memberId}`);
    }, 5000);
  }
};
