import { PubSub } from 'apollo-server-express';
import { getSelector } from 'crossdomain-selector';

const pubSub = new PubSub();

export default {
  Query: {
    async selector(parent, { URL, x, y }) {
      const result = {
        resultSelector: await getSelector(URL, [x, y]),
        URL,
      };
      pubSub.publish('SELECTOR_RECEIVED', { selectorReceived: result });
      return result;
    },
  },
  Subscription: {
    selectorReceived: {
      subscribe: () => pubSub.asyncIterator(['SELECTOR_RECEIVED']),
    },
  },
};
