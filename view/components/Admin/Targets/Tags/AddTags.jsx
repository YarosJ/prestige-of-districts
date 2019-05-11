/* global document */

import React, { Component } from 'react';
import {
  Button, Icon, Form,
} from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ADD_TARGET, GET_TARGETS } from '../../queries';
import GetSelector from './GetSelector';

class AddTags extends Component {
  state = {
    fields: ['TAG>PATH'],
  };

  onChange = (event, key) => {
    const { value } = event.target;
    const { fields } = this.state;
    fields[key] = value;
    this.setState({ fields });
  };

  onAddField = () => {
    const { fields } = this.state;
    fields.push('NEW>PATH');
    this.setState({ fields });
  };

  onDeleteField = (key) => {
    const { fields } = this.state;
    fields.splice(key, 1);
    this.setState({ fields });
  };

  onGetSelector = (selector, editKey) => {
    const { fields } = this.state;
    fields[editKey] = selector;
    this.setState({ fields });
  };

  goGetSelectorFor = (editKey, URL) => {
    const { apolloClient } = this.props;

    ReactDOM.render(
      <GetSelector
        apolloClient={apolloClient}
        URL={URL}
        editKey={editKey}
        onGetSelector={this.onGetSelector}
      />,
      document.getElementById('screenshot'),
    );
  };

  render() {
    const { fields } = this.state;
    const { closeModal, properties, goBasics } = this.props;
    const {
      city, country, URL, interval, service,
    } = properties;

    return (
      <Mutation
        mutation={ADD_TARGET}
        variables={{
          city,
          country,
          URL,
          service,
          freq: interval,
          tagPaths: fields,
        }}
        update={
          (cache, { data: { addTarget } }) => {
            const dataToUpdate = cache.readQuery({ query: GET_TARGETS });
            dataToUpdate.targets.push(addTarget);
            cache.writeQuery({ query: GET_TARGETS, data: dataToUpdate });
            closeModal();
          }
        }
      >
        {addTarget => (
          <Form style={{ textAlign: 'center' }}>
            {fields.map((value, key) => (
              // eslint-disable-next-line react/no-array-index-key
              <Form.Field key={key}>
                <Form.Input
                  action
                  placeholder="site.com"
                  value={value}
                  onChange={event => this.onChange(event, key)}
                >
                  <input />
                  <Button
                    icon="trash alternate outline"
                    onClick={() => this.onDeleteField(key)}
                  />
                  <Button
                    style={{ marginLeft: '5px' }}
                    icon="hand point up"
                    onClick={() => this.goGetSelectorFor(key, URL)}
                  />
                </Form.Input>
              </Form.Field>
            ))}
            <Button icon labelPosition="left" onClick={goBasics}>
              Go Back
              <Icon name="left arrow" />
            </Button>
            <Button icon onClick={this.onAddField} style={{ marginLeft: '10px', marginRight: '10px' }}>
              <Icon name="add" />
            </Button>
            <Button icon labelPosition="right" onClick={addTarget}>
              Confirm
              <Icon name="checkmark" />
            </Button>
          </Form>
        )}
      </Mutation>
    );
  }
}

AddTags.propTypes = {
  closeModal: PropTypes.func,
  properties: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
    URL: PropTypes.string,
    interval: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    service: PropTypes.string,
  }),
  goBasics: PropTypes.func,
  apolloClient: PropTypes.objectOf(PropTypes.any),
};

AddTags.defaultProps = {
  closeModal: null,
  properties: null,
  goBasics: null,
  apolloClient: null,
};

export default AddTags;
