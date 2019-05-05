import React, { Component } from 'react';
import { Query } from 'react-apollo';
import moment from 'moment';
import DateRange from '../DateRange';
import { GET_FAILURES } from '../../../constants/queries';
import Loading from '../../Loading/index';
import 'mapbox-gl/dist/mapbox-gl.css';
import Cluster from './Cluster';
import ChooseService from '../../../helpers/ChooseService';

export default class Map extends Component {
  state = {
    rangeValue: {
      min: 2012,
      max: new Date().getFullYear(),
    },
    services: ['WATER', 'ELECTRO'],
  };

  handleServiceChange = (e, { value }) => this.setState({ services: value });

  render() {
    const { state } = this;
    const { services, rangeValue } = state;

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
          <DateRange
            initMax={rangeValue.max}
            initMin={rangeValue.min}
            handleChange={value => this.setState({ rangeValue: value })}
          />
        </div>
        <Query
          query={GET_FAILURES}
          variables={{
            services,
            dateRange: {
              maxDate: moment([rangeValue.max])
                .add(1, 'year')
                .subtract(1, 'days'),
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
