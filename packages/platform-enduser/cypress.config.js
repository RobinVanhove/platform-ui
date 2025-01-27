/**
 * Copyright (c) 2023 ForgeRock. All rights reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  chromeWebSecurity: false,
  retries: 3,
  reporter: '../../node_modules/mochawesome',
  reporterOptions: {
    overwrite: false,
    html: false,
    json: true,
  },
  env: {
    lighthousePassThreshold: {
      performance: 0.75,
      accessibility: 0.75,
      'best-practices': 0.75,
    },
  },
  fixturesFolder: 'e2e/fixtures',
  screenshotsFolder: 'e2e/screenshots',
  videosFolder: 'e2e/videos',
  e2e: {
    setupNodeEvents(on, config) {
      return require('./e2e/plugins/index.js')(on, config); // eslint-disable-line global-require
    },
    excludeSpecPattern: ['lighthouse.suite.cy.js'],
    specPattern: 'e2e/tests/**/*.js',
    supportFile: 'e2e/support/index.js',
  },
});
