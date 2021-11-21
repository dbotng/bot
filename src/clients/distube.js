const DisTube = require("distube");
const fs = require("fs");

module.exports = {
  playInteraction: new Map(),
  radioStation: new Map(),
  init(client) {
    module.exports.distube = new DisTube.default(client);
    const eventFiles = fs
      .readdirSync(`${__dirname}/../events/distube`)
      .filter((file) => file.endsWith(".js"));
    for (const file of eventFiles) {
      const event = require(`${__dirname}/../events/distube/${file}`);
      if (event.once) {
        this.distube.once(event.name, (...args) => event.execute(...args));
      } else {
        this.distube.on(event.name, (...args) => event.execute(...args));
      }
    }
  },
};
