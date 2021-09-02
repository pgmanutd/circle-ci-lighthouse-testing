const puppeteer = require('puppeteer');

const port = process.env.LIGHTHOUSE_CI_PORT;

module.exports = {
  ci: {
    collect: {
      chromePath: puppeteer.executablePath(),
      settings: {
        chromeFlags: [
          '--headless',
          'CI' in process.env && '--no-sandbox –-disable-setuid-sandbox',
        ].filter(Boolean),
      },
      numberOfRuns: 1,
      startServerCommand: 'yarn start',
      startServerReadyPattern: 'ready - started server',
      startServerReadyTimeout: 10000,
      url: [`http://localhost:${port}`],
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
      },
    },
  },
};
