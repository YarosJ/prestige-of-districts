/* global document */

import puppeteer, { Browser, Page } from 'puppeteer';

/**
 * Scrapes data from given sites by given selectors
 */

class Scraper {
  public browser: Browser;

  public page: Page;

  public async openBrowser(): Promise <Scraper> {
    this.browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser',
      headless: true,
      args: ['--no-sandbox'],
    });

    this.page = await this.browser.newPage();

    return this;
  }

  public async getText(URL: string, patches: string[]): Promise <string[]> {
    const results: string[] = [];

    await this.goTo(URL);

    await patches.forEach(async (tag: string): Promise <void> => {
      results.push(await this.page.evaluate((receivedTag: string): string => {
        let result = '';

        document.querySelectorAll(receivedTag)
          .forEach((element): void => {
            element.childNodes.forEach((childNode: HTMLElement): void => {
              if (childNode.innerText) result += childNode.innerText;
            });
          });

        return result;
      }, tag));
    });

    await this.page.waitFor(5000);

    return results;
  }

  public closeBrowser(): void {
    this.browser.close();
  }

  protected async goTo(URL: string): Promise <Page> {
    await this.page.goto(URL, { waitUntil: 'domcontentloaded' });
  }
}

export default async (): Promise <Scraper> => {
  const scraper = await new Scraper();
  await scraper.openBrowser();

  return scraper;
};
