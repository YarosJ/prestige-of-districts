/* eslint-disable no-underscore-dangle */
import puppeteer from 'puppeteer';

/**
 * Scraper class.
 * Usage:
 *  const scraper = await new Scraper();
 *  const text = await scraper.getText('http://www.kramvoda.com/index.php', ['.blog']);
 *  scraper.close();
 */
export default class Scraper {
  /**
   * Creates an instance of Scraper class.
   * @returns {Promise<*>}
   */
  constructor() {
    return (async () => {
      this.browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        headless: true,
        args: ['--no-sandbox'],
      });
      this.page = await this.browser.newPage();
      return this;
    })();
  }

  /**
   * Gets text by of element by path on site by URL.
   * @param URL
   * @param patches
   * @returns {Promise<Array>}
   */
  async getText(URL, patches) {
    const results = [];
    await this._goTo(URL);
    await patches.forEach(async (tag) => {
      results.push(await this.page.evaluate((receivedTag) => {
        let result = '';
        // eslint-disable-next-line no-undef
        document.querySelectorAll(receivedTag)
          .forEach((element) => {
            element.childNodes.forEach((childNode) => {
              if (childNode.innerText) result += childNode.innerText;
            });
          });
        return result;
      }, tag));
    });
    await this.page.waitFor(5000);
    return results;
  }

  /**
   * Closes browser.
   */
  close() {
    this.browser.close();
  }

  /**
   * Goes to site by URL.
   * @param URL
   * @returns {Promise<void>}
   * @private
   */
  async _goTo(URL) {
    await this.page.goto(URL, { waitUntil: 'domcontentloaded' });
  }
}
