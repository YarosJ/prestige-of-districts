import { Permission, PermissionModel } from '../../../models/Permission';

/**
 * Permissions resolver.
 * Accepts input and converts it to commands for the permissions model.
 */

const permissionResolver = {
  Query: {

    /**
     * Returns all roles
     */

    roles(): Promise <Permission[]> {
      return PermissionModel.find({}).exec();
    },

    /**
     * Returns permission by role
     */

    actions(parent, { role }): Promise <Permission> {
      return PermissionModel.findOne({ role }).exec();
    },
  },

  Mutation: {

    /**
     * Creates new permission by role and actions
     */

    async addRole(parent, { role, actions }): Promise <Permission> {
      const roleDoc = new PermissionModel({ role, actions });
      return roleDoc.save();
    },

    /**
     * Finds permission and pushes into this new action
     */

    async addAction(parent, { role, action }): Promise <Permission> {
      const roleDoc = await PermissionModel.findOne({ role });
      return PermissionModel.findOneAndUpdate({ role }, {
        actions: [...roleDoc.actions, action],
      }, { new: true });
    },

    /**
     * Deletes permission by given role
     */

    async deleteRole(parent, { role }): Promise <Permission> {
      const roleDoc = await PermissionModel.findOne({ role });
      roleDoc.remove();
      return roleDoc;
    },

    /**
     * Finds permission and pulls from this given action
     */

    async deleteAction(parent, { role, action }): Promise <Permission> {
      const roleDoc = await PermissionModel.findOne({ role });
      return PermissionModel.findOneAndUpdate({ role }, {
        actions: roleDoc.actions.filter((a): boolean => a !== action),
      }, { new: true });
    },
  },
};

export default permissionResolver;
