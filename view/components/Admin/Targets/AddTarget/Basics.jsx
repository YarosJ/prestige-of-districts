import { Button, Form, Icon } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';
import ChooseService from '../../../../helpers/ChooseService';

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
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
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

Basics.propTypes = {
  nextAction: PropTypes.func,
  onChange: PropTypes.func,
  handleServiceChange: PropTypes.func,
  URL: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  service: PropTypes.string,
  interval: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

Basics.defaultProps = {
  nextAction: null,
  onChange: null,
  handleServiceChange: null,
  URL: null,
  city: null,
  country: null,
  service: null,
  interval: null,
};

export default Basics;
