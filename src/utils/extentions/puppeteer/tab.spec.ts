import puppeteer, {Page} from "puppeteer";
import {TabPool} from "@/utils/extentions/puppeteer/tab";
import './index';
import {delay} from "@/utils/common.util";

describe('TabExtentions', () => {

    it('concurrent execution', async () => {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        const stockCodes = [
            '247540',
            '005930',
            '000660',
            '035420',
            '035720',
            '051910',
            '207940',
            '068270',
            '006400',
            '005380',
            '035720',
            '012330',
            '000270',
            '028260',
        ];

        const tabPool = new TabPool(browser, 2);
        let bodies = await tabPool.run(
            stockCodes.map(stockCode => `https://finance.naver.com/item/main.naver?code=${stockCode}`),
            async (page: Page) => {
                let body = await page.outerHTML('body');
                return body;
            }
        );
        console.log(bodies[0]);
    }, 1000 * 60 * 60);

    it('setTimeout', async () => {


        const task = async () => {
            let timeout = setTimeout(() => {
                throw new Error('탭 타임아웃');
            }, 100);

            await delay(100);
            clearTimeout(timeout);
        }

        await task();


    });
});