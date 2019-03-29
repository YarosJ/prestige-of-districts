/* eslint-disable no-underscore-dangle */
import L from 'leaflet';
import React from 'react';
import {
  Map, Marker, TileLayer, Popup,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { Query } from 'react-apollo';
import InputRange from 'react-input-range';
import { Icon } from 'semantic-ui-react';
import posed from 'react-pose';
import { GET_FAILURE } from '../../constants/queries';
import Loading from '../Loading';

const TOKEN = 'pk.eyJ1IjoieWFyb3NsYXciLCJhIjoiY2pqemJmYXJ2MWpnajNwbWt3NnB4NzhwMSJ9.ahTtWLV7SgP1rLtTJYSx2A';

const Hoverable = posed.div({
  hoverable: true,
  pressable: true,
  init: { scale: 1 },
  hover: { scale: 1.1 },
  press: { scale: 0.8 },
});

class MapBx extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [51.0, 19.0],
      zoom: 4,
      rangeValue: {
        min: 2007,
        max: 2015,
      },
      locRange: {
        maxLatitude: 50,
        minLatitude: -50,
        maxLongitude: 50,
        minLongitude: -50,
      },
    };
    this.leafMap = React.createRef();
  }

  render() {
    const { state } = this;
    const { rangeValue, center, zoom } = state;

    return (
      <Query
        query={GET_FAILURE}
        variables={{
          locRange: state.locRange,
          dateRange: {
            maxDate: state.rangeValue.max,
            minDate: state.rangeValue.min,
          },
        }}
        onCompleted={() => {
          const { map } = this.leafMap.current.contextValue;
          map.on('moveend', () => {
            const bounds = map.getBounds();
            const resize = Math.abs(state.locRange.maxLatitude - bounds._northEast.lat) > 0.08
              || Math.abs(state.locRange.maxLongitude - bounds._northEast.lng) > 0.08;
            if (resize) {
              this.setState({
                locRange: {
                  maxLatitude: bounds._northEast.lat,
                  minLatitude: bounds._southWest.lat,
                  maxLongitude: bounds._northEast.lng,
                  minLongitude: bounds._southWest.lng,
                },
              });
            }
          });
        }}
      >
        {({ data, loading }) => {
          const { failures } = data;
          if (loading || !failures) {
            return <Loading />;
          }

          return (
            <div style={{
              height: '100%',
              width: '100%',
            }}
            >
              <div style={{
                position: 'fixed',
                left: '49px',
                top: '33px',
                zIndex: 500,
              }}
              >
                <Hoverable>
                  <Icon
                    name="map marker alternate"
                    color="pink"
                    style={{ fontSize: '40px', cursor: 'pointer' }}
                    onClick={() => navigator.geolocation.getCurrentPosition((position) => {
                      const { longitude, latitude } = position.coords;
                      this.setState({
                        center: [latitude, longitude],
                        zoom: 15,
                      });
                    })}
                  />
                </Hoverable>
              </div>
              <div style={{
                position: 'fixed',
                left: '50%',
                transform: 'translateX(-45%)',
                width: '70%',
                bottom: '70px',
                zIndex: 500,
              }}
              >
                <InputRange
                  maxValue={2019}
                  minValue={2000}
                  formatLabel={value => `${value} th`}
                  value={rangeValue}
                  onChange={value => this.setState({ rangeValue: value })}
                  onChangeComplete={() => console.log(this.state)}
                />
              </div>
              <Map
                className="markercluster-map"
                center={center}
                zoom={zoom}
                onViewportChanged={v => this.setState({ ...v })}
                maxZoom={20}
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
                  {failures.map(failure => failure.locations.map((loc, key) => {
                    if (loc.locType === 'point') {
                      return (
                        <Marker
                          key={key}
                          position={[loc.latitude, loc.longitude]}
                          icon={L.icon({
                            iconUrl: 'https://www.flaticon.com/premium-icon/icons/svg/1566/1566296.svg',
                            iconSize: [30, 30],
                            iconAnchor: [30, 30],
                          })}
                        >
                          <Popup>{failure.text}</Popup>
                        </Marker>
                      );
                    }
                  }))}
                </MarkerClusterGroup>
              </Map>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default MapBx;
