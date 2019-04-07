import React, { Component } from 'react';
import { Query } from 'react-apollo';
import {
  Icon, Accordion, Segment, List, Container,
} from 'semantic-ui-react';
import scrollIntoView from 'scroll-into-view';
import ReactDOM from 'react-dom';
import AddTarget from './AddTarget';
import DeleteTarget from './DeleteTarget';
import Loading from '../../Loading/index';
import { GET_TARGETS } from '../constants/queries';
import checkPermission from '../helpers/checkPermission';
import pagination, { changePagination } from '../../../helpers/pagination';
import Pagination from '../helpers/Pagination';
import Footer from '../../Footer';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      cursor: 1,
      limit: pagination().limit,
    };

    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }

  handlePaginationChange = (e, { activePage }) => {
    scrollIntoView(ReactDOM.findDOMNode(document.getElementById('top-scroll')));
    this.setState({ cursor: changePagination(activePage) });
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { cursor, limit } = this.state;
    const { history } = this.props;

    // checkPermission(history);

    return (
      <Query
        query={GET_TARGETS}
        variables={{ limit, cursor }}
      >
        {({
          data, loading, error, fetchMore, subscribeToMore,
        }) => {
          const { targets } = data;
          if (loading || !targets) {
            return <Loading />;
          }
          const { activeIndex } = this.state;

          return (
            <div style={{
              height: '100%',
              width: '100%',
              overflow: 'auto',
              background: '#1a1c1d',
            }}
            >
              <Segment inverted>
                <Accordion inverted>
                  {targets.map((target, key) => (
                    <div key={key} style={{ display: 'inline' }}>
                      <Accordion.Title
                        active={activeIndex === key}
                        index={key}
                        onClick={this.handleClick}
                      >
                        <Icon name="dropdown" style={{ float: 'left' }} />
                        <div style={{ textAlign: 'center' }}>
                          {target.URL}
                          <DeleteTarget target={target} limit={limit} cursor={cursor} style={{ float: 'right' }}>
                            <Icon name="cancel" size="large" />
                          </DeleteTarget>
                        </div>
                      </Accordion.Title>
                      <Accordion.Content active={activeIndex === key}>
                        <List>
                          <List.Item icon="map marker alternate" content={target.city || 'Not set'} />
                          <List.Item icon="map pin" content={target.country || 'Not set'} />
                          <List.Item icon="stopwatch" content={target.freq || 'Not set'} />
                          {target.tagPaths.map((tag, key) => (
                            <List.Item
                              key={key}
                              icon="linkify"
                              content={tag}
                            />
                          ))}
                        </List>
                      </Accordion.Content>
                    </div>
                  ))}
                </Accordion>
                <AddTarget />
              </Segment>
              <Pagination
                cursor={cursor}
                limit={limit}
                onPageChange={this.handlePaginationChange}
              />
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

export default Users;
