export default (loc) => {
  const withoutNumbers = loc.replace(/(?<!\№+\s|\d)(\d+|\,|\;+(?!\;))/g, '');
  const withNormalisedSpaces = withoutNumbers.replace(/\,|\;|\)/g, '');
  return withNormalisedSpaces.replace(/\s+/g, ' ');
};
