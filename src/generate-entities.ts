import { MikroORM } from '@mikro-orm/core';
import config from '@tankbot/mikro-orm.config.js';
import { fileURLToPath } from 'node:url'
import path from 'node:path'

(async () => {
  const orm = await MikroORM.init(config);
  const generator = orm.getEntityGenerator();
  const dump = await generator.generate({ 
    save: true,
    baseDir: path.dirname(fileURLToPath(new URL('../', import.meta.url))) + '/src/types/database/',
  });
  console.log(dump);
  await orm.close(true);
})();