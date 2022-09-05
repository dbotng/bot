import embedBuilder from '@d-bot/builders/embeds/embedBuilder.js'

export default class extends embedBuilder {
    create(error: string) {
        return super.create('Error', error)
    }
}
