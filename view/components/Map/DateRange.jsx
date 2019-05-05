import React, { Component } from 'react';
import InputRange from 'react-input-range';
import 'mapbox-gl/dist/mapbox-gl.css';

export default class DateRange extends Component {
  state = {
    rangeValue: {
      min: this.props.initMin || 2012,
      max: this.props.initMax || new Date().getFullYear(),
    },
  };

  render() {
    const { rangeValue } = this.state;
    const { handleChange } = this.props;

    return (
      <InputRange
        maxValue={2019}
        minValue={2010}
        formatLabel={value => `${value} th`}
        value={rangeValue}
        onChange={value => this.setState({ rangeValue: value })}
        onChangeComplete={value => handleChange(value)}
        interactive
      />
    );
  }
}
