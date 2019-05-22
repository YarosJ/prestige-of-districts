import accessControl from './accessControl';
import admin from './admin';
import failures from './failures';

/**
 * Seed DB
 */

const seedDB = async (): Promise <void> => {
  const { permanentSeed } = process.env;
  const isPermanent: boolean = (permanentSeed === 'true');

  if (process.env.seedAccessControl === 'true') accessControl(isPermanent);
  if (process.env.seedAdmin === 'true') admin(isPermanent);
  if (process.env.seedFailures === 'true') failures();
};

export default seedDB;
