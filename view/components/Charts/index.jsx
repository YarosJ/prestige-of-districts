import React, { Component } from 'react';
import 'react-input-range/lib/css/index.css';
import { Query } from 'react-apollo';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { GET_FAILURE } from '../../constants/queries';
import Loading from '../Loading/index';
import ChooseService from '../../helpers/ChooseService';

export default class Charts extends Component {
  state = {
    services: [],
  };

  handleServiceChange = (e, { value }) => this.setState({ services: value });

  render() {
    const { services } = this.state;

    return (
      <Query query={GET_FAILURE} variables={{ services }}>
        {({ loading, error, data }) => {
          const { failures } = data;
          if (loading || !failures) {
            return <Loading />;
          }
          if (error) return `Error! ${error.message}`;

          return (
            <div style={{
              width: '100%',
              height: '100%',
              paddingBottom: '100px',
              paddingTop: '10px',
              textAlign: 'center',
            }}
            >
              <ChooseService
                handleChange={this.handleServiceChange}
                value={services}
                style={{ marginBottom: '15px' }}
              />
              <ResponsiveContainer style={{ background: '#202122' }}>
                <LineChart
                  width={730}
                  height={250}
                  data={failures.map((failure) => {
                    const date = Date.parse(failure.happenedAt);
                    const similar = failures
                      .filter(f => (Math.abs(Date.parse(f.happenedAt) - date) < 86300000));
                    return ({
                      name: new Date(date).toDateString(),
                      uv: similar.length,
                    });
                  })}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          );
        }}
      </Query>
    );
  }
}
