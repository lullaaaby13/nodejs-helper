import * as Cheerio from 'cheerio';

declare module cheerio {
    interface Cheerio {
        toArray<T>(): Array<T>;
        href(): string;
    }
}

Cheerio.prototype.toArray = function () {
    return Array.from(this);
};
Cheerio.prototype.href = function () {
    const href = this.attr('href');
    if (!href) {
        throw new Error('href 속성을 찾을 수 없습니다.');
    }
    return href;
};
