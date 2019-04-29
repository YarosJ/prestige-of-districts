export default (res, _assert, cb) => {
  const { errors, data } = res;
  if (errors) {
    errors.forEach(e => _assert.fail(e));
  } else {
    if (cb) cb(data);
    _assert.isOk('everything');
  }
};
