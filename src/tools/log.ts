import { createLogger } from 'bunyan';
import chalk from 'chalk';

const log = console.log;

const streamLog = createLogger({ name: 'Stream Log' });

const blue = (...str: any[]) => {
  log(chalk.blue(...str));
};
const red = (...str: any[]) => {
  log(chalk.red(...str));
};
const green = (...str: any[]) => {
  log(chalk.green(...str));
};

const blueBright = (...str: any[]) => {
  log(chalk.blueBright(...str));
};
const cyan = (...str: any[]) => {
  log(chalk.cyan(...str));
};

export default {
  info: streamLog.info.bind(streamLog),
  err: streamLog.error.bind(streamLog),
  warn: streamLog.warn.bind(streamLog),
  blue,
  red,
  green,
  cyan,
  blueBright,
};
