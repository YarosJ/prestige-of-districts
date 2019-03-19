import mongoose from 'mongoose';
import { PubSub } from 'apollo-server-express';
import '../../models/Permission';

mongoose.set('debug', true);
const PermissionModel = mongoose.model('Permission');
const pubSub = new PubSub();

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
      const newRole = await roleDoc.save();
      pubSub.publish('ROLE_ADDED', { roleAdded: newRole });
      return newRole;
    },
    async addAction(parent, { role, action }, context) {
      const roleDoc = await PermissionModel.findOne({ role });
      await roleDoc.actions.push(action);
      const updatedRole = await roleDoc.save();
      pubSub.publish('ACTION_ADDED', { actionAdded: updatedRole });
      return updatedRole;
    },
    async deleteRole(parent, { role }, context) {
      const roleDoc = await PermissionModel.findOne({ role });
      roleDoc.remove();
      pubSub.publish('ROLE_DELETED', { roleDeleted: roleDoc });
      return roleDoc;
    },
    async deleteAction(parent, { role, action }, context) {
      const roleDoc = await PermissionModel.findOne({ role });
      roleDoc.actions.pull(action);
      const updatedRole = await roleDoc.save();
      pubSub.publish('ACTION_DELETED', { actionDeleted: updatedRole });
      return updatedRole;
    },
  },
  Subscription: {
    roleAdded: {
      subscribe: () => pubSub.asyncIterator(['ROLE_ADDED']),
    },
    roleDeleted: {
      subscribe: () => pubSub.asyncIterator(['ROLE_DELETED']),
    },
    actionAdded: {
      subscribe: () => pubSub.asyncIterator(['ACTION_ADDED']),
    },
    actionDeleted: {
      subscribe: () => pubSub.asyncIterator(['ACTION_DELETED']),
    },
  },
};
