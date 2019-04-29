import mongoose from 'mongoose';
import '../../../models/Permission';

const PermissionModel = mongoose.model('Permission');

export default {
  Query: {
    /**
     * Returns all roles
     * @returns {*}
     */
    roles() {
      return PermissionModel.find({}).exec();
    },

    /**
     * Returns permission by role
     * @param parent
     * @param role
     * @returns {Promise}
     */
    actions(parent, { role }) {
      return PermissionModel.findOne({ role }).exec();
    },
  },

  Mutation: {
    /**
     * Creates new permission by role and actions
     * @param parent
     * @param role
     * @param actions
     * @returns {Promise<*>}
     */
    async addRole(parent, { role, actions }) {
      const roleDoc = new PermissionModel({ role, actions });
      return roleDoc.save();
    },

    /**
     * Finds permission and pushes into this new action
     * @param parent
     * @param role
     * @param action
     * @returns {Promise<*>}
     */
    async addAction(parent, { role, action }) {
      const roleDoc = await PermissionModel.findOne({ role });
      await roleDoc.actions.push(action);
      return roleDoc.save();
    },

    /**
     * Deletes permission by given role
     * @param parent
     * @param role
     * @returns {Promise<void>}
     */
    async deleteRole(parent, { role }) {
      const roleDoc = await PermissionModel.findOne({ role });
      roleDoc.remove();
      return roleDoc;
    },

    /**
     * Finds permission and pulls from this given action
     * @param parent
     * @param role
     * @param action
     * @returns {Promise<*>}
     */
    async deleteAction(parent, { role, action }) {
      const roleDoc = await PermissionModel.findOne({ role });
      roleDoc.actions.pull(action);
      return roleDoc.save();
    },
  },
};
