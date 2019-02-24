/* eslint-disable no-useless-escape,quote-props */
// noinspection NonAsciiCharacters
// noinspection JSNonASCIINames

const patterns = {
  '\Д+\/+\с': 'Детский сад',
  'ОШ': 'Школа',
};

export default (text) => {
  let result = text;
  Object.keys(patterns).map((pattern) => {
    result = result.replace(new RegExp(pattern, 'g'), patterns[pattern]);
  });
  console.log('#########', result);
  return result;
};
