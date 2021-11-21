const client = require("../../clients/client.js");
const distube = require("../../clients/distube.js");

const { MessageEmbed } = require("discord.js");
const humanizedDuration = require("humanized-duration");

module.exports.queue = async function (interaction) {
  const guildId = interaction.guildId;
  const queue = distube.distube.getQueue(guildId);
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
    if (!queue) {
      const embed = new MessageEmbed()
        .setColor("#fda238")
        .setTitle("No queue")
        .setDescription("Why are you using this if nothing is playing?");
      await interaction.reply({ embeds: [embed] });
    } else if (
      queue &&
      queue.songs[0].streamURL.includes("https://stream01.ungrounded.net/")
    ) {
      const embed = new MessageEmbed()
        .setColor("#fda238")
        .setTitle("Only avaliable on audio mode")
        .setDescription("Checking queue for Newgrounds Radio is not possible.");
      await interaction.reply({ embeds: [embed] });
    } else {
      let musicList = "";
      for (let i = 0; i < 6; i++) {
        if (queue.songs[i]) {
          musicList += `• ${queue.songs[i].name} by ${queue.songs[i].uploader.name}, requested by ${queue.songs[i].user.tag}\n`;
        }
      }
      const embed = new MessageEmbed()
        .setColor("#fda238")
        .setTitle("Next 5 audio (Author might not be correct)")
        .setDescription(musicList)
        .setFooter("Newgrounds, everything by everyone");
      await interaction.reply({ embeds: [embed] });
    }
    cooldown.set(`${guildId}_${memberId}`, Date.now() + 5000);
    setTimeout(() => {
      cooldown.delete(`${guildId}_${memberId}`);
    }, 5000);
  }
};
