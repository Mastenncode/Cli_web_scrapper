const puppeteer = require('puppeteer');
const fs = require('fs');

const print = async() =>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://fr.wikipedia.org/wiki/Pand%C3%A9mie_de_Covid-19_par_pays_et_territoire');

    await page.waitForSelector('.covid-par-pays');
    const element = await page.$('.covid-par-pays');

    await element.screenshot({ path: './screenshots/covid_par_pays.png'});
    await page.pdf({ path:'./pdf/source.pdf'})
    await browser.close();
}
print();


