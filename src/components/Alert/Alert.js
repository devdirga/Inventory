import React from 'react';

import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AlertManager from './AlertManager';

function srid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4()}-${s4()}-${s4()}`;
}

/**
 * Global function to handle show alert that can be called anywhere in your app
 * Pass some `title` object as first attribute to display alert in your app
 *
 * ```
 *  showAlert({title, detail = "", type = "default", buttons = []})
 * ```
 */
export function showAlert(options) {
  const ref = AlertManager.getDefault();
  if (!!ref) {
    ref.showAlert(options);
  }
}

/**
 * Global function to programmatically close alert that can be called anywhere in your app
 *
 * ```
 *  closeAlert()
 * ```
 */
export function closeAlert() {
  const ref = AlertManager.getDefault();
  if (!!ref) {
    ref.closeAlert();
  }
}

export default class Alert extends React.Component {
  constructor(props) {
    super(props);

    // this.closeAlert = this.closeAlert.bind(this);
    if (!this._id) this._id = srid();

    this.state = {
      isOpen: false,
      theme: 'default',
      title: '',
      detail: '',
      buttons: [],
    };
  }

  componentDidMount() {
    AlertManager.register(this);
  }
  componentWillUnmount() {
    AlertManager.unregister(this);
  }

  iconName = () => {
    switch (this.state.theme) {
      case 'success':
        return 'checkbox-marked-circle-outline';
      case 'danger':
        return 'skull-crossbones-outline';
      case 'warning':
        return 'alert-circle-outline';
      case 'info':
        return 'information-outline';
      default:
        return 'transition-masked';
    }
  };

  showAlert = ({title, detail = '', type = 'default', buttons = []}) => {
    this.setState({
      isOpen: true,
      title: title,
      detail: detail,
      theme: type,
      buttons: buttons,
    });
  };
  closeAlert = () => {
    this.setState({isOpen: false});
  };
  btnHandler = (onPress) => {
    if (typeof onPress == 'function') {
      onPress();
    }
    this.closeAlert();
  };

  render() {
    return (
      <SCLAlert
        show={this.state.isOpen}
        onRequestClose={() => {
          this.closeAlert();
        }}
        theme={this.state.theme}
        title={this.state.title}
        subtitle={this.state.detail}
        headerIconComponent={
          <MaterialCommunityIcons
            name={this.iconName()}
            size={32}
            color="white"
          />
        }>
        {this.state.buttons.length <= 0 && (
          <SCLAlertButton
            theme="default"
            onPress={() => {
              this.btnHandler();
            }}>
            Close
          </SCLAlertButton>
        )}
        {this.state.buttons.map((btn, idx) => {
          return (
            <SCLAlertButton
              key={`btnAlrt${idx}`}
              theme={btn.type}
              onPress={() => {
                this.btnHandler(btn.onPress);
              }}>
              {btn.text}
            </SCLAlertButton>
          );
        })}
      </SCLAlert>
    );
  }

  _id;
}
