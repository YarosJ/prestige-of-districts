import sanitizeLocation from '../helpers/geolocation/sanitizeLocation';
import failureResolvers from './graphql/resolvers/failure';
import messageResolvers from './graphql/resolvers/message';

/**
 * ActionDispatcher static class
 * dispatch actions
 */
export default class ActionDispatcher {
  // Directing actions
  static actions = {
    FAULT: failureResolvers.Mutation.addFailure,
    TOXIC: failureResolvers.Mutation.addFailure,
    REPAIR: messageResolvers.Mutation.addMessage,
    INFO: messageResolvers.Mutation.addMessage,
    default: () => null, // Unexpected action
  };

  /**
   * Dispatcher method
   * @param action
   * @returns {*|void}
   */
  static dispatch(action) {
    const entities = Object.keys(action.payload.entities);
    const sanitizedLocations = entities.map(e => sanitizeLocation(e));
    const args = {
      country: action.payload.country,
      city: action.payload.city,
      locations: sanitizedLocations,
      failureType: action.type,
      service: action.payload.service,
      text: action.payload.text,
    };
    return ((this.actions[action.type] || this.actions.default)(null, args));
  }
}
