/* global localStorage */

import * as routes from '../constants/routes';

export default ({ history, redirect }) => {
  if (!localStorage.getItem('role').match(/admin/gi)) {
    if (redirect) history.push(routes.FORBIDDEN);
    return false;
  }
  return true;
};
