import mongoose from 'mongoose';
import '../../models/Permission';

const PermissionModel = mongoose.model('Permission');

export default async (action, role) => {
  const { actions } = await PermissionModel.findOne({ role });
  if (!actions) return false;
  return actions.includes(action);
};
