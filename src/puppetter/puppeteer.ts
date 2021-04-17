import { Browser, ElementHandle, launch, Page } from "puppeteer";
import AllocationProps from "../interfaces/allocation_props";

export let browser: Browser;


export async function openBrowser(): Promise<void> {

    browser = await launch({
        headless: false,

        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--window-size=1368,720',
        ]
    });
}

export async function closeBrowser(): Promise<void> {
    browser.close();
}

export async function sortPage() {
    await openBrowser();

    let sortOption: ElementHandle<any> | null;

    const page = await browser.newPage();
    page.setViewport({
        width: 1368,
        height: 720
    })
    await page.goto(process.env.ALLOCATION_URL || "ALOCATION");

    await page.keyboard.press("Tab")

    const dataMenu = await page.$("#trix-data-menu")

    const value = await page.evaluate(el => el.textContent, dataMenu)

    await dataMenu?.click()

    if (value === "Data") {
        sortOption = await page.$('span[aria-label="Sort sheet by column B, Z → A z"]')
    } else {
        sortOption = await page.$('span[aria-label="Classificar página por coluna B, Z → A z"]')
    }

    await sortOption?.click()

    // closeBrowser()
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

        if (data.obs) {
            await insertProperties(page, data.obs as string)
        }


        setTimeout(() => closeBrowser(), 200);
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

    const value = await page.evaluate(el => el.textContent, menuDocsInsert)

    await menuDocsInsert?.click();
    // const insertRow = await page.$("#\\:5e")
    let insertRow: ElementHandle<any> | null
    if (value === "Inserir") {
        insertRow = await page.$('span[aria-label="Linha abaixo b"]')
    } else {
        insertRow = await page.$('span[aria-label="Row below b"]')
    }
    await insertRow?.click()
}

async function insertProperties(page: Page, inputText: string): Promise<void> {
    const cellInput = await page.$(".cell-input")
    await new Promise(resolve => setTimeout(resolve, 200));
    await cellInput?.click()
    await new Promise(resolve => setTimeout(resolve, 200));
    const input = await page.$("#t-formula-bar-input span")
    if (input == null) {
        closeBrowser()
        throw new Error()
    }
    await input?.type(inputText, { delay: 400 });
    await page.keyboard.press("Tab")
}

