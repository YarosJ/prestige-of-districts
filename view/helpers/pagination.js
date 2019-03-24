const [LIMIT, CURSOR] = ['15', '0'];

function currentPagination() {
  // localStorage.setItem('cursor', '0');
  return {
    limit: localStorage.getItem('limit') || LIMIT,
    cursor: localStorage.getItem('cursor') || CURSOR,
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
