import NodeGeocoder from 'node-geocoder';
import axios from 'axios';
import replaceAbbreviations from './replaceAbbreviations';
import config from '../../config/config';

// Get default configs
const { defaultCity, defaultCountry } = config.geolocation;
const configGeocoders = config.geolocation.geocoders;

/**
 * Geocode place using here API
 * @param place
 * @param city
 * @param country
 * @returns {Promise<{parentLoc: {latitude, longitude}, locations: Array}|{parentLoc: {latitude, longitude}, locations: *}>}
 */
const hereGeocoder = async ({ place, city, country }) => {
  const geocoder = NodeGeocoder({ provider: 'here', ...configGeocoders.here });
  const parentPlaceString = `${country} ${city}`;
  const parentPlace = await geocoder.geocode(parentPlaceString);
  const { latitude, longitude } = parentPlace[0];
  const data = await geocoder.geocode(`${place}, ${parentPlaceString}`);
  if (data.length !== 0) {
    return {
      locations: data.filter(loc => loc.latitude !== latitude && loc.longitude !== longitude),
      parentLoc: { latitude, longitude },
    };
  }
  return { locations: [], parentLoc: { latitude, longitude } };
};

/**
 * Geocode place using OSM API
 * @param place
 * @param city
 * @param country
 * @returns {Promise<{parentLoc: {lon, lat}, locations: *[]}|{parentLoc: {latitude, longitude}, locations: Array}>}
 * @constructor
 */
const OSMGeocoder = async ({ place, city, country }) => {
  await new Promise(res => setTimeout(res, 4000)); // To prevent 429 (too many requests) error
  const parentLoc = await axios.get(encodeURI(`https://nominatim.openstreetmap.org/search?q=${city}, ${country}&format=json`));
  const { lat, lon } = parentLoc.data[0];
  const result = await axios.get(encodeURI(`https://nominatim.openstreetmap.org/search?q=${place}, ${city}, ${country}&format=json&polygon=1&addressdetails=1`));
  const { data } = result;
  const points = [];
  const locations = data
    .filter(loc => loc.lat !== lat && loc.lon !== lon)
    .map((loc) => {
      const { polygonpoints } = loc;
      if (polygonpoints.length > 0) {
        points.push(...polygonpoints.map(point => ({
          latitude: point[1],
          longitude: point[0],
        })));
      }
      return { latitude: loc.lat, longitude: loc.lon };
    });
  if (data.length !== 0) {
    return {
      locations: [...locations, ...points],
      parentLoc: { lat, lon },
    };
  }
  return { locations: [], parentLoc: { latitude: lat, longitude: lon } };
};

/**
 * Geocode given locations
 * @param places
 * @param country
 * @param city
 * @returns {Promise<Array>}
 */
export default async function (places, country = defaultCountry, city = defaultCity) {
  const result = [];
  await Promise.all(places.map(async (place) => {
    const fullNamedPlace = replaceAbbreviations(place);
    const geoLocatedOSM = await OSMGeocoder({
      city,
      country,
      place: fullNamedPlace,
    });
    if (geoLocatedOSM.locations.length !== 0) {
      result.push(...geoLocatedOSM.locations.map(l => ({ place, ...l, locType: 'point' })));
    } else {
      const { locations } = await hereGeocoder({
        city,
        country,
        place: fullNamedPlace,
      });
      if (locations.length > 0) {
        result.push(...locations.map(l => ({ place, ...l, locType: 'point' })));
      } else {
        result.push({
          place,
          ...geoLocatedOSM.parentLoc,
          locType: 'text',
        });
      }
    }
  }));
  return result;
}
