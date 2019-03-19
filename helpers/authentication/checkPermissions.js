import mongoose from 'mongoose';
import '../../models/Permission';

const PermissionModel = mongoose.model('Permission');

export default async (action, role) => {
  const permission = await PermissionModel.findOne({ role });
  if (!permission) throw new Error('Permissions must be set');
  const { actions } = permission;
  if (!actions) return false;
  return actions.includes(action);
};
