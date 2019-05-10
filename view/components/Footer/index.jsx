import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Grid,
  Header,
  List,
  Segment,
} from 'semantic-ui-react';

const Footer = ({ style }) => (
  <Segment vertical style={{ padding: '5em 0em', ...style }}>
    <Container>
      <Grid divided stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header as="h4" content="About" />
            <List link>
              <List.Item as="a">Sitemap</List.Item>
              <List.Item as="a">Contact Us</List.Item>
              <List.Item as="a">Religious Ceremonies</List.Item>
              <List.Item as="a">Gazebo Plans</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header as="h4" content="Services" />
            <List link>
              <List.Item as="a">Banana Pre-Order</List.Item>
              <List.Item as="a">DNA FAQ</List.Item>
              <List.Item as="a">How To Access</List.Item>
              <List.Item as="a">Favorite X-Men</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as="h4">
            Footer Header
            </Header>
            <p>
            Extra space for a call to action inside the footer that could help re-engage users.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

Footer.propTypes = {
  style: PropTypes.objectOf(PropTypes.any),
};

Footer.defaultProps = {
  style: {},
};

export default Footer;
