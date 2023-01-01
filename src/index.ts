#! /usr/bin/env node

import { newProject } from './new-project/newProject';

const [, , appName] = process.argv;

if (!appName) {
  throw Error('app name must be provided');
}

newProject(appName);
