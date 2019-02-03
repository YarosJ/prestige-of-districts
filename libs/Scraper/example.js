import Scraper from './index';

const example = async () => {
  const scraper = await new Scraper();
  console.log(await scraper.getText('http://www.kramvoda.com/index.php', ['.blog']));
  scraper.close();
};

example();
