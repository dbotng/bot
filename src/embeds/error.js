const { MessageEmbed } = require("discord.js");

module.exports = async function error(err, interaction) {
  const errorEmbed = new MessageEmbed()
    .setColor("#fda238")
    .setTitle("You caught an ultra rare error!")
    .setDescription(""`${err}```)
    .setFooter("Please report to Featyre#0843 or on Github");
  await interaction.reply({ embeds: [errorEmbed] });
};
