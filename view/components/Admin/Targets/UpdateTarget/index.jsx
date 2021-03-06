import React, { Component } from 'react';
import {
  Button,
  Form, Icon,
} from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import Modal from '../../../../helpers/components/Modal';
import { GET_TARGETS, UPDATE_TARGET } from '../../queries';

class UpdateTarget extends Component {
  closeModal = null;

  constructor(props) {
    super(props);
    this.state = props.target;
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { style } = this.props;
    const {
      city, country, freq, URL,
    } = this.state;

    return (
      <Modal
        style={style}
        header="Edit Target"
        activateContent={<Icon name="pencil" size="large" color="green" />}
        initiateClose={(close) => { this.closeModal = close; }}
      >
        <Mutation
          mutation={UPDATE_TARGET}
          variables={{
            city, country, freq, URL,
          }}
          update={
            (proxy, { data: { updateTarget } }) => {
              const data = proxy.readQuery({ query: GET_TARGETS });
              data.targets = data.targets.map((t) => {
                if (t.URL === updateTarget.URL) return updateTarget;
                return t;
              });
              proxy.writeQuery({ query: GET_TARGETS, data });
              this.closeModal();
            }
          }
        >
          {updateTarget => (
            <Form>
              <Form.Field>
                <Form.Input
                  label="City"
                  name="city"
                  value={city || ''}
                  onChange={this.onChange}
                  placeholder="Kiev"
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Country"
                  name="country"
                  value={country || ''}
                  onChange={this.onChange}
                  placeholder="Ukraine"
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Interval (milliseconds)"
                  name="freq"
                  value={freq || ''}
                  onChange={this.onChange}
                  placeholder="30000"
                />
              </Form.Field>
              <Button primary onClick={updateTarget}>
                Submit
              </Button>
            </Form>
          )}
        </Mutation>
      </Modal>
    );
  }
}

UpdateTarget.propTypes = {
  target: PropTypes.shape({
    URL: PropTypes.string,
    tagPaths: PropTypes.arrayOf(PropTypes.string),
  }),
  style: PropTypes.objectOf(PropTypes.any),
};

UpdateTarget.defaultProps = {
  target: null,
  style: null,
};

export default UpdateTarget;
