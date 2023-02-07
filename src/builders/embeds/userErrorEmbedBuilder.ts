import embedBuilder from '@tankbot/builders/embeds/embedBuilder.js'

export default class extends embedBuilder {
    create(error: string) {
        return super.create('Error', error)
    }
}
