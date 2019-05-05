import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import config from '../../../config.json';

class Cluster extends Component {
  mapRef = React.createRef();

  componentDidMount() {
    const { data } = this.props;
    const featuresData = data.map(failure => failure.locations.map(loc => ({
      type: 'Feature',
      properties: { mag: 5, failureType: failure.failureType, text: failure.text },
      geometry: {
        type: 'Point',
        coordinates: [loc.longitude, loc.latitude],
      },
    }))).flat();

    mapboxgl.accessToken = config.mapboxgl.accessToken;
    const map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: config.mapboxgl.styles.pointmap,
      center: [37.49276, 48.74877],
      zoom: 14,
    });

    map.on('load', () => {
      // Add a new source from our GeoJSON data and set the
      // 'cluster' option to true. GL-JS will add the point_count property to your source data.
      map.addSource(
        'earthquakes',
        {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: featuresData },
          cluster: true,
          clusterMaxZoom: 14, // Max zoom to cluster points on
          clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
        },
      );
      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            10,
            '#f1f075',
            50,
            '#f28cb1',
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      });

      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
        },
      });

      map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'earthquakes',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#da1d06',
          'circle-radius': 6,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        },
      });

      // inspect a cluster on click
      map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('earthquakes')
          .getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom,
            });
          });
      });

      map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
      });
      map.on('mouseenter', 'unclustered-point', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'unclustered-point', () => {
        map.getCanvas().style.cursor = '';
      });

      map.on('click', (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: ['unclustered-point'] });
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

        if (!features.length) {
          return;
        }

        const feature = features[0];

        // Populate the popup and set its coordinates
        // based on the feature found.
        new mapboxgl.Popup()
          .setLngLat(feature.geometry.coordinates)
          .setHTML(`
              <div style="max-width: 400px">
                <p>${feature.properties.failureType}</p>
                <p>${feature.properties.text}</p>
              </div>
          `).addTo(map);
      });

      // Add zoom and rotation controls to the map.
      map.addControl(new mapboxgl.NavigationControl(), 'top-left');

      // Add geolocate control to the map.
      map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }), 'top-left');
    });
  }

  render() {
    return (<div ref={this.mapRef} style={{ width: '100%', height: '96%' }} />);
  }
}

export default Cluster;
