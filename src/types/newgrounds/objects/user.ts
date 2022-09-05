/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import userIcons from './userIcons'

export default interface ngUser {
    icons: userIcons
    id: bigint
    name: string
    supporter: true
}
