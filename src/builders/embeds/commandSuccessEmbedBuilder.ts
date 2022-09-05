import embedBuilder from '@d-bot/builders/embeds/embedBuilder.js'

export default class extends embedBuilder {
    create(message: string) {
        return super.create('Success', message)
    }
}
