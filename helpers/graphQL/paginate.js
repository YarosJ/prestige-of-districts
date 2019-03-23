export default (cr, lt) => {
  let limit = lt;
  let cursor = cr;
  if (!cursor && !limit) return {};
  if (!cursor) cursor = 1;
  if (!limit) limit = 5;

  return {
    skip: limit * (cursor - 1),
    limit,
  };
};