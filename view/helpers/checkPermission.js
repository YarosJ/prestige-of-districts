/* global localStorage */

import * as routes from '../constants/routes';

export default ({ history, redirect }) => {
  const role = localStorage.getItem('role');
  if ((role && !role.match(/admin/gi)) || !role) {
    if (redirect) history.push(routes.FORBIDDEN);
    return false;
  }
  return true;
};
