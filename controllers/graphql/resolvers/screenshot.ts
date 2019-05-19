import { PubSub } from 'apollo-server-express';
import { makeScreenshot } from 'crossdomain-selector';
import { HexBase64BinaryEncoding } from 'crypto';

const pubSub = new PubSub();

interface Screenshot {
  resultData: HexBase64BinaryEncoding;
  URL: string;
}

export default {
  Query: {

    /**
     * Returns screenshot of site by given URL in Base64 encoding
     */

    async screenshot(parent, { URL }): Promise <Screenshot> {
      const result: Screenshot = {
        resultData: await makeScreenshot({ site: URL, docker: true }),
        URL,
      };
      pubSub.publish('SCREENSHOT_RECEIVED', { screenshotReceived: result });

      return result;
    },
  },

  Subscription: {

    /**
     * Subscription (uses websocket) because this operation can be too much long
     */

    screenshotReceived: {
      subscribe: (): AsyncIterator <symbol> => pubSub.asyncIterator(['SCREENSHOT_RECEIVED']),
    },
  },
};
