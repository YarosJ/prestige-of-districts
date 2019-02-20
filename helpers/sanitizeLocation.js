export default (loc) => {
  const result = loc.replace(/(?<!\№+\W+)(\d+|\,|\;+(?!\;))/g, '');
  console.log(result);
  return result;
};
