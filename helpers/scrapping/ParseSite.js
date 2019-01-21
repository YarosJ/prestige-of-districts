import puppeteer from 'puppeteer';

const parseSite = async (site, tags) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(site);
  // await page.click(target);

  await page.waitFor(1000);

  let result = [];

  await tags.forEach(async (tag, i, arr) => {
    const subResult = await page.evaluate(tag1 => {
      let result = [];
      for (let rr of document.querySelectorAll(tag1)) {
        for(let uu of rr.childNodes) {
          if(uu.className && !uu.className.match(/items-more|pagination/gi)) {
            result.push(uu.innerText);
          }
        };
      }
      return result;
    }, tag);
    result.push(...subResult);
  });

  await page.waitFor(2000);

  browser.close();
  return result;
};

export default parseSite;
