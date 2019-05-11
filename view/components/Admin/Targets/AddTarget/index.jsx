import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../helpers/Modal';
import AddTags from '../Tags/AddTags';
import Basics from './Basics';

class Index extends Component {
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
        initiateClose={(close) => { this.closeModal = close; }}
        style={{ textAlign: 'center' }}
      >
        { this.action() }
      </Modal>
    );
  }
}

Index.propTypes = {
  apolloClient: PropTypes.objectOf(PropTypes.any),
};

Index.defaultProps = {
  apolloClient: {},
};

export default Index;
