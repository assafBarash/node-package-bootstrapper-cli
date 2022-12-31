import prompts from 'prompts';
import { main } from '../src/main';

const run = async (input: string[] = []) => {
  prompts.inject(input);
  return await main();
};

describe('cli tool', () => {
  it('should say hello world', async () => {
    const input = ['hello world'];

    const { value } = await run(input);

    expect(value).toBe(`hello world`);
  });
});
