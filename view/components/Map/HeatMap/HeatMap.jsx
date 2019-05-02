import React, { Component } from 'react';
import MapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Query } from 'react-apollo';
import mapboxgl from 'mapbox-gl';
import Loading from '../../Loading/index';
import { GET_FAILURE } from '../../../constants/queries';
import heatmapLayer from './heatmapLayer';
import ChooseService from '../../../helpers/ChooseService';
import DateRange from '../DateRange';

const HEATMAP_SOURCE_ID = 'failures';
const MAPBOX_TOKEN = 'pk.eyJ1IjoieWFyb3NsYXciLCJhIjoiY2pqemJmYXJ2MWpnajNwbWt3NnB4NzhwMSJ9.ahTtWLV7SgP1rLtTJYSx2A';

export default class Map extends Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 48.74877,
      longitude: 37.49276,
      zoom: 14,
    },
    rangeValue: {
      min: 2012,
      max: 2017,
    },
    services: ['WATER', 'ELECTRO'],
  };

  mapRef = React.createRef();

  getMap = () => (this.mapRef.current ? this.mapRef.current.getMap() : null);

  handleServiceChange = (e, { value }) => this.setState({ services: value });

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

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl(), 'top-left');

    // Add geolocate control to the map.
    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    }), 'top-left');
  };

  render() {
    const { state } = this;
    const { rangeValue, viewport, services } = state;

    return (
      <div style={{
        height: '100%',
        width: '100%',
      }}
      >
        <ChooseService
          multiple
          handleChange={this.handleServiceChange}
          value={services}
          style={{
            transform: 'translateX(-48%)',
            left: '51%',
            top: '20px',
            position: 'fixed',
            zIndex: 10,
          }}
        />
        <div style={{
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-45%)',
          width: '70%',
          bottom: '70px',
          zIndex: 500,
        }}
        >
          <DateRange handleChange={value => this.setState({ rangeValue: value })} />
        </div>
        <Query
          query={GET_FAILURE}
          variables={{
            services,
            dateRange: {
              maxDate: rangeValue.max,
              minDate: rangeValue.min,
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
                mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
                mapboxApiAccessToken={MAPBOX_TOKEN}
                onLoad={() => this.handleMapLoaded(failures)}
                onViewportChange={v => this.setState({ viewport: v })}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}
