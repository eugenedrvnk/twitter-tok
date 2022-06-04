// const http = require('http');
//
// const hostname = '127.0.0.1';
// const port = 3000;
//
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });
//
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const puppeteer = require('puppeteer-extra');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const path = require('path');
const fs = require('fs');

puppeteer.use(AdblockerPlugin());

(async () => {
  const browser = await puppeteer.launch({
    headless: false, defaultViewport: {
      width: 400,
      height: 1000,
    }
  });

  const page = await browser.newPage();

  const tweetId = '1530948740030283777';
  const tweetFolderPath = `tweets/${tweetId}`;
  fs.mkdirSync(tweetFolderPath, {recursive: true});
  fs.mkdirSync(`${tweetFolderPath}/screens`, {recursive: true});
  fs.mkdirSync(`${tweetFolderPath}/audios`, {recursive: true});

  const preparedTweets = [];

  // await page.goto(`https://www.twuko.com/WVlllV/tweet/${tweetId}`);
  // // await page.waitForSelector('.at-share-dock');
  //
  // const tweets = await page.$$('.tweet');
  //
  // for (let i = 0; i < 2; i++) {
  //   const tweet = tweets[i];
  //   const pathToSave = `${tweetFolderPath}/screens/${i}.png`;
  //
  //   const tweetTextElement = await tweet.$('.break-words');
  //   const text = await tweetTextElement.evaluate((el) => {
  //     const dirtyString = el.textContent.trim().replace(/(\r\n|\n|\r)/gm, "");
  //     return dirtyString.split('.').join('. ');
  //   });
  //
  //   await tweet.screenshot({path: pathToSave, captureBeyondViewport: false});
  //   preparedTweets.push({path: pathToSave, text})
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  // }
  //
  // await page._client.send('Page.setDownloadBehavior', {
  //   behavior: 'allow',
  //   downloadPath: path.resolve(`${tweetFolderPath}/audios`),
  // });
  //
  // for (let i = 0; i < preparedTweets.length; i++) {
  //   const tweet = preparedTweets[i];
  //   await page.goto('https://www.narakeet.com/app/text-to-audio/?projectId=612185f8-4256-4e91-8322-4cd1aa2fdf50');
  //   await page.waitForSelector('#unparsedScriptEditor', {visible: true})
  //   await page.select('#cfgVideoLanguage', 'ru-RU');
  //   await page.select('#cfgVideoVoice', 'vladimir');
  //   await page.focus('#unparsedScriptEditor');
  //   await page.keyboard.type(tweet.text);
  //   await page.click('button[role=compile')
  //   await page.waitForSelector('a[role=audio]', {visible: true});
  //   await page.click('a[role=audio]')
  // }

  await page.goto('https://clideo.com/merge-audio');
  await page.waitForSelector('#upload-file');
  const input = await page.$('#upload-file');
  await input.uploadFile(`${tweetFolderPath}/audios/Кажется, Твиттеру этого сейчас.m4a`);
  await input.uploadFile(`${tweetFolderPath}/audios/Начнём с банальщины_ когда вы.m4a`);
})();
