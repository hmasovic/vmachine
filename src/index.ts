/* tslint:disable:ordered-imports */

import moduleAlias from 'module-alias';

/**
 * Module aliases for js files, `paths` inside `tsconfig.json` for ts files,
 * `moduleNameMapper` inside `jest.config.js` for tests/jest.
 */
moduleAlias.addAliases({
  '@lib': `${__dirname}/lib`,
  '@logs': `${__dirname}/logs`,
  '@config': `${__dirname}/config`,
  '@schemes': `${__dirname}/schemes`,
  '@services': `${__dirname}/services`,
  '@handlers': `${__dirname}/handlers`,
  '@repositories': `${__dirname}/repositories`,
});

import { logger } from '@logs/index';
import app, { onInit } from './app';

import { PORT } from '@config/index';

app.listen(PORT, async (): Promise<void> => {
  try {
    await onInit();
    logger.info(`Service up && running on ${PORT}!`);
  } catch (e) {
    logger.error(`[src/index] - ${e}`);
    process.exit(0);
  }
});
