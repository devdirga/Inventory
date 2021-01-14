import {PermissionsAndroid} from 'react-native';

import {Messaging} from '.';

const Permissions = {
  requestStoragePermission: async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission',
          message:
            'TPS ESS Mobile Attendance needs access to read your external storage ' +
            'so you can choose file from your storage.',
          buttonPositive: 'OK',
        },
      );
      switch (granted) {
        case PermissionsAndroid.RESULTS.GRANTED:
          return true;
        case PermissionsAndroid.RESULTS.DENIED:

        case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:

        default:
          Messaging.showMessage({
            message: 'Warning',
            description:
              'Unable to read file from storage, please check your permission setting for this app',
            type: Messaging.types.WARNING,
          });
          return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  },
  requestCameraPermission: async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Permission',
          message: 'TPS ESS Mobile Attendance needs access to camera ',
          buttonPositive: 'OK',
        },
      );
      switch (granted) {
        case PermissionsAndroid.RESULTS.GRANTED:
          return true;
        case PermissionsAndroid.RESULTS.DENIED:

        case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:

        default:
          Messaging.showMessage({
            message: 'Warning',
            description:
              'Unable to launch camera, please check your permission setting for this app',
            type: Messaging.types.WARNING,
          });
          return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  },
};

export default Permissions;
