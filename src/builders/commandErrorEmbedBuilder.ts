import embedBuilder from './embedBuilder'

export default class extends embedBuilder {
    create(error: string) {
        return super
            .create(
                ':(',
                'D-bot ran into a problem and needs to restart. Nah just joking! If issue still persists please screenshot the error message and open a Github issue.'
            )
            .addField('Error message', error)
    }
}
