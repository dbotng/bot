import { MikroORM } from '@mikro-orm/core'
import config from '@tankbot/mikro-orm.config.js';

const mikro = await MikroORM.init(config)
console.log(mikro.em)

export default mikro
