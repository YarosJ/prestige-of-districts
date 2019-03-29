import React, { Component } from 'react';
import {
  Icon, List, Menu, Segment, Sidebar,
} from 'semantic-ui-react';
import Map from '../Map';
import 'react-input-range/lib/css/index.css';

class Landing extends Component {
  render() {
    return (
      <div style={{
        display: 'flex',
        padding: 0,
        height: '104.5%',
      }}
      >
        <div
          style={{
            textAlign: 'center',
            background: '#282226',
            paddingTop: '25px',
            paddingBottom: '30px',
            width: '60px',
          }}
        >
          <List selection verticalAlign="middle">
            <List.Item style={{ marginBottom: '140px' }}>
              <Icon
                name="location arrow"
                size="large"
                color="pink"
              />
            </List.Item>
            <List.Item style={{ marginBottom: '10px' }}>
              <Icon
                name="bullseye"
                size="large"
                style={{ color: 'white' }}
              />
            </List.Item>
            <List.Item style={{ marginBottom: '10px' }}>
              <Icon name="chart line" size="large" color="teal" />
            </List.Item>
            <List.Item style={{ marginBottom: '10px' }}>
              <Icon name="chart pie" size="large" color="blue" />
            </List.Item>
          </List>
        </div>
        <div style={{
          padding: 0,
          width: '100%',
          height: '100%',
        }}
        >
          <MapSidebar />
        </div>
      </div>
    );
  }
}

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

export default Landing;
