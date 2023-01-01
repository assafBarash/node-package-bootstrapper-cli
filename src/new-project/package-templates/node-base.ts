import { BootstrapPromptOption } from './types';
import path from 'path';

const nodeBase: BootstrapPromptOption = {
  title: 'node-base',
  description: 'with ts & jest',
  value: {
    packageJson: {
      devDependencies: ['typescript', 'jest', 'rimraf', 'copyfiles'],
      scripts: {
        test: 'npx jest --runInBand',
        prebuild: 'npx rimraf build',
        build: 'tsc && npm run copy-assets',
        pretest: 'npm run build',
        prestart: 'npm run build',
        start: 'node build/index.js',
        predeploy: 'npm run test',
        deploy: 'npx dgc -ea',
        'copy-assets':
          'copyfiles --all --up 1 --exclude "./**/*.{ts,tsx}" "./src/**/*" ./build',
      },
    },
    postScripts: [
      'npx tsc --init --declaration --target es5 --module commonjs --allowJs --outDir build --rootDir src --strict --noImplicitAny --esModuleInterop --resolveJsonModule --checkJs false --lib es6',
      'npx ts-jest config:init',
    ],
    files: {
      [path.join('src', 'index.ts')]: '',
    },
  },
};

export default nodeBase;
