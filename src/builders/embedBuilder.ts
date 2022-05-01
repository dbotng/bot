import { MessageEmbed } from 'discord.js'

export default class {
    title: string
    desc: string

    constructor(title: string, desc: string) {
        ;(this.title = title), (this.desc = desc)
    }

    create() {
        return new MessageEmbed()
            .setColor('#fda238')
            .setTitle(this.title)
            .setDescription(this.desc)
            .setFooter({ text: 'Newgrounds, everything by everyone' })
    }
}
