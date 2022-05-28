import embedBuilder from './embedBuilder'

export default class extends embedBuilder {
    create(error: string) {
        return super.create('Error', error)
    }
}
