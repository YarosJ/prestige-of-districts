/* global localStorage */

import { routes } from '../config.json';

export default ({ history, redirect }) => {
  const role = localStorage.getItem('role');
  if ((role && !role.match(/admin/gi)) || !role) {
    if (redirect) history.push(routes.errors.FORBIDDEN);
    return false;
  }
  return true;
};
