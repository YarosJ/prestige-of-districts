import NodeGeocoder from 'node-geocoder';
import replaceAbbreviations from './replaceAbbreviations';
import config from '../../config/config';

// Get default configs
const { defaultCity, defaultCountry } = config.geolocation;
const configGeocoders = config.geolocation.geocoders;

// initialize NodeGeocoders
const geocoders = configGeocoders.map((_, index) => NodeGeocoder(configGeocoders[index]));

/**
 * Geocode given locations
 * @param places
 * @param country
 * @param city
 * @returns {Promise<Array>}
 */
export default async function (places, country = defaultCountry, city = defaultCity) {
  let parentLoc = await geocoders[0].geocode(`${country} ${city}`);
  parentLoc = [{ ...parentLoc[0], locType: 'text' }];
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
        result.push({ place, ...geoLocated[0], locType: 'point' });
        push = false;
      }
    }));
  }));
  return (result.length > 0 ? result : parentLoc);
}
