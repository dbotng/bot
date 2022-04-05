"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const builders_1 = require("@discordjs/builders");
const typescript_1 = __importDefault(require("./info/typescript"));
exports.data = new builders_1.SlashCommandBuilder()
    .setName('info')
    .setDescription('Information')
    .addSubcommand((command) => command.setName('typescript').setDescription('Welcome to typescript!'));
async function execute(interaction) {
    switch (interaction.options.getSubcommand()) {
        case 'typescript': {
            await (0, typescript_1.default)(interaction);
        }
    }
}
exports.execute = execute;
