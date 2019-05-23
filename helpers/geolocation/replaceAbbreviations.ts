/* eslint-disable no-useless-escape,quote-props */
// noinspection NonAsciiCharacters

const patterns = {
  '\Д+\/+\с': 'Детский сад',
  'ОШ': 'Школа',
}; // From config

/**
 * Replaces abbreviations in the given string to understandable for the geocoder
 */

const replace = (text: string): string => {
  let result: string = text;
  Object.keys(patterns).forEach((pattern): void => {
    result = result.replace(new RegExp(pattern, 'g'), patterns[pattern]);
  });

  return result;
};

export default replace;
