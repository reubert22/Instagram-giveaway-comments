const puppeteer = require('puppeteer');

(async () => {
  const targetPageUrl = 'https://www.instagram.com/';
  const targetsAccount = [];
  const giveawaysTarget = [];

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(targetPageUrl);
  
  await page.waitFor('input[name=username]');
  await page.type('input[name=username]', process.env.MY_USERNAME, { delay: 300 });
  await page.type('input[name=password]', process.env.MY_PASS, { delay: 500 });
  await page.click('button[type="submit"]');
  await page.waitFor(10000);
  
  await browser.close();
})();