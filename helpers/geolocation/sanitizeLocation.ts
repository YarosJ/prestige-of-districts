/* eslint-disable no-useless-escape */

/**
 * Removes unnecessary symbols for geocoder from given string
 */

const sanitize = (loc: string): string => {
  const withoutNumbers = loc.replace(/(?<!\№+\s|\d)(\d+|\,|\;+(?!\;))/g, '');
  const withNormalisedSpaces = withoutNumbers.replace(/\,|\;|\)/g, '');

  return withNormalisedSpaces.replace(/\s+/g, ' ');
};

export default sanitize;
