const puppeteer = require('puppeteer');

(async () => {
  const targetPageUrl = 'https://www.instagram.com/';
  const targetsAccount = [];
  const giveawaysTarget = [
    {
      profile: 'https://www.instagram.com/wesley_alemao_/', 
      giveaway: 'https://www.instagram.com/p/B_YMGKpnhrZ/', 
      date: '08/05', 
      profileName: 'wesley_alemao_'
    }
  ];

  const handleRedirect = () => {
    const number = Math.floor(Math.random() * giveawaysTarget.length);
    const giveaway = giveawaysTarget[number];
    console.log('** Redirecting to: ' + giveaway.profileName + ' giveaway, date: ' + giveaway.date + ' **');
    return giveaway;
  }

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(targetPageUrl);
  
  await page.waitFor('input[name=username]');
  await page.type('input[name=username]', process.env.MY_USERNAME, { delay: 300 });
  await page.type('input[name=password]', process.env.MY_PASS, { delay: 500 });
  await page.click('button[type="submit"]');
  await page.waitFor(10000);
  
  const giveawayToGo = handleRedirect();
  await page.goto(giveawayToGo.profile);
  await page.waitFor(5000);
  await page.goto(giveawayToGo.giveaway);

  await page.waitFor(10000);
  await page.waitFor('textarea');
  await page.type('textarea', '@profile_name', { delay: 642 });

  await browser.close();
})();