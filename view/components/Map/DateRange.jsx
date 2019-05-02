import React, { Component } from 'react';
import InputRange from 'react-input-range';
import 'mapbox-gl/dist/mapbox-gl.css';

export default class DateRange extends Component {
  state = {
    rangeValue: {
      min: 2007,
      max: 2015,
    },
  };

  render() {
    const { rangeValue } = this.state;
    const { handleChange } = this.props;

    return (
      <InputRange
        maxValue={2019}
        minValue={2000}
        formatLabel={value => `${value} th`}
        value={rangeValue}
        onChange={value => this.setState({ rangeValue: value })}
        onChangeComplete={value => handleChange(value)}
        interactive
      />
    );
  }
}
