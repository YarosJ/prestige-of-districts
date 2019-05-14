 ### Scraper class
 
Scrapes data from given sites by given selectors

#### Usage:

```js

const scraper = await new Scraper();

const text = await scraper.getText('http://www.site.com', ['#foo .bar']);

scraper.close();

```
