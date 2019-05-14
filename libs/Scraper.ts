/* global document */

// @ts-ignore
// eslint-disable-next-line no-unused-vars
import puppeteer, { Browser, Page } from 'puppeteer';

/**
 * Scraper class.
 * Usage:
 *  const scraper = await new Scraper();
 *  const text = await scraper.getText('http://www.kramvoda.com/index.php', ['.blog']);
 *  scraper.close();
 */
class Scraper {
  browser: Browser;

  page: Page;

  async openBrowser() {
    this.browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser',
      headless: true,
      args: ['--no-sandbox'],
    });

    this.page = await this.browser.newPage();
    return this;
  }

  async getText(URL: string, patches: Array<string>): Promise<Array<string>> {
    const results: Array<string> = [];
    await this.goTo(URL);
    await patches.forEach(async (tag: string) => {
      results.push(await this.page.evaluate((receivedTag: string) => {
        let result: string = '';
        document.querySelectorAll(receivedTag)
          .forEach((element) => {
            // eslint-disable-next-line no-undef
            element.childNodes.forEach((childNode: HTMLElement) => {
              if (childNode.innerText) result += childNode.innerText;
            });
          });
        return result;
      }, tag));
    });
    await this.page.waitFor(5000);
    return results;
  }

  closeBrowser() {
    this.browser.close();
  }

  protected async goTo(URL: string) {
    await this.page.goto(URL, { waitUntil: 'domcontentloaded' });
  }
}

export default async () => {
  const scraper = await new Scraper();
  await scraper.openBrowser();
  return scraper;
};
