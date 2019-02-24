import NodeGeocoder from 'node-geocoder';
import replaceAbbreviations from './replaceAbbreviations';
import config from '../../config/config';

// initialize NodeGeocoder
const geocoder = NodeGeocoder(config.geocoder);

/**
 * Geocode given locations
 * @param places
 * @param country
 * @param city
 * @returns {Promise<Array>}
 */
export default async function (places, country = '', city = '') {
  const parentLoc = await geocoder.geocode(`${country} ${city}`);
  if (!places) return parentLoc;
  const { latitude, longitude } = parentLoc[0];
  const result = [];
  await Promise.all(places.map(async (place) => {
    const fullNamedPlace = replaceAbbreviations(place);
    const geoLocated = await geocoder.geocode({ address: `${fullNamedPlace}, ${city}`, country });
    await Promise.all(geoLocated.map(async (loc) => {
      if (loc.latitude !== latitude && loc.longitude !== longitude) result.push(loc);
    }));
  }));
  return result;
}
