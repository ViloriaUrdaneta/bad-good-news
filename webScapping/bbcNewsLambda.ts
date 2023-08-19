export const bbcTopNewsLambda = async () => {

let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    chrome = require("chrome-aws-lambda");
    puppeteer = require("puppeteer-core");
} else {
    puppeteer = require("puppeteer");
}

let options: any = {};

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
        // @ts-ignore
        args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
        // @ts-ignore
        defaultViewport: chrome.defaultViewport,
        // @ts-ignore
        executablePath: await chrome.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
    };
}


    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.goto('https://www.bbc.com/mundo');
    
    await page.waitForTimeout(2000);
    await page.waitForSelector('ol[role="list"]');
    const topNewsLinks = await page.evaluate(() => {
        const topNews = document.querySelectorAll('ol[role="list"] li div div a');
        let links: string[] = [];
        // @ts-ignore
        for (let topNew of topNews) {
            links.push(topNew.href);
        }
        return links;
    });
    let titles: { title: string; subtitle: string }[] = [];
    
    for (let topNewLink of topNewsLinks) {
        await page.goto(topNewLink);
        await page.waitForTimeout(2000);
        const title = await page.evaluate(() => {
            const tmp: { title: string; subtitle: string } = {
                title: '',
                subtitle: '',
            };
            // @ts-ignore
            const titleElement = document?.querySelector('h1[id="content"]')?.innerText;
            // @ts-ignore
            const subtitleElement = document?.querySelector('main div p b')?.innerText;
            if (titleElement) {
                tmp.title = titleElement;
            }
            if (subtitleElement) {
                tmp.subtitle = subtitleElement;
            }
            return tmp;
        });
        titles.push(title);

        
    }
    
    await browser.close();

    const conciseNewsArray: string[] = titles.map((news, index) => {
        return `Noticia ${index}: ${news.title} - desarrollo:${news.subtitle}`;
    });
    return conciseNewsArray
};