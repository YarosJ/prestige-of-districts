/* global window */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { StaticMap } from 'react-map-gl';
import DeckGL, { HexagonLayer } from 'deck.gl';
import { Query } from 'react-apollo';
import { GET_FAILURE } from '../../../constants/queries';
import Loading from '../../Loading/index';
import ChooseService from '../../../helpers/ChooseService';

const MAPBOX_TOKEN = 'pk.eyJ1IjoieWFyb3NsYXciLCJhIjoiY2pqemJmYXJ2MWpnajNwbWt3NnB4NzhwMSJ9.ahTtWLV7SgP1rLtTJYSx2A';

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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elevationScale: elevationScale.min,
      services: ['WATER', 'ELECTRO'],
    };

    this.startAnimationTimer = null;
    this.intervalTimer = null;

    this._startAnimate = this._startAnimate.bind(this);
    this._animateHeight = this._animateHeight.bind(this);
  }

  componentDidMount() {
    this._animate();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && this.props.data && nextProps.data.length !== this.props.data.length) {
      this._animate();
    }
  }

  componentWillUnmount() {
    this._stopAnimate();
  }

  handleServiceChange = (e, { value }) => this.setState({ services: value });

  _animate() {
    this._stopAnimate();

    // wait 1.5 secs to start animation so that all data are loaded
    this.startAnimationTimer = window.setTimeout(this._startAnimate, 1500);
  }

  _startAnimate() {
    this.intervalTimer = window.setInterval(this._animateHeight, 20);
  }

  _stopAnimate() {
    window.clearTimeout(this.startAnimationTimer);
    window.clearTimeout(this.intervalTimer);
  }

  _animateHeight() {
    if (this.state.elevationScale === elevationScale.max) {
      this._stopAnimate();
    } else {
      this.setState({ elevationScale: this.state.elevationScale + 1 });
    }
  }

  _renderLayers(data) {
    const {
      radius = 500, upperPercentile = 100, coverage = 1, onHover,
    } = this.props;

    return [
      new HexagonLayer({
        id: 'heatmap',
        colorRange,
        coverage,
        data,
        elevationRange: [0, 30],
        elevationScale: this.state.elevationScale,
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
    const { viewState, controller = true, baseMap = true } = this.props;

    return (
      <Query
        query={GET_FAILURE}
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
                layers={this._renderLayers(fData)}
                initialViewState={INITIAL_VIEW_STATE}
                viewState={viewState}
                controller={controller}
              >
                {baseMap && (
                <StaticMap
                  reuseMaps
                  mapStyle="mapbox://styles/mapbox/navigation-preview-day-v4"
                  preventStyleDiffing
                  mapboxApiAccessToken={MAPBOX_TOKEN}
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
