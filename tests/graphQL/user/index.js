import { describe } from 'mocha';
import asUser from './asUser';
import asAdmin from './asAdmin';

export default async ({ query, mutate }) => {

  describe('user.ts.ts', async () => {
    await asUser({ query, mutate });
    await asAdmin({ query, mutate });
  });
};
