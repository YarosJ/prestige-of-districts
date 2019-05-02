import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush,
} from 'recharts';
import { Query } from 'react-apollo';
import { GET_FAILURE } from '../../constants/queries';
import Loading from '../Loading';

const offset = 0.5;

export default class AreaChartComponent extends PureComponent {
  render() {
    const { services } = this.props;
    return (
      <Query query={GET_FAILURE} variables={{ services }}>
        {({ loading, error, data }) => {
          const { failures } = data;

          if (loading || !failures) return <Loading />;
          if (error) return `Error! ${error.message}`;

          const adaptedData = failures.map((failure) => {
            const date = Date.parse(failure.happenedAt);
            const similar = failures
              .filter(f => (Math.abs(Date.parse(f.happenedAt) - date) < 86300000));
            return ({
              name: new Date(date).toDateString(),
              uv: similar.length,
            });
          });

          return (
            <ResponsiveContainer>
              <AreaChart
                data={adaptedData.length > 0 ? adaptedData : [{ uv: 1 }]}
                margin={{
                  top: 10, right: 30, left: 0, bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Brush style={{ marginTop: '50px' }} />
                <defs>
                  <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset={offset} stopColor="red" stopOpacity={1} />
                    <stop offset={offset} stopColor="green" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="uv" stroke="#000" fill="url(#splitColor)" />
              </AreaChart>
            </ResponsiveContainer>
          );
        }}
      </Query>
    );
  }
}
