const commonCofig = require('@folio/stripes-acq-components/jest.config');

module.exports = {
  ...commonCofig,
  testMatch: ['**/findInterfaces/**/?(*.)test.{js,jsx}'],
  collectCoverageFrom: [
    '**/findInterfaces/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/test/**',
  ],
};
