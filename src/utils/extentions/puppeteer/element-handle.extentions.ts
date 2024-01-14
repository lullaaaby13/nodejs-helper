// Page 클래스의 확장을 위한 타입 선언 병합
import {ElementHandle} from 'puppeteer';

const _textContent = (element: HTMLElement) => element?.textContent?.trim();
const _innerHTML = (element: HTMLElement) => element?.innerHTML;
const _outerHTML = (element: HTMLElement) => element?.outerHTML;
const _href = (element: HTMLElement) => element?.getAttribute('href');

declare module 'puppeteer' {
    interface ElementHandle {
        $OrElseThrow(selector): Promise<ElementHandle>;
        $$has(selector: string): Promise<boolean>;
        textContent(): Promise<string>;
        innerHTML(): Promise<string>;
        outerHTML(): Promise<string>;
        href(): Promise<string>;
    }
}
ElementHandle.prototype.$OrElseThrow = async function (selector: string): Promise<ElementHandle> {
    const elementHandle = this.$(selector);
    if (!elementHandle) {
        throw new Error(`요소를 찾을 수 없습니다. [selector = ${selector}]`);
    }
    return elementHandle;
};

ElementHandle.prototype.$$has = async function (selector: string): Promise<boolean> {
    const elementHandles: ElementHandle[] = await this.$$(selector);
    return elementHandles.isNotEmpty();
};
ElementHandle.prototype.textContent = async function (): Promise<string> {
    return await this.evaluate(_textContent);
};
ElementHandle.prototype.innerHTML = async function (): Promise<string> {
    return await this.evaluate(_innerHTML);
};
ElementHandle.prototype.outerHTML = async function (): Promise<string> {
    return await this.evaluate(_outerHTML);
};
ElementHandle.prototype.href = async function (): Promise<string> {
    return await this.evaluate(_href);
};
