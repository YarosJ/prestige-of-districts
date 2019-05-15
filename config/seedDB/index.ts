import accessControl from './accessControl.ts';
import admin from './admin.ts';
import failures from './failures.ts';

export default async (): Promise <void> => {
  const { permanentSeed } = process.env;
  const isPermanent: boolean = (permanentSeed === 'true');

  if (process.env.seedAccessControl === 'true') accessControl(isPermanent);
  if (process.env.seedAdmin === 'true') admin(isPermanent);
  if (process.env.seedFailures === 'true') failures();
};
