import { Browser, launch, } from "puppeteer";

export let browser: Browser;


export async function openBrowser(): Promise<void> {

    browser = await launch({
        headless: true,

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

export async function sortAllocationPage() {
    try {
        await openBrowser();


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
            await page.waitForSelector('span[aria-label="Sort sheet by column B, Z → A z"]');
            const classfify = await page.$('span[aria-label="Sort sheet by column B, Z → A z"]')
            await classfify?.click();
        } else {
            await page.waitForSelector('span[aria-label="Classificar página por coluna B, Z → A z"]');
            const classfify = await page.$('span[aria-label="Classificar página por coluna B, Z → A z"]')
            await classfify?.click();
        }

        setTimeout(() => closeBrowser(), 700);

    } catch (error) {
        console.log(error)
        // sortPage();
    }
}

