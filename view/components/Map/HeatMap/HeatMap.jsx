/* global navigator */
import React, { Component } from 'react';
import MapGL, {NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Query } from 'react-apollo';
import { Icon } from 'semantic-ui-react';
import InputRange from 'react-input-range';
import posed from 'react-pose';
import Loading from '../../Loading/index';
import { GET_FAILURE } from '../../../constants/queries';
import heatmapLayer from './heatmapLayer';

const HEATMAP_SOURCE_ID = 'failures';
const MAPBOX_TOKEN = 'pk.eyJ1IjoieWFyb3NsYXciLCJhIjoiY2pqemJmYXJ2MWpnajNwbWt3NnB4NzhwMSJ9.ahTtWLV7SgP1rLtTJYSx2A';

const Hoverable = posed.div({
  hoverable: true,
  pressable: true,
  init: { scale: 1, opacity: 0.7 },
  hover: { opacity: 1 },
  press: { scale: 0.8 },
});

export default class Map extends Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 48.74877,
      longitude: 37.49276,
      zoom: 13,
    },
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

  mapRef = React.createRef();

  getMap = () => (this.mapRef.current ? this.mapRef.current.getMap() : null);

  handleMapLoaded = (failures) => {
    const features = failures.map(failure => failure.locations.map(loc => ({
      type: 'Feature',
      properties: { mag: 5 },
      geometry: {
        type: 'Point',
        coordinates: [loc.longitude, loc.latitude],
      },
    }))).flat();
    const map = this.getMap();
    map.addSource(HEATMAP_SOURCE_ID, { type: 'geojson', data: { type: 'FeatureCollection', features } });
    map.addLayer(heatmapLayer('heatmap-layer', HEATMAP_SOURCE_ID));
  };

  render() {
    const { state } = this;
    const { rangeValue, viewport } = state;

    return (
      <div style={{
        height: '100%',
        width: '100%',
      }}
      >
        <div style={{
          position: 'fixed',
          left: '50px',
          top: '32px',
          zIndex: 500,
        }}
        >
          <Hoverable>
            <Icon
              name="crosshairs"
              color="pink"
              style={{ fontSize: '40px', cursor: 'pointer' }}
              onClick={() => navigator.geolocation.getCurrentPosition((position) => {
                const { longitude, latitude } = position.coords;
                this.setState({
                  viewport: {
                    latitude,
                    longitude,
                    zoom: 13,
                  },
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
        <Query
          query={GET_FAILURE}
          variables={{
            locRange: state.locRange,
            dateRange: {
              maxDate: state.rangeValue.max,
              minDate: state.rangeValue.min,
            },
          }}
        >
          {({ data, loading }) => {
            const { failures } = data;
            if (loading || !failures) {
              return <Loading />;
            }

            return (
              <MapGL
                {...viewport}
                ref={this.mapRef}
                width="100%"
                height="100%"
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxApiAccessToken={MAPBOX_TOKEN}
                onLoad={() => this.handleMapLoaded(failures)}
                onViewportChange={v => this.setState({ viewport: v })}
              >
                <div style={{ position: 'absolute', left: '7px' }}>
                  <NavigationControl onViewportChange={v => this.setState({ viewport: v })} />
                </div>
              </MapGL>
            );
          }}
        </Query>
      </div>
    );
  }
}
