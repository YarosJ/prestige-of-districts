import geocodeLocations from './geocodeLocations';
import sanitizeLocation from './sanitizeLocation';

export default class ActionDispatcher {
  static actions = {
    FAULT: ActionDispatcher.geocodeAndSave,
    TOXIC: ActionDispatcher.geocodeAndSave,
    REPAIR: ActionDispatcher.saveMessageForUsers,
    default: () => console.log('Unexpected action'),
  };

  /**
   * Geocode and save to DB
   * @param action
   * @returns {Promise<void>}
   */
  static async geocodeAndSave(action) {
    // Geocode
    const parentLocation = action.payload.parentLocation || 'Украина, Краматорск';
    const entities = Object.keys(action.payload.entities);
    const sanitizedLocations = entities.map(e => sanitizeLocation(e));
    const geoLocations = await geocodeLocations(sanitizedLocations, parentLocation);
    // Write to DB
    console.log(action.type, action.payload.service, action.payload.text, geoLocations);
  }

  /**
   * Write new message to DB
   * @param action
   * @returns {Promise<void>}
   */
  static async saveMessageForUsers(action) {
    console.log('Message: ', action.payload.text);
  }

  /**
   * Dispatcher method
   * @param action
   * @returns {*|void}
   */
  static dispatch(action) {
    return ((this.actions[action.type] || this.actions.default)(action));
  }
}
