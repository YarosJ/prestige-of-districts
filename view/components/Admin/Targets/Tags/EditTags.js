import React, { Component } from 'react';
import {
  Button,
  Form, Icon,
} from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import Modal from '../../../Modal';
import { GET_TARGETS, UPDATE_TARGET } from '../../constants/queries';

class UpdateTarget extends Component {
  state = this.props.target;

  closeModal = null;

  onChange = (event, key) => {
    const { value } = event.target;
    const { tagPaths } = this.state;
    tagPaths[key] = value;
    this.setState({ tagPaths });
  };

  onAddField = () => {
    const { tagPaths } = this.state;
    tagPaths.push('NEW>PATH');
    this.setState({ tagPaths });
  };

  onDeleteField = (key) => {
    const { tagPaths } = this.state;
    tagPaths.splice(key, 1);
    this.setState({ tagPaths });
  };

  render() {
    const { style } = this.props;
    const { URL, tagPaths } = this.state;

    if (!tagPaths) this.setState({ tagPaths: [] });

    return (
      <Modal
        style={style}
        header="Edit Tags"
        activateContent={<Icon name="linkify" size="large" color="orange" />}
        initiateClose={close => this.closeModal = close}
      >
        <Mutation
          mutation={UPDATE_TARGET}
          variables={{
            URL, tagPaths,
          }}
          update={
            (proxy, { data: { updateTarget } }) => {
              const dataToUpdate = { ...proxy.readQuery({ query: GET_TARGETS }) };
              console.log(dataToUpdate, updateTarget);
              dataToUpdate.targets = dataToUpdate.targets
                .map(t => (t.URL === updateTarget.URL ? updateTarget : t));
              proxy.writeQuery({ query: GET_TARGETS, data: dataToUpdate });
              this.closeModal();
            }
          }
        >
          {(updateTarget, { data, loading, error }) => (
            <Form style={{ textAlign: 'center' }}>
              {tagPaths.map((value, key) => (
                <Form.Field key={key}>
                  <Form.Input
                    action={{ icon: 'trash alternate outline', onClick: () => this.onDeleteField(key) }}
                    placeholder="site.com"
                    value={value}
                    onChange={event => this.onChange(event, key)}
                  />
                </Form.Field>
              ))}
              <Button icon onClick={this.onAddField}>
                <Icon name="add" />
              </Button>
              <Button icon labelPosition="right" onClick={updateTarget}>
                Confirm
                <Icon name="right arrow" />
              </Button>
            </Form>
          )}
        </Mutation>
      </Modal>
    );
  }
}

export default UpdateTarget;
