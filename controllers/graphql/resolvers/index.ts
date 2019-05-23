import taskResolvers from './target';
import failureResolvers from './failure';
import messageResolvers from './message';
import permissionResolvers from './permission';
import userResolvers from './user';
import screenshot from './screenshot';
import selector from './selector';
import total from './total';

/**
 * Here export resolvers for apollo server
 */

const resolvers = [
  taskResolvers,
  failureResolvers,
  messageResolvers,
  permissionResolvers,
  userResolvers,
  screenshot,
  selector,
  total,
];

export default resolvers;
