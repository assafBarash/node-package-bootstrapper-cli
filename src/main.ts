import prompts from 'prompts';

export const main = () =>
  prompts({
    type: 'select',
    name: 'value',
    message: 'select it',
    choices: [
      {
        title: 'hello',
        description: 'world',
        value: 'hello world',
      },

      {
        title: 'hello2',
        description: 'world2',
        value: 'hello2 world2',
      },
    ],
    initial: 1,
  });
