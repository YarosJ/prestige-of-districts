import mongoose from 'mongoose';
import '../../../models/Permission';

mongoose.set('debug', true);

const PermissionModel = mongoose.model('Permission');

export default {
  Query: {
    roles() {
      return PermissionModel.find({}).exec();
    },
    actions(parent, { role }) {
      return PermissionModel.findOne({ role }).exec();
    },
  },
  Mutation: {
    async addRole(parent, { role, actions }, context) {
      const roleDoc = new PermissionModel({ role, actions });
      return roleDoc.save();
    },
    async addAction(parent, { role, action }, context) {
      const roleDoc = await PermissionModel.findOne({ role });
      await roleDoc.actions.push(action);
      return roleDoc.save();
    },
    async deleteRole(parent, { role }, context) {
      const roleDoc = await PermissionModel.findOne({ role });
      roleDoc.remove();
      return roleDoc;
    },
    async deleteAction(parent, { role, action }, context) {
      const roleDoc = await PermissionModel.findOne({ role });
      roleDoc.actions.pull(action);
      return roleDoc.save();
    },
  },
};
