 ### Scraper class
 
Scrapes data from given sites by given selectors

#### Usage:

```js

const scraper = await new Scraper();

await scraper.openBrowser();

const text = await scraper.getText('http://www.site.com', ['#foo .bar']);

scraper.close();

```
