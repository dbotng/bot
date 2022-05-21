import embedBuilder from './embedBuilder'

export default class extends embedBuilder {
    create(message: string) {
        return super.create('Success', message)
    }
}
