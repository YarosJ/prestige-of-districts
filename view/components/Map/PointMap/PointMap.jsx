import React, { Component } from 'react';
import { Query } from 'react-apollo';
import InputRange from 'react-input-range';
import { GET_FAILURE } from '../../../constants/queries';
import Loading from '../../Loading/index';
import 'mapbox-gl/dist/mapbox-gl.css';
import Cluster from './Cluster';
import ChooseService from '../../../helpers/ChooseService';

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
    services: ['WATER', 'ELECTRO'],
  };

  handleServiceChange = (e, { value }) => this.setState({ services: value });

  render() {
    const { state } = this;
    const { services, locRange, rangeValue } = state;

    return (
      <div style={{
        height: '100%',
        width: '100%',
      }}
      >
        <ChooseService
          handleChange={this.handleServiceChange}
          value={services}
          style={{
            transform: 'translateX(-60%)',
            left: '51%',
            top: '20px',
            position: 'fixed',
            zIndex: 10,
          }}
        />
        <div style={{
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-55%)',
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
            onChangeComplete={() => console.log(state)}
            interactive
          />
        </div>
        <Query
          query={GET_FAILURE}
          variables={{
            services,
            locRange,
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

            return (<Cluster data={failures} />);
          }}
        </Query>
      </div>
    );
  }
}
