const client = require("../../clients/client.js");
const distube = require("../../clients/distube.js");

const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");
const humanizedDuration = require("humanized-duration");

module.exports.radio = async function (interaction) {
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
        .setTitle("No VC to play")
        .setDescription(
          "How am I supposed to play if you don't join a VC? Try again!"
        );
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
      const embed = new MessageEmbed()
        .setColor("#fda238")
        .setTitle("Newgrounds Radio Station Selection")
        .setDescription(
          "Since you don't have a station provided, please select a station to listen from here!"
        );
      const embedRow = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("distube.radioStation")
          .setPlaceholder("Radio Station")
          .addOptions([
            {
              label: "Easy Listening",
              value: "easylistening",
            },
            {
              label: "Electronic",
              value: "electronic",
            },
            {
              label: "Heavy Metal",
              value: "heavymetal",
            },
            {
              label: "Hip Hop",
              value: "hiphop",
            },
            {
              label: "NG Mix",
              value: "ngmix",
            },
            {
              label: "Podcasts",
              value: "podcasts",
            },
            {
              label: "Rock",
              value: "rock",
            },
          ])
      );

      const reply = await interaction.reply({
        embeds: [embed],
        components: [embedRow],
        fetchReply: true,
      });

      const filter = (menu) => {
        menu.deferUpdate();
        return menu.user.id === memberId;
      };

      reply
        .awaitMessageComponent({
          filter,
          componentType: "SELECT_MENU",
          time: 10000,
        })
        .then(async (interaction) => {
          if (queue) {
            distube.distube.stop(guildId);
          }
          distube.distube.playVoiceChannel(
            userVoiceChannel,
            `https://stream01.ungrounded.net/${interaction.values[0]}`,
            { member: interaction.member }
          );
          distube.radioStation.set(guildId, interaction.values[0]);
          distube.playInteraction.set(`${guildId}_${memberId}`, interaction);
        })
        .catch(async () => {
          const embed = new MessageEmbed()
            .setColor("#fda238")
            .setTitle("Selection timed out")
            .setDescription(
              "Since you didn't select anything in the past 10 seconds, you have to invoke the command again."
            );
          await interaction.followUp({ embeds: [embed] });
        });
    }
    cooldown.set(`${guildId}_${memberId}`, Date.now() + 5000);
    setTimeout(() => {
      cooldown.delete(`${guildId}_${memberId}`);
    }, 5000);
  }
};
