"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@discordjs/rest");
const v10_1 = require("discord-api-types/v10");
require("dotenv/config");
const fs_1 = __importDefault(require("fs"));
const commands = [];
const commandFiles = fs_1.default
    .readdirSync(`${__dirname}/commands`)
    .filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`${__dirname}/commands/${file}`);
    commands.push(command.data.toJSON());
}
const rest = new rest_1.REST({ version: '10' }).setToken(process.env.token);
rest.put(v10_1.Routes.applicationGuildCommands(process.env.clientId, process.env.guildId), { body: [] })
    .then(() => console.log('[deploy.ts] Successfully cleared commands'))
    .catch(console.error);
rest.put(v10_1.Routes.applicationGuildCommands(process.env.clientId, process.env.guildId), { body: commands })
    .then(() => console.log('[deploy.ts] Successfully deployed commands'))
    .catch(console.error);
