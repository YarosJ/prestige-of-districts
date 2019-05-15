import NodeGeocoder from 'node-geocoder';
import axios from 'axios';
import replaceAbbreviations from './replaceAbbreviations.ts';
import config from '../../config/config';

// Get default configs
const { defaultCity, defaultCountry } = config.geolocation;
const configGeocoders = config.geolocation.geocoders;

interface Location {
  latitude: number;
  longitude: number;
}

interface ResultLocations {
  locations?: Location[];
  parentLoc: Location;
}

interface Place {
  place: string;
  latitude: number;
  longitude: number;
  locType: string;
}

/**
 * Geocode place using here API
 */

const hereGeocoder = async ({ place, city, country }): Promise <ResultLocations> => {
  const geocoder = NodeGeocoder({ provider: 'here', ...configGeocoders.here });
  const parentPlaceString = `${country} ${city}`;
  const parentPlace = await geocoder.geocode(parentPlaceString);
  const { latitude, longitude } = parentPlace[0];
  const data = await geocoder.geocode(`${place}, ${parentPlaceString}`);

  if (data.length !== 0) {
    return {
      locations: data
        .filter((loc): boolean => loc.latitude !== latitude && loc.longitude !== longitude),
      parentLoc: { latitude, longitude },
    };
  }

  return { locations: [], parentLoc: { latitude, longitude } };
};

/**
 * Geocode place using OSM API
 */

const OSMGeocoder = async ({ place, city, country }): Promise <ResultLocations> => {
  // To prevent 429 (too many requests) error
  await new Promise((res): number => setTimeout(res, 4000));
  const parentLoc = await axios
    .get(encodeURI(`https://nominatim.openstreetmap.org/search?q=${city}, ${country}&format=json`));
  const { lat, lon } = parentLoc.data[0];
  const result = await axios
    .get(encodeURI(`https://nominatim.openstreetmap.org/search?q=${place}, ${city}, ${country}&format=json&polygon=1&addressdetails=1`));
  const { data } = result;
  const points = [];
  const locations = data
    .filter((loc): boolean => loc.lat !== lat && loc.lon !== lon)
    .map((loc): Location => {
      const { polygonpoints } = loc;

      if (polygonpoints.length > 0) {
        points.push(...polygonpoints.map((point): Location => ({
          latitude: point[1],
          longitude: point[0],
        })));
      }

      return { latitude: loc.lat, longitude: loc.lon };
    });

  if (data.length !== 0) {
    return {
      locations: [...locations, ...points],
      parentLoc: { latitude: lat, longitude: lon },
    };
  }

  return { locations: [], parentLoc: { latitude: lat, longitude: lon } };
};

/**
 * Geocode given locations
 */

export default async (places, country = defaultCountry, city = defaultCity): Promise <Place[]> => {
  const result = [];

  await Promise.all(places.map(async (place): Promise <Place[]> => {
    const fullNamedPlace = replaceAbbreviations(place);
    const geoLocatedOSM = await OSMGeocoder({
      city,
      country,
      place: fullNamedPlace,
    });

    if (geoLocatedOSM.locations.length !== 0) {
      result.push(...geoLocatedOSM.locations.map((l: Location): Place => ({ place, ...l, locType: 'point' })));
    } else {
      const { locations } = await hereGeocoder({
        city,
        country,
        place: fullNamedPlace,
      });

      if (locations.length > 0) {
        result.push(...locations.map((l: Location): Place => ({ place, ...l, locType: 'point' })));
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
};
