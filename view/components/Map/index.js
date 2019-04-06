import React, { Component } from 'react';
import {
  Icon, Segment, Sidebar, Menu,
} from 'semantic-ui-react';
import HeatMap from './HeatMap/HeatMap';
import HeatMap3D from './HeatMap3D/HeatMap3D';
import PointMap from './PointMap/PointMap';

class Index extends Component {
  state = {
    visible: false,
    map: 'points',
  };

  handleShowClick = () => this.setState({ visible: true });

  handleSidebarHide = () => this.setState({ visible: false });

  getMap = (map) => {
    switch (map) {
      case 'heat':
        return <HeatMap />;
      case 'heat3D':
        return <HeatMap3D />;
      default: return <PointMap />;
    }
  };

  render() {
    const { visible, map } = this.state;

    return (
      <Sidebar.Pushable as={Segment} style={{ border: 'none' }}>
        <Sidebar
          as={Menu}
          animation="overlay"
          direction="right"
          icon="labeled"
          inverted
          onClick={this.handleSidebarHide}
          onHide={() => {
            this.handleSidebarHide();
          }}
          vertical
          visible={visible}
          width="wide"
        >
          <Menu.Item as="a" onClick={() => this.setState({ map: 'points' })}>Points</Menu.Item>
          <Menu.Item as="a" onClick={() => this.setState({ map: 'heat' })}>Heat Map</Menu.Item>
          <Menu.Item as="a" onClick={() => this.setState({ map: 'heat3D' })}>Heat Map 3D</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher
          style={{
            padding: 0,
            margin: 0,
            height: '100%',
          }}
        >
          <Segment basic style={{ height: '100%', padding: 0 }}>
            { this.getMap(map) }
            <div
              style={{
                color: 'white',
                position: 'fixed',
                right: '25px',
                top: '30px',
                zIndex: 500,
              }}
            >
              <Icon
                name="block layout"
                size="large"
                color="pink"
                onClick={this.handleShowClick}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default Index;
