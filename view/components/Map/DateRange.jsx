import React, { Component } from 'react';
import InputRange from 'react-input-range';
import PropTypes from 'prop-types';

class DateRange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rangeValue: {
        min: props.initMin,
        max: props.initMax,
      },
    };
  }

  render() {
    const { rangeValue } = this.state;
    const { handleChange } = this.props;

    return (
      <InputRange
        maxValue={new Date().getFullYear() || 2019}
        minValue={2014}
        formatLabel={value => `${value} th`}
        value={rangeValue}
        onChange={value => this.setState({ rangeValue: value })}
        onChangeComplete={value => handleChange(value)}
        interactive
      />
    );
  }
}

DateRange.propTypes = {
  initMin: PropTypes.number,
  initMax: PropTypes.number,
  handleChange: PropTypes.func,
};

DateRange.defaultProps = {
  initMin: 2012,
  initMax: new Date().getFullYear(),
  handleChange: null,
};

export default DateRange;
