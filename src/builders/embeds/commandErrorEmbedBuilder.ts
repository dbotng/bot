import embedBuilder from '@tankbot/builders/embeds/embedBuilder.js'

export default class extends embedBuilder {
    create(error: string) {
        return super
            .create(
                ':(',
                'TankBot ran into a problem and needs to restart. Nah just joking! If issue still persists please screenshot the error message and open a Github issue.'
            )
            .addFields({ name: 'Error message', value: error })
    }
}
