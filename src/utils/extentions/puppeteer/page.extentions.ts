// Page 클래스의 확장을 위한 타입 선언 병합
import { ElementHandle, Frame, Page } from 'puppeteer';

const _textContent = (element: HTMLElement) => element?.textContent?.trim();

declare module 'puppeteer' {
    interface Page {
        $OrElseThrow(selector): Promise<ElementHandle>;
        $iframe(selector: string): Promise<Frame>;
        $nextSibling(selector: string): Promise<ElementHandle>;

        $$textContains(selector: string, text: string): Promise<ElementHandle[]>;
        goAndWaitNavigation(url: string): Promise<void>;
        textContent(selector: string): Promise<string[]>;
        innerHTML(selector: string): Promise<string>;
        outerHTML(selector: string): Promise<string>;
        checkbox(selector: string, value: boolean): Promise<void>;

        click2(selector: string): Promise<void>;
    }
}

Page.prototype.$OrElseThrow = async function (selector: string): Promise<ElementHandle> {
    const elementHandle: ElementHandle = await this.$(selector);
    if (!elementHandle) {
        throw new Error(`요소를 찾을 수 없습니다. [selector = ${selector}]`);
    }
    return elementHandle;
};
Page.prototype.$iframe = async function (selector: string): Promise<Frame> {
    const elementHandle: ElementHandle = await this.$(selector);
    if (!elementHandle) {
        throw new Error(`요소를 찾을 수 없습니다. [selector = ${selector}]`);
    }
    const contentFrame = await elementHandle.contentFrame();
    if (!contentFrame) {
        throw new Error(`요소의 프레임이 존재 하지 않습니다. [selector = ${selector}]`);
    }
    return contentFrame;
};

Page.prototype.$nextSibling = async function (selector: string): Promise<ElementHandle> {
    const elementHandle = await this.$(selector);
    return await this.evaluateHandle((arg) => arg.nextSibling, elementHandle);
};

Page.prototype.$$textContains = async function (selector: string, text: string): Promise<ElementHandle[]> {
    const elementHandles: ElementHandle[] = await this.$$eval(selector);

    const results: (ElementHandle | null)[] = await Promise.all(
        elementHandles.map(async (it) => {
            const textContent = await it.textContent();
            if (textContent.includes(text)) {
                return it;
            } else {
                return null;
            }
        }),
    );

    const filtered: ElementHandle[] = [];
    for (const result of results) {
        if (result !== null) {
            filtered.push(result);
        }
    }

    return filtered;
};

Page.prototype.goAndWaitNavigation = async function (url: string): Promise<void> {
    await Promise.all([this.goto(url), this.waitForNavigation({ timeout: 30 * 1000 })]);
};

Page.prototype.textContent = async function (selector: string): Promise<string[]> {
    const elementHandles: ElementHandle[] = await this.$$(selector);
    return await Promise.all(elementHandles.map((it) => this.evaluate(_textContent, it)));
};
Page.prototype.innerHTML = async function (selector: string): Promise<string> {
    return await this.$eval(selector, (htmlInputElement: HTMLInputElement) => htmlInputElement.innerHTML);
};
Page.prototype.outerHTML = async function (selector: string): Promise<string> {
    return await this.$eval(selector, (htmlInputElement: HTMLInputElement) => htmlInputElement.outerHTML);
};

Page.prototype.checkbox = async function (selector: string, value: boolean): Promise<void> {
    await this.$eval(
        selector,
        (htmlElement, param) => {
            htmlElement.checked = param;
        },
        value,
    );
};
Page.prototype.click2 = async function (selector: string): Promise<void> {
    await this.evaluate((arg) => document.querySelector(arg).click(), selector);
};
