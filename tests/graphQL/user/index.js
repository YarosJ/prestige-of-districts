import { describe } from 'mocha';
import asUser from './asUser';
import asAdmin from './asAdmin';

export default async ({ query, mutate }) => {

  describe('user', async () => {
    await asUser({ query, mutate });
    await asAdmin({ query, mutate });
  });
};
