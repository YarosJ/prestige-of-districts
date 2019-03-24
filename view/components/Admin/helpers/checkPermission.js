import React from "react";
import * as routes from '../../../constants/routes';
import { toast } from 'react-toastify';

export default (history) => {
  if (!localStorage.getItem('role').match(/admin/gi)) {
    toast.error("Access Denied!");
    history.push(routes.LANDING);
  }
}
