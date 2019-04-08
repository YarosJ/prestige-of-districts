/* global document */
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import InputRange from 'react-input-range';
import { GET_FAILURE } from '../../../constants/queries';
import Loading from '../../Loading/index';
import 'mapbox-gl/dist/mapbox-gl.css';
import Cluster from './Cluster';

export default class Map extends Component {
  state = {
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

  render() {
    const { state } = this;
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
            value={state.rangeValue}
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

            return (<Cluster data={failures} />);
          }}
        </Query>
      </div>
    );
  }
}
