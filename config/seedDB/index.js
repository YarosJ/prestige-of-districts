import accessControl from './accessControl';
import admin from './admin';
import failures from './failures';

export default async () => {
  const { permanentSeed } = process.env;
  const isPermanent = permanentSeed === 'true';

  if (process.env.seedAccessControl === 'true') accessControl(isPermanent);
  if (process.env.seedAdmin === 'true') admin(isPermanent);
  if (process.env.seedFailures === 'true') failures();
};
