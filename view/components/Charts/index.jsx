import React from 'react';
import 'react-input-range/lib/css/index.css';
import AreaChart from './AreaChart';

const services = ['WATER', 'ELECTRO'];

export default () => (
  <div style={{
    width: '100%',
    height: '100%',
    paddingBottom: '30px',
    paddingTop: '30px',
    textAlign: 'center',
    overflow: 'auto',
  }}
  >
    {services.map((service, key) => <AreaChart key={key} services={[service]} />)}
  </div>
);
