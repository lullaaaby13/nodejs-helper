import {Browser, Page} from 'puppeteer';
import { v4 as uuid } from 'uuid';
import {delay} from "@/utils/common.util";

export class Tab {
    public id: string;
    private page: Page;
    private taskTimout: number;
    public isTimedout: boolean = false;

    constructor(page: Page, taskTimout: number) {
        this.id = uuid();
        this.page = page;
        this.taskTimout = taskTimout;
    }

    async run(link: string, task: ((page: Page) => Promise<any>)) {
        const timeout = setTimeout(async () => {
            await this.refreshPage();
            this.isTimedout = true;
        }, this.taskTimout);

        this.isTimedout = false;
        let result;
        while(true) {
            if (this.isTimedout) {
                throw new Error(`탭 타임아웃 [link = ${link}]`);
            }
            try {
                await Promise.all([
                    this.page.goto(link),
                    this.page.waitForNavigation(),
                ]);

                result =  await task(this.page);
                if (result) {
                    clearTimeout(timeout);
                    break;
                }
            } catch(e) {
                clearTimeout(timeout);
                throw e;
            }
            await delay(500);
        }
        this.isTimedout = false;
        return result;
    }

    private async refreshPage() {
        let browser = this.page.browser();
        await this.page.close();
        this.page = await browser.newPage();
    }

}


export class TabPool {


    private tabs: Tab[];
    private fetchTabTimeout: number = 1000 * 30;

    public constructor(browser: Browser, numberOfTabs: number, taskTimout: number = 1000 * 30) {
        this.tabs = [];
        for (let i = 0; i < numberOfTabs; i++) {
            browser.newPage()
                .then((page) => {
                    const tab = new Tab(page, taskTimout);
                    this.tabs.push(tab);
                });
        }
    }

    public async run(links: string[], task: ((page: Page) => Promise<any>)) {
        return await Promise.all(links.map(async (link) => {
            const tab = await this.getTab();

            try {
                return await tab.run(link, task);
            } catch(e) {
                if (!tab.isTimedout) {
                    console.error(`탭 작업 실행 에러 [link = ${link}]\n`, e.stack);
                } else {
                    console.error(`탭 타임아웃 [link = ${link}]\n`, e.stack);
                }
            } finally {
                this.tabs.push(tab);
            }
        }));
    }

    private async getTab(): Promise<Tab> {
        const start = Date.now();
        while (true) {
            const tab = this.tabs.pop();
            if (tab) {
                return tab;
            }
            if (Date.now() - start > this.fetchTabTimeout) {
                throw new Error('탭을 가져올 수 없습니다.');
            }
            await delay(500);
        }
    }


}