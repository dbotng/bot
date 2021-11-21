const client = require("../../clients/client.js");
const distube = require("../../clients/distube.js");

const { MessageEmbed } = require("discord.js");
const humanizedDuration = require("humanized-duration");

module.exports.volume = async function (interaction) {
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
          `To avoid bad actors, you must join the VC to set volume level. Join ${queue.voiceChannel.name} and try again.`
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
    } else {
      distube.distube.setVolume(
        guildId,
        interaction.options.getNumber("percent")
      );
      const embed = new MessageEmbed()
        .setColor("#fda238")
        .setTitle("Success")
        .setDescription(
          `Volume has set to ${interaction.options.getNumber("percent")}%`
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
