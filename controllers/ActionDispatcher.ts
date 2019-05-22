import sanitizeLocation from '../helpers/geolocation/sanitizeLocation';
import failureResolvers from './graphql/resolvers/failure';
import messageResolvers from './graphql/resolvers/message';

const { addFailure } = failureResolvers.Mutation;
const { addMessage } = messageResolvers.Mutation;

class ActionDispatcher {
  // Directing actions
  public static actions = {
    FAULT: addFailure,
    TOXIC: addFailure,
    REPAIR: addMessage,
    INFO: addMessage,
    default: (): void => undefined,
  };

  /**
   * Dispatches action depending on the action type
   */

  public static dispatch(action): void {
    const entities: string[] = Object.keys(action.payload.entities);
    const sanitizedLocations: string[] = entities.map((e): string => sanitizeLocation(e));
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

    (this.actions[action.type] || this.actions.default)(null, args);
  }
}

export default ActionDispatcher;
