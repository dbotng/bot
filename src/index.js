const client = require(`${__dirname}/clients/client.js`);
const distube = require(`${__dirname}/clients/distube.js`);

const fs = require("fs");
const YAML = require("yaml");

const config = YAML.parse(
  fs.readFileSync(`${__dirname}/../config.yaml`).toString()
);

client.init(config);
distube.init(client.client);

client.client.login(config.token);
