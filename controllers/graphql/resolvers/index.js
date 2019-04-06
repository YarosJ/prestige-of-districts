import taskResolvers from './task';
import failureResolvers from './failure';
import messageResolvers from './message';
import permissionResolvers from './permission';
import userResolvers from './user';
import total from './total';

export default [
  taskResolvers,
  failureResolvers,
  messageResolvers,
  permissionResolvers,
  userResolvers,
  total,
];
