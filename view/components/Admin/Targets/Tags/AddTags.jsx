import React, { Component } from 'react';
import {
  Button, Icon, Form,
} from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { ADD_TARGET, GET_TARGETS } from '../../constants/queries';
import GetSelector from './GetSelector';

class AddTags extends Component {
  state = {
    fields: ['TAG>PATH'],
    gettingSelector: false,
    editKey: 0,
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
    this.setState({ gettingSelector: false, fields });
  };

  goGetSelectorFor = editKey => this.setState({ gettingSelector: true, editKey });

  render() {
    const { fields, gettingSelector, editKey } = this.state;
    const { closeModal, properties, goBasics } = this.props;
    const {
      city, country, URL, interval, service
    } = properties;

    if (gettingSelector) {
      return (
        <GetSelector
          URL={URL}
          editKey={editKey}
          onGetSelector={this.onGetSelector}
        />
      );
    }

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
          (proxy, { data: { addTarget } }) => {
            const dataToUpdate = proxy.readQuery({ query: GET_TARGETS });
            dataToUpdate.targets.push(addTarget);
            proxy.writeQuery({ query: GET_TARGETS, data: dataToUpdate });
            closeModal();
          }
        }
      >
        {(addTarget, { loading, error }) => (
          <Form style={{ textAlign: 'center' }}>
            {fields.map((value, key) => (
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
                    onClick={() => this.goGetSelectorFor(key)}
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

export default AddTags;
