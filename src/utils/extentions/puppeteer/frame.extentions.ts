// Page 클래스의 확장을 위한 타입 선언 병합
import { ElementHandle, Frame, JSHandle, Page } from 'puppeteer';

const _textContent = (element: HTMLElement) => element?.textContent?.trim();

declare module 'puppeteer' {
    interface Frame {
        $OrElseThrow(selector): Promise<ElementHandle>;
        $nextSibling(selector: string): Promise<ElementHandle<Node>>;
        $$textContains(selector: string, text: string): Promise<ElementHandle[]>;
        goAndWaitNavigation(url: string): Promise<void>;
        textContent(selector: string): Promise<string[]>;
        innerHTML(selector: string): Promise<string>;
        outerHTML(selector: string): Promise<string>;
        checkbox(selector: string, value: boolean): Promise<void>;
        click2(selector: string): Promise<void>;
    }
}

Frame.prototype.$OrElseThrow = async function (selector: string): Promise<ElementHandle> {
    const elementHandle: ElementHandle = await this.$(selector);
    if (!elementHandle) {
        throw new Error(`요소를 찾을 수 없습니다. [selector = ${selector}]`);
    }
    return elementHandle;
};
Frame.prototype.$nextSibling = async function (selector: string): Promise<ElementHandle<Node>> {
    const elementHandle = await this.$(selector);
    const sibling: JSHandle = await this.evaluateHandle((arg) => arg.nextSibling, elementHandle);
    const elem = sibling.asElement();
    if (elem === null) {
        throw new Error();
    }
    return elem;
};
Frame.prototype.$$textContains = async function (selector: string, text: string): Promise<ElementHandle[]> {
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

Frame.prototype.textContent = async function (selector: string): Promise<string[]> {
    const elementHandles: ElementHandle[] = await this.$$(selector);
    return await Promise.all(elementHandles.map((it) => this.evaluate(_textContent, it)));
};
Frame.prototype.innerHTML = async function (selector: string): Promise<string> {
    return await this.$eval(selector, (htmlInputElement: HTMLInputElement) => htmlInputElement.innerHTML);
};
Frame.prototype.outerHTML = async function (selector: string): Promise<string> {
    return await this.$eval(selector, (htmlInputElement: HTMLInputElement) => htmlInputElement.outerHTML);
};
Frame.prototype.checkbox = async function (selector: string, value: boolean): Promise<void> {
    await this.$eval(
        selector,
        (htmlElement, param) => {
            htmlElement.checked = param;
        },
        value,
    );
};
Frame.prototype.click2 = async function (selector: string): Promise<void> {
    await this.evaluate((arg) => document.querySelector(arg).click(), selector);
};

