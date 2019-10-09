//node node_modules/mocha/bin/mocha tests/test.js --timeout 0

const puppeteer = require('puppeteer');
const { expect } = require('chai');
let browser;
let page;

describe('test for PrestaShop', async function() {
    it('first test', async function() {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            timeout: 0,
            args: ['--no-sandbox', '--lang=en-EN'],
            defaultViewport: {
                width: 600,
                height: 400,
            }
        });
        page = await browser.newPage();
        await page.goto('http://localhost/prestashop/admin-dev');
        await page.type('#email', 'demo@prestashop.com');
        await page.type('#passwd', 'prestashop_demo');
        await page.click('#submit_login');
        await page.waitFor(5000);
        await console.log('Check page title is correct : '+page.title());
        await page.click('button.onboarding-button-shut-down');
        await page.click('#subtab-AdminCatalog');
        await page.click('#subtab-AdminProducts');
        await page.waitFor(5000);
        const nbrLines = (await page.$$('#product_catalog_list table tbody tr')).size();
        console.log(nbrLines+' should be equal to 20');
        const product1 = await page.$eval('#product_catalog_list > div:nth-child(2) > div > div > table > tbody > tr:nth-child(1) > td:nth-child(4) > a', e => e.innerText);
        const product2 = await page.$eval('#product_catalog_list > div:nth-child(2) > div > div > table > tbody > tr:nth-child(2) > td:nth-child(4) > a', e => e.innerText);
        const product3 = await page.$eval('#product_catalog_list > div:nth-child(2) > div > div > table > tbody > tr:nth-child(3) > td:nth-child(4) > a', e => e.innerText);
        const product4 = await page.$eval('#product_catalog_list > div:nth-child(2) > div > div > table > tbody > tr:nth-child(4) > td:nth-child(4) > a', e => e.innerText);
        const product5 = await page.$eval('#product_catalog_list > div:nth-child(2) > div > div > table > tbody > tr:nth-child(5) > td:nth-child(4) > a', e => e.innerText);
        const product6 = await page.$eval('#product_catalog_list > div:nth-child(2) > div > div > table > tbody > tr:nth-child(6) > td:nth-child(4) > a', e => e.innerText);
        console.log('product 1 name is Customizable mug : '+product1);
        console.log('product 2 name is Hummingbird notebook : '+product2);
        console.log('product 3 name is Brown bear notebook : '+product3);
        console.log('product 4 name is Mountain fox notebook : '+product4);
        console.log('product 5 name is Pack Mug + Framed poster : '+product5);
        console.log('product 6 name is Hummingbird - Vector graphics : '+product6);
        await browser.close();
    });

    it('second test', async function() {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            timeout: 0,
            args: ['--no-sandbox', '--lang=en-EN'],
            defaultViewport: {
                width: 600,
                height: 400,
            }
        });
        page = await browser.newPage();
        await page.goto('http://localhost/prestashop/');
        await page.click('#content > section > div > article:nth-child(1) > div > a');
        await page.waitFor(5000);
        await page.click('#add-to-cart-or-refresh > div.product-add-to-cart > div > div.add > button');
        await page.waitFor(5000);
        const modal = await page.waitFor('#blockcart-modal[style="display: block;"]');
        await console.log('modal is visible if this is equal to true : ' + modal);
        await page.waitFor(500);
        await browser.close();
    });
});
