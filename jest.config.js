const stripesConfig = require('@folio/jest-config-stripes');
const acqConfig = require('@folio/stripes-acq-components/jest.config');

module.exports = {
  ...stripesConfig,
  setupFiles: [
    ...stripesConfig.setupFiles,
    ...acqConfig.setupFiles,
  ],
  testMatch: ['**/findInterfaces/**/?(*.)test.{js,jsx}'],
  collectCoverageFrom: [
    '**/findInterfaces/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/test/**',
  ],
};
