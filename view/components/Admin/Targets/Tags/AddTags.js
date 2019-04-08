import React, { Component } from 'react';
import {
  Button, Icon, Form,
} from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { ADD_TARGET, GET_TARGETS } from '../../constants/queries';

class AddTags extends Component {
  state = {
    fields: this.props.payload1.fields || ['TAG>PATH'],
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

  render() {
    const { fields } = this.state;
    const { closeModal, getSelector, properties } = this.props;
    const {
      city, country, URL, interval,
    } = properties;

    return (
      <Mutation
        mutation={ADD_TARGET}
        variables={{
          city,
          country,
          URL,
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
                    onClick={() => getSelector({ fields, key })}
                  />
                </Form.Input>
              </Form.Field>
            ))}
            <Button icon onClick={this.onAddField}>
              <Icon name="add" />
            </Button>
            <Button icon labelPosition="right" onClick={addTarget}>
              Confirm
              <Icon name="right arrow" />
            </Button>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default AddTags;
