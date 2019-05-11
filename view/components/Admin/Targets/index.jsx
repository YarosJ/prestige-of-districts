import React, { Component } from 'react';
import { Query } from 'react-apollo';
import {
  Icon, Accordion, List, Container,
} from 'semantic-ui-react';
import posed from 'react-pose';
import PropTypes from 'prop-types';
import AddTarget from './AddTarget';
import UpdateTarget from './UpdateTarget';
import EditTags from './Tags/EditTags';
import DeleteTarget from './DeleteTarget';
import Loading from '../../Loading/index';
import { GET_TARGETS } from '../constants/queries';
import checkPermission from '../../../helpers/checkPermission';
import Footer from '../../Footer/index';
import { historyPropType } from '../../../constants/propTypes';

const Hoverable = posed.div({
  hoverable: true,
  init: { scale: 1 },
  hover: { scale: 1.2 },
});

class Targets extends Component {
  state = {
    activeIndex: 0,
  };

  rerenderTargets = () => this.forceUpdate();

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { history, apolloClient } = this.props;
    const { activeIndex } = this.state;

    checkPermission({ history, redirect: true });

    return (
      <Query query={GET_TARGETS}>
        {({
          data, loading,
        }) => {
          const { targets } = data;
          if (loading || !targets) {
            return <Loading />;
          }

          return (
            <div style={{
              height: '100%',
              width: '100%',
              overflow: 'auto',
              padding: '40px',
            }}
            >
              <Accordion>
                {targets.map((target, key) => (
                  <div key={target.id} style={{ display: 'inline' }}>
                    <Accordion.Title
                      active={activeIndex === key}
                      index={key}
                      onClick={this.handleClick}
                    >
                      <Icon name="dropdown" />
                      {target.URL}
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === key}>
                      <List>
                        <List.Item icon="map marker alternate" content={target.city || 'Not set'} />
                        <List.Item icon="map pin" content={target.country || 'Not set'} />
                        <List.Item icon="stopwatch" content={target.freq || 'Not set'} />
                        {target.tagPaths && target.tagPaths.map((tag, index) => (
                          <List.Item
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            icon="linkify"
                            content={tag}
                          />
                        ))}
                      </List>
                      <div style={{ display: 'flex' }}>
                        <Hoverable style={{ margin: 'auto', marginRight: '40px', cursor: 'pointer' }}>
                          <UpdateTarget target={target} />
                        </Hoverable>
                        <Hoverable style={{ cursor: 'pointer' }}>
                          <EditTags target={target} rerenderTargets={this.rerenderTargets} />
                        </Hoverable>
                        <Hoverable style={{ margin: 'auto', marginLeft: '40px', cursor: 'pointer' }}>
                          <DeleteTarget target={target}>
                            <Icon name="cancel" size="large" color="red" />
                          </DeleteTarget>
                        </Hoverable>
                      </div>
                    </Accordion.Content>
                  </div>
                ))}
              </Accordion>
              <AddTarget apolloClient={apolloClient} />
              <Container text textAlign="justified">
                <Footer />
              </Container>
            </div>
          );
        }}
      </Query>
    );
  }
}

Targets.propTypes = {
  history: historyPropType,
  apolloClient: PropTypes.objectOf(PropTypes.any),
};

Targets.defaultProps = {
  history: {},
  apolloClient: {},
};

export default Targets;
