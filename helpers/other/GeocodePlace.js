import NodeGeocoder from 'node-geocoder';

const geocoder = NodeGeocoder({
  provider: 'here',
  appId: 'vO6SCvegx2409pUQJAXd',
  appCode: 'E4vgG5Zn2XY5m_HNdX1AnQ',
});

export default async function (place) {
  return await geocoder.geocode(place);
}
