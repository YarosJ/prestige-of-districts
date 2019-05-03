import React, { Component } from 'react';
import {
  Button,
  Icon,
  Form,
} from 'semantic-ui-react';
import Modal from '../../../helpers/Modal';
import AddTags from './Tags/AddTags';
import ChooseService from '../../../helpers/ChooseService';

class AddTarget extends Component {
  state = {
    URL: '',
    city: '',
    country: '',
    service: '',
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

  handleServiceChange = (e, { value }) => this.setState({ service: value });

  action = () => {
    const {
      addingTags, interval, country, service, city, URL,
    } = this.state;

    if (addingTags) {
      const { apolloClient } = this.props;
      return (
        <AddTags
          apolloClient={apolloClient}
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
        service={service}
        interval={interval}
        URL={URL}
        handleServiceChange={this.handleServiceChange}
        onChange={this.onChange}
      />
    );
  };

  render() {
    return (
      <Modal
        header="Adding Target"
        buttonContent="Add New"
        buttonSize="medium"
        buttonColor="blue"
        initiateClose={close => this.closeModal = close}
        style={{ textAlign: 'center' }}
      >
        { this.action() }
      </Modal>
    );
  }
}

const Basics = ({
  nextAction, onChange, handleServiceChange, URL, city, country, service, interval,
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
      <label>Service</label>
      <ChooseService
        handleChange={handleServiceChange}
        value={service}
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
