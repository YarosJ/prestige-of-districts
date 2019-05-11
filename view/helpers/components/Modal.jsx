/* global document */

import React, { Component } from 'react';
import {
  Modal,
  Button,
  TransitionablePortal,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { childrenPropType } from '../../constants/propTypes';

class ModalComponent extends Component {
  state = { open: false };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    document.body.classList.remove('modal-fade-in');
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const {
      header,
      children,
      buttonContent,
      buttonSize,
      buttonColor,
      initiateClose,
      activateContent,
      style,
      windowStyle,
    } = this.props;
    if (initiateClose) initiateClose(this.handleClose);

    return (
      <div style={style}>
        <style>
          {`
          .ui.dimmer {
            transition: background-color 0.5s ease;
            background-color: transparent;
          }

          .modal-fade-in .ui.dimmer {
            background-color: orange;
          }
        `}
        </style>

        {activateContent
          ? (
            <div
              role="button"
              tabIndex="-1"
              onClick={this.handleOpen}
              onKeyPress={this.handleOpen}
            >
              {activateContent}
            </div>
          )
          : (
            <Button
              content={buttonContent}
              color={buttonColor}
              size={buttonSize}
              compact
              style={{ marginTop: '15px', marginBottom: '20px' }}
              onClick={this.handleOpen}
            />
          )}

        <TransitionablePortal
          open={open}
          onOpen={() => setTimeout(() => document.body.classList.add('modal-fade-in'), 0)}
          transition={{ animation: 'scale', duration: 500 }}
        >
          <Modal
            open
            onClose={this.handleClose}
            closeIcon
            style={windowStyle}
          >
            <Modal.Header>
              { header }
            </Modal.Header>
            <Modal.Content>
              { children }
            </Modal.Content>
          </Modal>
        </TransitionablePortal>
      </div>
    );
  }
}

ModalComponent.propTypes = {
  header: childrenPropType,
  children: childrenPropType,
  buttonContent: childrenPropType,
  buttonSize: PropTypes.string,
  buttonColor: PropTypes.string,
  initiateClose: PropTypes.func,
  activateContent: childrenPropType,
  style: PropTypes.objectOf(PropTypes.any),
  windowStyle: PropTypes.objectOf(PropTypes.any),
};

ModalComponent.defaultProps = {
  header: null,
  children: null,
  buttonContent: null,
  buttonSize: 'tiny',
  buttonColor: null,
  initiateClose: null,
  activateContent: null,
  style: {},
  windowStyle: {},
};

export default ModalComponent;
