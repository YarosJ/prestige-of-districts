import accessControl from './accessControl';
import admin from './admin';
import failures from './failures';

export default async () => {
  const { permanentSeed } = process.env;
  if (process.env.seedAccessControl) accessControl(permanentSeed);
  if (process.env.seedAdmin) admin(permanentSeed);
  if (process.env.seedFailures) failures();
};
