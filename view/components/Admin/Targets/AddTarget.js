import React, { Component } from 'react';
import {
  Button,
  Icon,
  Form,
} from 'semantic-ui-react';
import Modal from '../../Modal';
import AddTags from './Tags/AddTags';
import GetSelector from './Tags/GetSelector';

class AddTarget extends Component {
  state = {
    URL: '',
    city: '',
    country: '',
    interval: 30000,
    step: 'Basics',
  };

  closeModal = null;

  goAddTags = payload1 => this.setState({ step: 'AddTags', payload1 });

  goGetSelector = payload1 => this.setState({ step: 'GetSelector', payload1 });

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  action = () => {
    const {
      step, interval, country, city, URL, payload1,
    } = this.state;

    switch (step) {
      case 'AddTags':
        return (
          <AddTags
            payload1={payload1}
            getSelector={this.goGetSelector}
            properties={this.state}
            closeModal={this.closeModal}
          />
        );
      case 'GetSelector':
        return (
          <GetSelector
            URL={URL}
            payload1={payload1}
            onGetSelector={updatedFields => this.goAddTags(updatedFields)}
          />
        );
      default: return (
        <Basics
          nextAction={this.goAddTags}
          city={city}
          country={country}
          interval={interval}
          URL={URL}
          onChange={this.onChange}
        />
      );
    }
  };

  render() {
    return (
      <Modal header="Adding Target" buttonContent="Add" initiateClose={close => this.closeModal = close}>
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
