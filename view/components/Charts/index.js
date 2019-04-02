import React from 'react';
import 'react-input-range/lib/css/index.css';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { GET_FAILURE } from '../../constants/queries';
import Navigation from '../Landing/Navigation';
import Loading from '../Loading';

const Charts = ({ history }) => (
  <div style={{
    display: 'flex',
    padding: 0,
    height: '104.5%',
  }}
  >
    <Navigation history={history} />
    <Query query={GET_FAILURE}>
      {({ loading, error, data }) => {
        const { failures } = data;
        if (loading || !failures) {
          return <Loading />;
        }
        if (error) return `Error! ${error.message}`;

        return (
          <ResponsiveContainer>
            <LineChart
              width={730}
              height={250}
              data={failures.map((failure) => {
                const date = Date.parse(failure.happenedAt);
                const similar = failures.filter(f => (Math.abs(Date.parse(f.happenedAt) - date) < 86300000));
                return ({ name: new Date(date).toLocaleString(), uv: similar.length });
              })}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
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
        );
      }}
    </Query>

  </div>
);

Charts.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};

Charts.defaultProps = {
  history: {},
};

export default Charts;
