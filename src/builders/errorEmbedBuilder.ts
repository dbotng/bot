import embedBuilder from './embedBuilder'

export default class extends embedBuilder {
    error: string

    constructor(error: string) {
        super(
            ':(',
            'D-bot ran into a problem and needs to restart. Nah just joking! If issue still persists please screenshot the error message and open a Github issue.'
        )
        this.error = error
    }

    create() {
        return super.create().addField('Error message', this.error)
    }
}
