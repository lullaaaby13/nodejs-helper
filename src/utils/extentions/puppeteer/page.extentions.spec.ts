import puppeteer from 'puppeteer';
import { delay } from '@/utils/common.util';
import './index';

describe('PageExtentions', () => {
    it(
        'checkbox',
        async () => {
            const browser = await puppeteer.launch({ headless: false });
            const page = await browser.newPage();
            await page.goto('http://www.homejjang.com/05/CheckBox.php');

            const selector = 'input[name="chk_info"]';
            await page.checkbox(selector, false);
            await delay(1000 * 3);
            await page.checkbox(selector, true);
            await delay(1000 * 3);
        },
        1000 * 60,
    );

    it('$nextSibling', async () => {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://www.naver.com');
        const elementHandle = await page.$nextSibling('div.RightSecond-module__desc_text1___wnAI6');
        const text = await elementHandle.textContent();
    });
});
