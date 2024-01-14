import './page.extentions';
import './frame.extentions';
import './element-handle.extentions';
import './frame.extentions';
import { ElementHandle } from 'puppeteer';

export async function $$has(elementHandles: ElementHandle[], selector: string): Promise<ElementHandle[]> {
    const results: ElementHandle[] = [];
    for (const row of elementHandles) {
        if (await row.$$has(selector)) {
            results.push(row);
        }
    }
    return results;
}
