const { MessageEmbed } = require("discord.js");

const distube = require(`${__dirname}/../../clients/distube.js`);

let title = null;

module.exports = {
  name: "addSong",
  execute(_, song) {
    const interaction = distube.playInteraction.get(
      `${song.member.guild.id}_${song.member.id}`
    );
    if (!interaction.isSelectMenu()) {
      const embed = new MessageEmbed()
        .setColor("#fda238")
        .setTitle(song.name)
        .setURL(song.url)
        .setAuthor(`${song.uploader.name} (Author might not be correct)`)
        .setDescription("has been added to queue")
        .setFooter("Newgrounds, everything by everyone");
      interaction.editReply({ embeds: [embed] });
    } else {
      switch (distube.radioStation.get(song.member.guild.id)) {
        case "easylistening":
          title = "Easy Listening Radio Station";
          break;
        case "electronic":
          title = "Electonic Radio Station";
          break;
        case "heavymetal":
          title = "Heavy Metal Radio Station";
          break;
        case "hiphop":
          title = "Hip Hop Radio Station";
          break;
        case "ngmix":
          title = "NG Mix Radio Station";
          break;
        case "podcasts":
          title = "Podcasts Radio Station";
          break;
        case "rock":
          title = "Rock Radio Station";
          break;
      }
      const embed = new MessageEmbed()
        .setColor("#fda238")
        .setTitle(title)
        .setDescription("is selected")
        .setFooter("Newgrounds, everything by everyone");
      interaction.followUp({ embeds: [embed] });
    }
    distube.playInteraction.delete(`${song.member.guild.id}_${song.member.id}`);
  },
};
