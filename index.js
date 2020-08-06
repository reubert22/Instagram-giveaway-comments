const puppeteer = require('puppeteer');

(async () => {
  const targetPageUrl = 'https://www.instagram.com/';
  const targetsAccount = [
    '@example_name'
  ];
  const giveawaysTarget = [
    {
      profile: 'https://www.instagram.com/motoart22/', 
      giveaway: 'https://www.instagram.com/p/B-QGm4lFfYa/',
      date: '08/05', 
      profileName: 'motoart22',
      numberProfilesPerComment: 1
    },
    {
      profile: 'https://www.instagram.com/hugo.milgrau/', 
      giveaway: 'https://www.instagram.com/p/B_pkTiWFKvh/', 
      date: '10/05', 
      profileName: 'hugo.milgrau',
      numberProfilesPerComment: 2
    },  
    {
      profile: 'https://www.instagram.com/arnondograu_/', 
      giveaway: 'https://www.instagram.com/p/B_p16xxlahi/', 
      date: '20/05', 
      profileName: 'arnondograu_',
      numberProfilesPerComment: 2
    },  
    {
      profile: 'https://www.instagram.com/teteurr46/', 
      giveaway: 'https://www.instagram.com/p/B_pkMbbAtrt/', 
      date: '20/05', 
      profileName: 'teteurr46',
      numberProfilesPerComment: 3
    }
  ];

  const handleRedirect = () => {
    const number = Math.floor(Math.random() * giveawaysTarget.length);
    const giveaway = giveawaysTarget[number];
    console.log('** Redirecting to: ' + giveaway.profileName + ' giveaway, date: ' + giveaway.date + ' **');
    return giveaway;
  }

  const handleProfileToComment = (numberProfilesPerComment) => {
    profile = "";
    arrayValidator = [];
    i = 0;
    while(i < numberProfilesPerComment) {
      const number = Math.floor(Math.random() * targetsAccount.length);
      if(arrayValidator.indexOf(number) === -1){
        arrayValidator.push(number);
        profile = profile.concat(' ', targetsAccount[number]);
        i++;
      } 
    }
    return profile;
  }


  const handleProfileFollow = async () => {
    const buttonFollow = await page.$x("//button[text()='Follow']");
    if (buttonFollow.length > 0) {
      await buttonFollow[0].click();
    } 
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
  handleProfileFollow();
  await page.waitFor(5000);
  await page.goto(giveawayToGo.giveaway);

  count = 0;
  while(true) {
    if (count === 10) {
      await page.waitFor(15000);
      const giveawayToGo = handleRedirect();
      await page.goto(giveawayToGo.profile);
      handleProfileFollow();
      await page.waitFor(6000);
      await page.goto(giveawayToGo.giveaway);
      count = 0;
    }
    await page.waitFor(10402);
    const profile = handleProfileToComment(giveawayToGo.numberProfilesPerComment);
    
    await page.waitFor('textarea');
    await page.type('textarea', profile, {delay: 790});
    await page.click('button[type="submit"]');
    count += 1;
    console.log('contador: ', count, ' > ', profile)
    await page.waitFor(5000);
  };

  await browser.close();
})();