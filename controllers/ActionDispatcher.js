import sanitizeLocation from '../helpers/geolocation/sanitizeLocation';
import failureResolvers from './graphql/resolvers/failure';
import messageResolvers from './graphql/resolvers/message';

const { addFailure } = failureResolvers.Mutation;
const { addMessage } = messageResolvers.Mutation;

export default class ActionDispatcher {
  // Directing actions
  static actions = {
    FAULT: addFailure,
    TOXIC: addFailure,
    REPAIR: addMessage,
    INFO: addMessage,
    default: () => null, // Unexpected action
  };

  /**
   * Dispatcher method, dispatches action
   * @param action
   * @returns {*|void}
   */
  static dispatch(action) {
    const entities = Object.keys(action.payload.entities);
    const sanitizedLocations = entities.map(e => sanitizeLocation(e));
    const {
      country, city, service, text, date,
    } = action.payload;
    const args = {
      country,
      city,
      locations: sanitizedLocations,
      failureType: action.type,
      service,
      text,
      date,
    };

    return ((this.actions[action.type] || this.actions.default)(null, args));
  }
}
