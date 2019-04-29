import { toast } from 'react-toastify';
import * as routes from '../../../constants/routes';

export default (history) => {
  if (!localStorage.getItem('role').match(/admin/gi)) {
    toast.error('Access Denied!');
    history.push(routes.LANDING);
  }
};
