import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush, Legend,
} from 'recharts';
import { Query } from 'react-apollo';
import { GET_FAILURES } from '../../constants/queries';
import Loading from '../Loading';

const OFFSET = 0.5;

class AreaChartComponent extends PureComponent {
  render() {
    const { service } = this.props;
    if (!service) return <Loading />;

    return (
      <Query query={GET_FAILURES} variables={{ services: [service] }}>
        {({ loading, error, data }) => {
          const { failures } = data;

          if (loading || !failures) return <Loading />;
          if (error) return `Error! ${error.message}`;

          const countedFailures = {};
          failures.forEach((i) => {
            // const dt = new Date(i.happenedAt).toDateString();
            const dt = new Date(i.happenedAt).getFullYear().toString();
            if (countedFailures[dt]) {
              countedFailures[dt].uv = (countedFailures[dt].uv || 0) + 1;
            } else {
              countedFailures[dt] = { name: dt, uv: 1 };
            }
          });

          const adaptedData = Object.values(countedFailures);

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
                <Legend verticalAlign="top" height={36} content={() => service} />
                <Brush style={{ marginTop: '50px' }} />
                <defs>
                  <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset={OFFSET} stopColor="red" stopOpacity={1} />
                    <stop offset={OFFSET} stopColor="green" stopOpacity={1} />
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

AreaChartComponent.propTypes = {
  service: PropTypes.string,
};

AreaChartComponent.defaultProps = {
  service: null,
};

export default AreaChartComponent;
