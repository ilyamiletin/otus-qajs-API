import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 500_000,
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  reporters: [
    'default',
    [
        'jest-html-reporters',
        {
            publicPath: './html-report',
            filename: 'index.html',
            openReport: true,
        },
    ],
],
};

export default config;
