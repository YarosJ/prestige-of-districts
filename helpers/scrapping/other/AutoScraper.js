import parseSite from './ParseSite';
import sanitizeForThemes from './SanitizeForThemes';
import NER from './NER';
import kramvoda from './kramvoda';
var fs = require("fs");

export default async function (mongooseConnnection) {
  // const timerId = setInterval( async () => {

  console.log(JSON.stringify(kramvoda));

  // fs.writeFile("./kramvoda1.json", JSON.stringify(kramvoda), (err) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   };
  //   console.log("File has been created");
  // });

  // const parseResult = await parseSite(`http://www.kramvoda.com/index.php?limitstart=${i * 3}`, ['.blog']);
  // const cleanParseResult = sanitizeForThemes(['municipal', 'police'], parseResult);
  // console.log('SANITIZE_PARSING_DATA:', cleanParseResult);

  // await NER(cleanParseResult);

  // }, 7200000);

  // clearInterval(timerId);
}
