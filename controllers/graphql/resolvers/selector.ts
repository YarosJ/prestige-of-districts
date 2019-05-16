import { PubSub } from 'apollo-server-express';
import { getSelector } from 'crossdomain-selector';

const pubSub = new PubSub();

interface Selector {
  resultSelector: string;
  URL: string;
}

export default {
  Query: {
    async selector(parent, { URL, x, y }): Promise <Selector> {
      const result = {
        resultSelector: await getSelector({
          site: URL,
          coordinates: [x, y],
          docker: true,
        }),
        URL,
      };
      pubSub.publish('SELECTOR_RECEIVED', { selectorReceived: result });
      return result;
    },
  },
  Subscription: {
    selectorReceived: {
      subscribe: (): AsyncIterator <symbol> => pubSub.asyncIterator(['SELECTOR_RECEIVED']),
    },
  },
};
