export default (loc) => {
  return loc.replace(/(?<!\№+\W+)(\d+|\,|\;+(?!\;))/g, '');
};
