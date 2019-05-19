interface Paginate {
  skip?: number;
  limit?: number;
}

/**
 * Returns pagination query depending on cursor and/or limit
 */

export default (cr, lt): Paginate => {
  let limit: number = lt;
  let cursor: number = cr;

  if (!cursor && !limit) return {};
  if (!cursor) cursor = 1;
  if (!limit) limit = 5;

  return {
    skip: limit * (cursor - 1),
    limit,
  };
};
