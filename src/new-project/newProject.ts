import prompts from 'prompts';
import { Bootstrapper, BootstrapOptions } from 'package-bootstrapper';
import * as options from './package-templates';

export const newProject = async (appName: string) => {
  const bootstrapper = Bootstrapper(appName);

  const choices = Object.values(options).map((module) => module.default);

  const { bootstrapOptions } = (await prompts({
    type: 'select',
    name: 'bootstrapOptions',
    message: 'select package template',
    choices,
  })) as { bootstrapOptions: BootstrapOptions };

  await bootstrapper.bootstrap(bootstrapOptions);
};
