import prompts from 'prompts';
import { newProject } from '../src/new-project/newProject';
import fs from 'fs';
import * as packageTemplates from '../src/new-project/package-templates';
import path from 'path';

jest.retryTimes(1);

const choices = Object.values(packageTemplates).map((module) => module.default);

describe('cli tool', () => {
  const appName = 'test-app';

  const getTestAppDir = () => path.join(process.cwd(), appName);

  afterEach(() => {
    fs.rmSync(appName, { recursive: true, force: true });
  });

  const run = async (
    input: any[] = []
  ): Promise<ReturnType<typeof newProject>> => {
    prompts.inject(input);
    return await newProject(appName);
  };

  it.each(choices)(
    'should build template',
    async ({ value }) => {
      const input = [value];

      await run(input);
      const packageJson = JSON.parse(
        (
          await fs.promises.readFile(path.join(getTestAppDir(), 'package.json'))
        ).toString()
      );

      ['devDependencies', 'dependencies'].forEach((dependenciesKey) =>
        expect(Object.keys(packageJson[dependenciesKey] || {})).toEqual(
          expect.arrayContaining(
            (value.packageJson as any)?.[dependenciesKey] || []
          )
        )
      );

      expect(packageJson.scripts).toEqual(
        expect.objectContaining(value.packageJson?.scripts)
      );

      Object.entries(value.files || {}).forEach(
        async ([fileDir, fileContent]) =>
          expect(
            (
              await fs.promises.readFile(path.join(getTestAppDir(), fileDir))
            ).toString()
          ).toEqual(fileContent)
      );
    },
    15000
  );
});
