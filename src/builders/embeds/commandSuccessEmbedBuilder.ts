import embedBuilder from '@tankbot/builders/embeds/embedBuilder.js'

export default class extends embedBuilder {
    create(message: string) {
        return super.create('Success', message)
    }
}
