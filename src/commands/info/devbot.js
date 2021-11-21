const { MessageEmbed } = require("discord.js");

module.exports.devbot = async function (interaction) {
  const embed = new MessageEmbed()
    .setColor("#fda238")
    .setTitle("Development testing")
    .setDescription(
      "Do you like testing for new features? If so click on the [link](https://discord.gg/VNmh8j4cpZ) to try out new stuff!"
    )
    .setFooter("Newgrounds, everything by everyone");
  await interaction.reply({ embeds: [embed] });
};
