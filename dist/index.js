"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
require("dotenv/config");
const fs_1 = __importDefault(require("fs"));
const client = new discord_js_1.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_VOICE_STATES],
});
client.once('ready', () => {
    console.log('[discord.js client] Success');
});
client.commands = new discord_js_1.Collection();
const commandFiles = fs_1.default
    .readdirSync(`${__dirname}/commands`)
    .filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`${__dirname}/commands/${file}`);
    client.commands.set(command.data.name, command);
}
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand())
        return;
    const command = client.commands.get(interaction.commandName);
    if (!command)
        return;
    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true,
        });
    }
});
client.login(process.env.token);
