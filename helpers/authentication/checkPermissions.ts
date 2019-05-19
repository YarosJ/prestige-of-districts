import { PermissionModel } from '../../models/Permission';

export default async (action, role): Promise <boolean> => {
  const permission = await PermissionModel.findOne({ role });

  if (!permission) throw new Error('Permissions must be set');

  const { actions } = permission;

  if (!actions) return false;

  return actions.includes(action);
};
