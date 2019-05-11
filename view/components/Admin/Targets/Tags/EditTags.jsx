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
    const { style, rerenderTargets } = this.props;
    const { URL, tagPaths } = this.state;

    if (!tagPaths) this.setState({ tagPaths: [] });

    return (
      <Modal
        style={style}
        header="Edit Tags"
        activateContent={<Icon name="linkify" size="large" color="orange" />}
        initiateClose={(close) => { this.closeModal = close; }}
      >
        <Mutation
          mutation={UPDATE_TARGET}
          variables={{ URL, tagPaths }}
          update={
            (cache, { data: { updateTarget } }) => {
              const dataToUpdate = cache.readQuery({ query: GET_TARGETS });
              dataToUpdate.targets = dataToUpdate.targets
                .map(t => (t.URL === updateTarget.URL ? updateTarget : t));
              cache.writeQuery({ query: GET_TARGETS, data: dataToUpdate });
              this.closeModal();

              /**
               * The following is a re-rendering of the parent component.
               * This is far from right, but there is no solution yet.
               * This is due to the fact that Apollo, after mutation,
               * updates the cache but does not render.
               *
               * https://github.com/apollographql/apollo-client/issues/3633
               */

              rerenderTargets();
            }
          }
        >
          {updateTarget => (
            <Form style={{ textAlign: 'center' }}>
              {tagPaths.map((value, key) => (
                // eslint-disable-next-line react/no-array-index-key
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

UpdateTarget.propTypes = {
  target: PropTypes.shape({
    URL: PropTypes.string,
    tagPaths: PropTypes.arrayOf(PropTypes.string),
  }),
  style: PropTypes.objectOf(PropTypes.any),
  rerenderTargets: PropTypes.func,
};

UpdateTarget.defaultProps = {
  target: null,
  style: null,
  rerenderTargets: null,
};

export default UpdateTarget;
