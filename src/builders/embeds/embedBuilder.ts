import { EmbedBuilder } from 'discord.js'

export default class {
    create(title: string, desc: string) {
        return new EmbedBuilder()
            .setColor('#fda238')
            .setTitle(title)
            .setDescription(desc)
            .setFooter({ text: 'Newgrounds, everything by everyone' })
    }
}
