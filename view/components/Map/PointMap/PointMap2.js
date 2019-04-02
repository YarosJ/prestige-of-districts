/* global navigator */
import React, { Component } from 'react';
import MapGL, {
  NavigationControl, GeolocateControl, Marker, Popup, FullscreenControl
} from 'react-map-gl';
import { Query } from 'react-apollo';
import InputRange from 'react-input-range';
import { GET_FAILURE } from '../../../constants/queries';
import Loading from '../../Loading/index';
import PointInfo from './PointInfo';
import PointPin from './PointPin';
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

  _updateViewport = (viewport) => {
    this.setState({ viewport });
  };

  _renderMarker = (city, index) => (
    <Marker
      key={`marker-${index}`}
      longitude={city.longitude}
      latitude={city.latitude}
    >
      <PointPin size={20} onClick={() => this.setState({ popupInfo: city })} />
    </Marker>
  );

  _renderPopup() {
    const { popupInfo } = this.state;

    return popupInfo && (
      <Popup
        tipSize={5}
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        closeOnClick={false}
        onClose={() => this.setState({ popupInfo: null })}
      >
        <PointInfo info={popupInfo} />
      </Popup>
    );
  }

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
                width="100%"
                height="100%"
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxApiAccessToken={MAPBOX_TOKEN}
                onViewportChange={this._updateViewport}
              >
                {failures.map(failure => failure.locations.map((loc, key) => {
                  if (loc.locType === 'point') {
                    return (this._renderMarker(loc, key));
                  }
                }))}
                {this._renderPopup()}
                <div style={{ position: 'absolute', left: '7px' }}>
                  <NavigationControl onViewportChange={this._updateViewport} />
                  <GeolocateControl
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation
                    onViewportChange={this._updateViewport}
                  />
                  <FullscreenControl container={document.querySelector('body')}/>
                </div>
              </MapGL>
            );
          }}
        </Query>
      </div>
    );
  }
}
