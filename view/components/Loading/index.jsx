import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

const Loading = () => (
  <Dimmer active inverted style={{ background: 'transparent' }}>
    <Loader inverted>Loading...</Loader>
  </Dimmer>
);

export default Loading;
