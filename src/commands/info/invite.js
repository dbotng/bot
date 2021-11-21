const { MessageEmbed } = require("discord.js");

module.exports.invite = async function (interaction) {
  const embed = new MessageEmbed()
    .setColor("#fda238")
    .setTitle("Invite")
    .setDescription("Here's how you invite the bot easily/")
    .addField(
      "Link for sharing to others",
      "https://discord.com/api/oauth2/authorize?client_id=909375750753361980&permissions=8&scope=bot%20applications.commands"
    )
    .setImage("attachment://invite.gif")
    .setFooter("Newgrounds, everything by everyone");
  await interaction.reply({
    embeds: [embed],
    files: [`${__dirname}/../../assets/invite.gif`],
  });
};
