const client = require("../../clients/client.js");
const distube = require("../../clients/distube.js");

const { MessageEmbed } = require("discord.js");
const humanizedDuration = require("humanized-duration");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

let formattedRadioStation = null;

module.exports.playing = async function (interaction) {
  const guildId = interaction.guildId;
  const queue = distube.distube.getQueue(guildId);
  const cooldown = client.cooldown;
  const memberId = interaction.member.id;
  const song = queue.songs[0];
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
      song.streamURL.includes("https://stream01.ungrounded.net/")
    ) {
      const status = await (
        await fetch("https://stream01.ungrounded.net/status-json-custom.xsl")
      ).json();
      switch (distube.radioStation.get(guildId)) {
        case "easylistening":
          formattedRadioStation = "Easy Listening";
          break;
        case "electronic":
          formattedRadioStation = "Electonic";
          break;
        case "heavymetal":
          formattedRadioStation = "Heavy Metal";
          break;
        case "hiphop":
          formattedRadioStation = "Hip Hop";
          break;
        case "ngmix":
          formattedRadioStation = "NG Mix";
          break;
        case "podcasts":
          formattedRadioStation = "Podcasts";
          break;
        case "rock":
          formattedRadioStation = "Rock";
          break;
      }
      const url = status.mounts[`/${distube.radioStation.get(guildId)}`].title
        .match(/\((https:\/\/).+\)/g)[0]
        .slice(1, -1);
      const title = status.mounts[`/${distube.radioStation.get(guildId)}`].title
        .match(/- .+ /g)[0]
        .slice(2, -1);
      const author = status.mounts[
        `/${distube.radioStation.get(guildId)}`
      ].title
        .match(/.+ -/g)[0]
        .slice(0, -2);
      const thumbnail = `https://aicon.ngfiles.com/${url
        .match(/[0-9]+/g)[0]
        .slice(0, -3)}/${url.match(/[0-9]+/g)[0]}.png`;
      const embed = new MessageEmbed()
        .setColor("#fda238")
        .setAuthor(`Now playing, by ${author} (${formattedRadioStation})`)
        .setTitle(title)
        .setURL(url)
        .setThumbnail(thumbnail)
        .setDescription("Play duration not avaliable")
        .setFooter("Newgrounds, everything by everyone");
      await interaction.reply({ embeds: [embed] });
    } else {
      const embed = new MessageEmbed()
        .setColor("#fda238")
        .setAuthor(`Now playing, by ${song.author}`)
        .setTitle(song.name)
        .setURL(song.url)
        .setThumbnail(song.thumbnail)
        .setDescription(
          `${queue.formattedCurrentTime}/${song.formattedDuration}`
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
