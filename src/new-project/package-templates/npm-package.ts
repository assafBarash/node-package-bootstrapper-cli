import { BootstrapPromptOption } from './types';
import deepmerge from 'deepmerge';
import nodeBase from './node-base';

const npmPackage: BootstrapPromptOption = deepmerge<BootstrapPromptOption>(
  nodeBase,
  {
    title: 'npm package',
    description: 'with publish scripts',
    value: {
      packageJson: {
        scripts: {
          postdeploy: 'npm version patch',
          postversion: 'npm publish',
        },
        params: {
          main: 'build/index.js',
          typings: 'build/index.js',
        },
      },
    },
  }
);

export default npmPackage;
