import { Browser, launch, Page } from "puppeteer";
import AllocationProps from "../interfaces/allocation_props";

let browser: Browser;


export async function openBrowser(): Promise<void> {
    browser = await launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ]
    });
}

export async function closeBrowser(): Promise<void> {
    browser.close();
}

export async function openNewAllocationPage(data: AllocationProps): Promise<void> {

    if (browser != null) {
        const page = await browser.newPage();
        await page.goto(process.env.ALLOCATION_URL || "ALOCATION");

        await insertNewRow(page)

        await insertProperties(page, data.username)
        await insertProperties(page, getTodayDate())
        await insertProperties(page, data.project)
        await insertProperties(page, data.hours)


        setTimeout(() => page.close(), 200);
    }
}

function getTodayDate(): string {
    let today = "";
    const date = new Date();

    today = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

    return today
}

async function insertNewRow(page: Page): Promise<void> {
    const menuDocsInsert = await page.$("#docs-insert-menu")
    await menuDocsInsert?.click();
    const insertRow = await page.$("#\\:5c")
    await insertRow?.click()
}

async function insertProperties(page: Page, inputText: string): Promise<void> {
    const cellInput = await page.$(".cell-input")
    await cellInput?.click()
    await new Promise(resolve => setTimeout(resolve, 200));
    const input = await page.$("#t-formula-bar-input span")
    await input?.type(inputText, { delay: 200 });
    await page.keyboard.press("Tab")
}

