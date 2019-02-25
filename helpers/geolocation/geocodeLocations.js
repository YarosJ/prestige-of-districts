import NodeGeocoder from 'node-geocoder';
import replaceAbbreviations from './replaceAbbreviations';
import config from '../../config/config';

// initialize NodeGeocoder
const geocoder1 = NodeGeocoder(config.geocoders[0]);
const geocoder2 = NodeGeocoder(config.geocoders[1]);

/**
 * Geocode given locations
 * @param places
 * @param country
 * @param city
 * @returns {Promise<Array>}
 */
export default async function (places, country = '', city = '') {
  const parentLoc = await geocoder1.geocode(`${country} ${city}`);
  if (!places) return parentLoc;
  const { latitude, longitude } = parentLoc[0];
  const result = [];
  await Promise.all(places.map(async (place) => {
    const fullNamedPlace = replaceAbbreviations(place);
    let geoLocated = await geocoder1.geocode(`${fullNamedPlace}, ${city}, ${country}`);
    if (geoLocated.length === 0) geoLocated = await geocoder2.geocode(`${fullNamedPlace}, ${city}, ${country}`);
    if (geoLocated.length === 0) return;
    if (geoLocated[0].latitude !== latitude && geoLocated[0].longitude !== longitude) {
      result.push({ place, latitude: geoLocated[0].latitude, longitude: geoLocated[0].longitude });
    }
  }));
  return result;
}
