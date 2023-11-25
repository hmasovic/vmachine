import { IS_PROD } from '@config/index';
import winston from 'winston';

import { SEVERITY_COLORS, SEVERITY_LEVELS } from './constants';

const TRANSPORTS = [new winston.transports.Console()];

const LOG_FORMAT = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info: winston.Logform.TransformableInfo) => `${info.timestamp} ${info.level}: ${info.message}`)
);

winston.addColors(SEVERITY_COLORS);

const Logger = winston.createLogger({
  level: IS_PROD ? 'warn' : 'debug',
  levels: SEVERITY_LEVELS,
  format: LOG_FORMAT,
  transports: TRANSPORTS,
});

export default Logger;
