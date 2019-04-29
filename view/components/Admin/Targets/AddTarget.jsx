import React, { Component } from 'react';
import {
  Button,
  Icon,
  Form,
} from 'semantic-ui-react';
import Modal from '../../../helpers/Modal';
import AddTags from './Tags/AddTags';

class AddTarget extends Component {
  state = {
    URL: '',
    city: '',
    country: '',
    interval: 30000,
    addingTags: false,
  };

  closeModal = null;

  goAddTags = () => this.setState({ addingTags: true });

  goBasics = () => this.setState({ addingTags: false });

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  action = () => {
    const {
      addingTags, interval, country, city, URL,
    } = this.state;

    if (addingTags) {
      return (
        <AddTags
          properties={this.state}
          goBasics={this.goBasics}
          closeModal={this.closeModal}
        />
      );
    }
    return (
      <Basics
        nextAction={this.goAddTags}
        city={city}
        country={country}
        interval={interval}
        URL={URL}
        onChange={this.onChange}
      />
    );
  };

  render() {
    return (
      <Modal
        header="Adding Target"
        buttonContent="Add New"
        initiateClose={close => this.closeModal = close}
        style={{ textAlign: 'center' }}
      >
        { this.action() }
      </Modal>
    );
  }
}

const Basics = ({
  nextAction, onChange, URL, city, country, interval,
}) => (
  <Form>
    <Form.Field>
      <Form.Input
        label="URL"
        name="URL"
        value={URL}
        onChange={onChange}
        type="text"
        placeholder="site.com"
      />
    </Form.Field>
    <Form.Field>
      <Form.Input
        label="City"
        name="city"
        value={city}
        onChange={onChange}
        placeholder="Kiev"
      />
    </Form.Field>
    <Form.Field>
      <Form.Input
        label="Country"
        name="country"
        value={country}
        onChange={onChange}
        placeholder="Ukraine"
      />
    </Form.Field>
    <Form.Field>
      <Form.Input
        label="Interval (milliseconds)"
        name="interval"
        value={interval}
        onChange={onChange}
        placeholder="30000"
      />
    </Form.Field>
    <Button icon labelPosition="right" onClick={nextAction}>
        Next
      <Icon name="right arrow" />
    </Button>
  </Form>
);

export default AddTarget;
