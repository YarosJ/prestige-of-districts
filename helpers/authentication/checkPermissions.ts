import { PermissionModel } from '../../models/Permission';

/**
 * Returns true if given role has given action, else returns false
 */

const checkPermissions = async (action, role): Promise <boolean> => {
  const permission = await PermissionModel.findOne({ role });

  if (!permission) throw new Error('Permissions must be set');

  const { actions } = permission;

  if (!actions) return false;

  return actions.includes(action);
};

export default checkPermissions;
