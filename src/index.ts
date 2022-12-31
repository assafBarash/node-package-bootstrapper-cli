#! /usr/bin/env node

import { main } from './main';

const [, , appName] = process.argv;

if (!appName) {
  throw Error('app name must be provided');
}

main(appName);
