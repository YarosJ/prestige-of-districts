import React from 'react';
import Terminal from 'terminal-in-react';
import PropTypes from 'prop-types';
import { aardvarksay, dragonsay, tuxsay } from './animalSay';

const directError = ({ code, message }) => {
  switch (code) {
    case 404:
      return aardvarksay(message);
    case 403:
      return dragonsay(message);
    default:
      return tuxsay(message);
  }
};

const TerminalComponent = ({ code, message }) => (
  <div
    style={{
      minWidth: 'max-content',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <Terminal
      color="green"
      prompt="red"
      outputColor="#2185D0"
      backgroundColor="#27292C"
      barColor="#DDDDDD"
      allowTabs={false}
      style={{
        borderRadius: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.75) -6px -4px 8px 0px',
        fontWeight: 'bold',
        fontSize: '1em',
        overflow: 'hidden',
        height: 'auto',
      }}
      commands={{ dragonsay, tuxsay, aardvarksay }}
      descriptions={{
        dragonsay: 'Shows a message with dragon',
        tuxsay: 'Shows a message with tux',
        aardvarksay: 'Shows a message with aardvark',
      }}
      msg={directError({ code, message })}
    />
  </div>
);

TerminalComponent.propTypes = {
  code: PropTypes.number,
  message: PropTypes.string,
};

TerminalComponent.defaultProps = {
  code: null,
  message: 'You should pass message',
};

export default TerminalComponent;
