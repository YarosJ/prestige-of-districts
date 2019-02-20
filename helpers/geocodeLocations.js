import NodeGeocoder from 'node-geocoder';

// initialize NodeGeocoder
const geocoder = NodeGeocoder({
  provider: 'here',
  appId: 'vO6SCvegx2409pUQJAXd', // from config
  appCode: 'E4vgG5Zn2XY5m_HNdX1AnQ',
});

/**
 * Geocode given locations
 * @param places
 * @param parentLocation
 * @returns {Promise<Array>}
 */
export default async function (places, parentLocation = '') {
  const parentLoc = await geocoder.geocode(parentLocation);
  const { latitude, longitude } = parentLoc[0];
  const result = [];
  await Promise.all(places.map(async (place) => {
    const geoLocated = await geocoder.geocode(place + parentLocation);
    await Promise.all(geoLocated.map(async (loc) => {
      if (loc.latitude !== latitude && loc.longitude !== longitude) result.push(loc);
    }));
  }));
  return result;
}
