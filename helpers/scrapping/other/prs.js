import parseSite from './ParseSite';
import sanitizeForThemes from './SanitizeForThemes';
import NER from './NER';
import fs from 'fs';

export default async function (mongooseConnnection) {
  // const timerId = setInterval( async () => {

  const file = fs.createWriteStream('kramvoda.txt');
  file.on('error', function(err) { console.log(err) });

  let i = 0;

  while (i < 202) {
    console.log(`------------------------- PAGE NUMBER: ${i} -----------------------`);
    const parseResult = await parseSite(`http://www.kramvoda.com/index.php?limitstart=${i * 3}`, ['.blog']);
    console.log(parseResult);
    const textRes = '\n ' + parseResult;
    const cls = textRes.match(/сократи|остановл|извинен|вибач/gi) ? 'EVENT' : 'OTHER';
    file.write('\n***START_DOC***\n');
    file.write(textRes);
    file.write('\n  ###CLASS: ' + cls + '\n');
    file.write('\n***END_DOC***\n');
    i++;
  }

  console.log('####################### End of parsing #######################');
  file.end();
  console.log('####################### End of writing #######################');

  // const cleanParseResult = sanitizeForThemes(['municipal', 'police'], parseResult);
  // console.log('SANITIZE_PARSING_DATA:', cleanParseResult);

  // await NER(cleanParseResult);

  // }, 7200000);

  // clearInterval(timerId);
}
