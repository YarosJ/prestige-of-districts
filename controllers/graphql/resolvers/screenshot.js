import { PubSub } from 'apollo-server-express';
import { makeScreenshot } from 'crossdomain-selector';

const pubSub = new PubSub();

export default {
  Query: {
    async screenshot(parent, { URL }) {
      const result = { resultData: await makeScreenshot({ site: URL, docker: true }), URL };
      pubSub.publish('SCREENSHOT_RECEIVED', { screenshotReceived: result });
      return result;
    },
  },
  Subscription: {
    screenshotReceived: {
      subscribe: () => pubSub.asyncIterator(['SCREENSHOT_RECEIVED']),
    },
  },
};
