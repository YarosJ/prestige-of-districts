import NodeGeocoder from 'node-geocoder';
import replaceAbbreviations from './replaceAbbreviations';
import config from '../../config/config';

// initialize NodeGeocoders
const geocoders = config.geocoders.map((_, index) => NodeGeocoder(config.geocoders[index]));

/**
 * Geocode given locations
 * @param places
 * @param country
 * @param city
 * @returns {Promise<Array>}
 */
export default async function (places, country = '', city = '') {
  const parentLoc = await geocoders[0].geocode(`${country} ${city}`);
  if (!places) return parentLoc;
  const { latitude, longitude } = parentLoc[0];
  const result = [];
  await Promise.all(places.map(async (place) => {
    const fullNamedPlace = replaceAbbreviations(place);
    let push = true;
    await Promise.all(geocoders.map(async (geocoder) => {
      const geoLocated = await geocoder.geocode(`${fullNamedPlace}, ${city}, ${country}`);
      if (push && geoLocated.length !== 0
          && geoLocated[0].latitude !== latitude
          && geoLocated[0].longitude !== longitude) {
        result.push({ place, ...geoLocated[0] });
        push = false;
      }
    }));
  }));
  return result;
}
