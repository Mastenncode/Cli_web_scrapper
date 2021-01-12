const puppeteer = require('puppeteer');
const fs = require('fs');

const scrape = async() =>{
    try{

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://fr.wikipedia.org/wiki/Pand%C3%A9mie_de_Covid-19_par_pays_et_territoire');

    //Scrape wikipedia
    const recordList = await page.$$eval('.covid-par-pays tbody tr', (throws)=>{
        let rowList = [];
        throws.forEach(row => {
            let record = {'lieux': '', 'confirmés': '', 'décés': '', 'rétablis':'', '% morts par cas confirmés': '', 'morts par million d\'habitants': ''}
            const tdList = Array.from(row.querySelectorAll('td'), column => column.innerText);
            record.lieux = tdList[0];
            record.confirmés = tdList[1];
            record.décés = tdList[2];
            record.rétablis = tdList[3];
            record['% morts par cas confirmés'] = tdList[4];
            record['morts par million d\'habitants'] = tdList[5];            
            if(tdList.length>=3){
                rowList.push(record)
            }
        });
        return rowList;
    })
    console.log(recordList)
// Selector for screenshot
    await page.waitForSelector('.covid-par-pays');
    const element = await page.$('.covid-par-pays');
//screenshots
    await element.screenshot({ path: './screenshots/covid_par_pays.png'});
//PDF
    await page.pdf({ path:'./pdf/source.pdf'})
    await browser.close();

    }catch (error){ 
        console.log(error)
    }
}
scrape();


