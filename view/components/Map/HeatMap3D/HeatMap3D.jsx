/* global window */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { StaticMap } from 'react-map-gl';
import DeckGL, { HexagonLayer } from 'deck.gl';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { failuresPropTypes } from '../../../constants/propTypes';
import { GET_FAILURES } from '../../../constants/queries';
import Loading from '../../Loading/index';
import ChooseService from '../../../helpers/ChooseService';
import config from '../../../config.json';

export const INITIAL_VIEW_STATE = {
  latitude: 48.74877,
  longitude: 37.49276,
  zoom: 11,
  minZoom: 5,
  maxZoom: 15,
  pitch: 60,
  bearing: -50,
};

const LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2,
};

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78],
];

const elevationScale = { min: 1, max: 50 };

class HeatMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elevationScale: elevationScale.min,
      services: ['WATER', 'ELECTRO'],
    };

    this.startAnimationTimer = null;
    this.intervalTimer = null;

    this.startAnimate = this.startAnimate.bind(this);
    this.animateHeight = this.animateHeight.bind(this);
  }

  componentDidMount() {
    this.animate();
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    const { props } = this;

    if (data && props.data && data.length !== props.data.length) {
      this.animate();
    }
  }

  componentWillUnmount() {
    this.stopAnimate();
  }

  handleServiceChange = (e, { value }) => this.setState({ services: value });

  animate() {
    this.stopAnimate();

    // wait 1.5 secs to start animation so that all data are loaded
    this.startAnimationTimer = window.setTimeout(this.startAnimate, 1500);
  }

  startAnimate() {
    this.intervalTimer = window.setInterval(this.animateHeight, 20);
  }

  stopAnimate() {
    window.clearTimeout(this.startAnimationTimer);
    window.clearTimeout(this.intervalTimer);
  }

  animateHeight() {
    const { state } = this;
    if (state.elevationScale === elevationScale.max) {
      this.stopAnimate();
    } else {
      this.setState({ elevationScale: state.elevationScale + 1 });
    }
  }

  renderLayers(data) {
    const {
      radius, upperPercentile, coverage, onHover,
    } = this.props;
    const { state } = this;

    return [
      new HexagonLayer({
        id: 'heatmap',
        colorRange,
        coverage,
        data,
        elevationRange: [0, 30],
        elevationScale: state.elevationScale,
        extruded: true,
        getPosition: d => d,
        lightSettings: LIGHT_SETTINGS,
        onHover,
        opacity: 0.5,
        pickable: Boolean(onHover),
        radius,
        upperPercentile,
      }),
    ];
  }

  render() {
    const { services } = this.state;
    const { viewState, controller, baseMap } = this.props;

    return (
      <Query
        query={GET_FAILURES}
        variables={{ services }}
      >
        {({ data, loading }) => {
          const { failures } = data;
          if (loading || !failures) {
            return <Loading />;
          }
          const fData = failures.map(failure => failure.locations.map(loc => (
            [loc.longitude, loc.latitude]
          ))).flat();

          return (
            <div>
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
              <DeckGL
                layers={this.renderLayers(fData)}
                initialViewState={INITIAL_VIEW_STATE}
                viewState={viewState}
                controller={controller}
              >
                {baseMap && (
                <StaticMap
                  reuseMaps
                  mapStyle={config.mapboxgl.styles.heatmap3D}
                  preventStyleDiffing
                  mapboxApiAccessToken={config.mapboxgl.accessToken}
                />
                )}
              </DeckGL>
            </div>
          );
        }}
      </Query>
    );
  }
}

HeatMap.propTypes = {
  data: failuresPropTypes,
  radius: PropTypes.number,
  upperPercentile: PropTypes.number,
  coverage: PropTypes.number,
  onHover: PropTypes.func,
  viewState: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    zoom: PropTypes.number,
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    pitch: PropTypes.number,
    bearing: PropTypes.number,
  }),
  controller: PropTypes.bool,
  baseMap: PropTypes.bool,
};

HeatMap.defaultProps = {
  data: [],
  radius: 500,
  upperPercentile: 100,
  coverage: 1,
  onHover: null,
  viewState: null,
  controller: true,
  baseMap: true,
};

export default HeatMap;
