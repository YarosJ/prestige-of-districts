/* global localStorage */

const [LIMIT, CURSOR] = ['15', '0'];

function currentPagination() {
  return {
    limit: parseInt(localStorage.getItem('limit') || LIMIT, 10),
    cursor: parseInt(localStorage.getItem('cursor') || CURSOR, 10),
  };
}

export function changePagination(cursor) {
  localStorage.setItem('cursor', cursor);
  return (cursor);
}

export function resetPagination() {
  localStorage.setItem('limit', LIMIT);
  localStorage.setItem('cursor', CURSOR);
}

export default currentPagination;
