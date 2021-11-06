const chromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')
const express = require('express'); // Adding Express
const app = express(); // Initializing Express

app.get('/', function (req, res) {
    let url = req.query.url;
    if (typeof url !== 'undefined') {
        puppeteer.launch({headless: true,args: ['--no-sandbox']}).then(async function (browser) {
            const page = await browser.newPage();
            await page.goto('https://snaptik.app/vn');
            await page.type('#url', url)
            await page.click('#submiturl')
            await page.waitForSelector('#snaptik-video > article > div.snaptik-right');
            const data = await page.evaluate(() => document.querySelector('#snaptik-video').outerHTML);
            await browser.close();
            res.send(data);
            //   await browser.close();
        })
    } else {
        res.send("Vui long nhap link");
    }
});
// Making Express listen on port 7000
app.listen(3000, function () {
    console.log(`Running on port 3000.`);
});