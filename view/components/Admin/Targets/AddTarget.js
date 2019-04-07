import React, { Component } from 'react';
import {
  Button,
  Icon,
  Form,
} from 'semantic-ui-react';
import Modal from '../../Modal';
import ManualAddTag from './AddTags/Manual';
import AutoAddTag from './AddTags/Auto';

class AddTarget extends Component {
  state = {
    URL: '',
    city: '',
    country: '',
    interval: 30000,
    step: 'Basics',
    closeModal: false,
  };

  closeModal = null;

  goChooseMethod = () => this.setState({ step: 'ChooseMethod' });

  goManual = () => this.setState({ step: 'ManualAddTag' });

  goAuto = () => this.setState({ step: 'AutoAddTag' });

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  action = () => {
    const {
      step, interval, country, city, URL,
    } = this.state;
    switch (step) {
      case 'ChooseMethod':
        return <ChooseMethod manual={this.goManual} auto={this.goAuto} />;
      case 'ManualAddTag':
        return <ManualAddTag properties={this.state} closeModal={this.closeModal} />;
      case 'AutoAddTag':
        return <AutoAddTag />;
      default: return (
        <Basics
          nextAction={this.goChooseMethod}
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

const ChooseMethod = ({ manual, auto }) => (
  <div style={{ width: '100%', display: 'grid' }}>
    <Button.Group style={{ margin: 'auto', marginBottom: '20px' }}>
      <Button
        style={{ width: '100px' }}
        onClick={manual}
      >
      Manual
      </Button>
      <Button.Or />
      <Button
        positive
        style={{ width: '100px' }}
        onClick={auto}
      >
      Auto
      </Button>
    </Button.Group>
    <p style={{ margin: 'auto' }}>
      <a href="#">Learn More...</a>
    </p>
  </div>
);

export default AddTarget;
