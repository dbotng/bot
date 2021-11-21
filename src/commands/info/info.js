const { MessageEmbed } = require("discord.js");
const humanizedDuration = require("humanized-duration");

module.exports.info = async function (interaction) {
  const embed = new MessageEmbed()
    .setColor("#fda238")
    .setTitle("Information")
    .setDescription(
      "Here are the basic information about D-bot, and other related stuff."
    )
    .addField(
      "Bot Stats",
      `Joined in ${
        interaction.client.guilds.cache.size
      } servers, used by ${interaction.client.guilds.cache
        .map((guild) => guild.memberCount)
        .reduce(
          (acc, guild) => acc + guild
        )} users and probably growing.\n Bot is up for ${humanizedDuration(
        interaction.client.uptime
      )}. \n Running Public Alpha 1.0.4`
    )
    .addField(
      "Creator info and links",
      "Created by Featyre#0843\n [Github repo](https://github.com/Featyre/D-Bot)"
    )
    .setFooter("Newgrounds, everything by everyone");
  await interaction.reply({ embeds: [embed] });
};
