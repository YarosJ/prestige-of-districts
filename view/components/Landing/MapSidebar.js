import React, { Component } from 'react';
import {
  Icon, Segment, Sidebar, Menu,
} from 'semantic-ui-react';
import Map from '../Map';

class MapSidebar extends Component {
  state = {
    visible: false,
  };

  handleShowClick = () => this.setState({ visible: true });

  handleSidebarHide = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;

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
          <Menu.Item as="a">Item 1</Menu.Item>
          <Menu.Item as="a">Item 2</Menu.Item>
          <Menu.Item as="a">Item 3</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher
          style={{
            padding: 0,
            margin: 0,
            height: '100%',
          }}
        >
          <Segment basic style={{ height: '100%', padding: 0 }}>
            <Map />
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
                name="bars"
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

export default MapSidebar;
