import L from 'leaflet';
import React from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import markers from './markers.json';

const TOKEN = 'pk.eyJ1IjoieWFyb3NsYXciLCJhIjoiY2pqemJmYXJ2MWpnajNwbWt3NnB4NzhwMSJ9.ahTtWLV7SgP1rLtTJYSx2A';

class MapBx extends React.Component {
  constructor(props) {
    super(props);
    this.leafMap = React.createRef();
  }

  componentDidMount() {
    const map = this.leafMap.current.contextValue.map;
    map.on('moveend', function() {
      console.log(map.getBounds());
    });
  }

  render() {
    return (
      <Map className="markercluster-map" center={[51.0, 19.0]} zoom={4} maxZoom={18}
           style={{
             height: '100%',
             width: '100%',
           }}
           ref={this.leafMap}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=${TOKEN}`}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <MarkerClusterGroup>
          {markers.map((mx, key)=>
            <Marker key={key} position={[mx.latitude, mx.longitude]} icon={ L.icon({
              iconUrl: `./icons/${mx.icon}.png`,
              iconSize: [40, 40],
              iconAnchor: [20, 40],
            })} />
          )}
        </MarkerClusterGroup>
      </Map>
    );
  }
}

export default MapBx;
