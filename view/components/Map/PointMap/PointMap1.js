/* global document */
import React, { Component } from 'react';
import MapGL, {
  NavigationControl, GeolocateControl, FullscreenControl,
} from 'react-map-gl';
import { Query } from 'react-apollo';
import InputRange from 'react-input-range';
import mapboxgl from 'mapbox-gl';
import { GET_FAILURE } from '../../../constants/queries';
import Loading from '../../Loading/index';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoieWFyb3NsYXciLCJhIjoiY2pqemJmYXJ2MWpnajNwbWt3NnB4NzhwMSJ9.ahTtWLV7SgP1rLtTJYSx2A';

export default class Map extends Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 48.74877,
      longitude: 37.49276,
      zoom: 13,
    },
    popupInfo: null,
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

  _updateViewport = (viewport) => {
    this.setState({ viewport });
  };

  handleMapClick = (e) => {
    const map = this.getMap();
    const features = map.queryRenderedFeatures(e.point, {
      layers: ['unclustered-points'],
    });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

    if (!features.length) {
      return;
    }

    const feature = features[0];

    // Populate the popup and set its coordinates
    // based on the feature found.
    new mapboxgl.Popup()
      .setLngLat(feature.geometry.coordinates)
      .setHTML(`<b>Props:</b> ${feature.properties.toString()}<br />`)
      .addTo(map);
  };

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

    // Add a new source from our GeoJSON data and set the
    // 'cluster' option to true.
    map.addSource('earthquakes', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features },
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
    });

    // Use the earthquakes source to create five layers:
    // One for unclustered points, three for each cluster category,
    // and one for cluster labels.
    map.addLayer({
      id: 'unclustered-points',
      type: 'symbol',
      source: 'earthquakes',
      filter: ['!has', 'point_count'],
      layout: {
        'icon-image': 'marker-15',
      },
    });
    // Display the earthquake data in three layers, each filtered to a range of
    // count values. Each range gets a different fill color.
    const layers = [
      [20, '#f28cb1'],
      [10, '#f1f075'],
      [0, '#51bbd6'],
    ];

    layers.forEach((layer, i) => {
      map.addLayer({
        id: `cluster-${i}`,
        type: 'circle',
        source: 'earthquakes',
        paint: {
          'circle-color': layer[1],
          'circle-radius': 18,
        },
        filter: i === 0 ? ['>=', 'point_count', layer[0]] : ['all', ['>=', 'point_count', layer[0]],
          ['<', 'point_count', layers[i - 1][0]],
        ],
      });
    });

    // Add a layer for the clusters' count labels
    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'earthquakes',
      layout: {
        'text-field': '{point_count}',
        'text-font': [
          'DIN Offc Pro Medium',
          'Arial Unicode MS Bold',
        ],
        'text-size': 12,
      },
    });

    /**
     * ========== MOUSE =============
     */

    map.on('mouseenter', 'cluster-count', () => {
      console.log('34535');
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'cluster-count', () => {
      map.getCanvas().style.cursor = '';
    });

    map.on('click', 'cluster-count', (e) => {
      console.log('---------000');
      const features1 = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
      const clusterId = features1[0].properties.cluster_id;
      map.getSource('earthquakes').getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return;

        map.easeTo({
          center: features1[0].geometry.coordinates,
          zoom,
        });
      });
    });
    /**
     * ========== MOUSE =============
     */
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
            interactive
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
                mapStyle="mapbox://styles/mapbox/dark-v10"
                mapboxApiAccessToken={MAPBOX_TOKEN}
                onLoad={() => this.handleMapLoaded(failures)}
                onClick={this.handleMapClick}
                onViewportChange={this._updateViewport}
              >
                <div style={{ position: 'absolute', left: '7px' }}>
                  <NavigationControl onViewportChange={this._updateViewport} />
                  <GeolocateControl
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation
                    onViewportChange={this._updateViewport}
                  />
                  {/*<FullscreenControl container={document.querySelector('body')} />*/}
                </div>
              </MapGL>
            );
          }}
        </Query>
      </div>
    );
  }
}
