import {
  showMessage as libShowMessage,
  hideMessage as libHideMessage,
} from 'react-native-flash-message';
import {color} from '../values';

const Messaging = {
  types: {
    INFO: 'info',
    DANGER: 'danger',
    DEFAULT: 'default',
    NONE: 'none',
    SUCCESS: 'success',
    WARNING: 'warning',
  },
  showMessage: ({message, description, type = 'info'}) => {
    let options = {
      message: message,
      description: description,
      type: type,
    };
    switch (type) {
      case 'success':
        options.backgroundColor = color.primary;
        break;

      default:
        break;
    }
    if (options.message) {
      libShowMessage(options);
    }
  },
  hideMessage: () => {
    libHideMessage();
  },
};

export default Messaging;
