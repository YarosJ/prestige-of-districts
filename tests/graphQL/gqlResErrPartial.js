export default (res, _assert) => {
  const { errors } = res;
  if (errors) {
    errors.forEach(e => _assert.fail(e));
  } else _assert.isOk('everything');
};
