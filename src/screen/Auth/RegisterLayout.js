import React, {useState} from 'react';
import {Text, View} from 'react-native';

import DocumentPicker from 'react-native-document-picker';

import Button from '../../components/Button';

import TextField from '../../components/TextField';
import FilePicker from '../../components/FilePicker';

import {wrapper} from '../../hoc';

import styles from './styles/register';
import {font, color} from '../../values';

import {connect} from 'react-redux';
import {authRegister} from '../../store/action/auth';
import {Validator, Messaging} from '../../common';

const RegisterLayout = ({navigation, authRegister}) => {
  const [error, setError] = useState({
    username: null,
    email: null,
    newPassword: null,
    confirmPassword: null,
    firstName: null,
    lastName: null,
    address: null,
    picture: null,
    phoneNumber: null,
    position: null,
  });

  const [model, setModel] = useState({
    username: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    address: '',
    picture: '',
    phoneNumber: '',
    position: '',
  });

  const methods = {
    registerResponseHandler: (response) => {
      if (response.success) {
        Messaging.showMessage({
          message: 'Registration Success',
          type: Messaging.types.SUCCESS,
        });
        navigation.goBack();
      } else {
        Messaging.showMessage({
          message: response.message,
          type: Messaging.types.DANGER,
        });
      }
    },
    doRegister: () => {
      let validationSuccess = true;
      let err = {};
      //#region validation
      if (!Validator.required(model.username)) {
        err.username = 'Username is required';
        validationSuccess = false;
      } else {
        if (!Validator.min(model.username, 5)) {
          err.username = 'Username must be at least 5 characters';
          validationSuccess = false;
        }
      }
      if (!Validator.required(model.email)) {
        err.email = 'Email is required';
        validationSuccess = false;
      } else {
        if (!Validator.email(model.email)) {
          err.email = 'Email is not valid';
          validationSuccess = false;
        }
      }
      if (!Validator.required(model.newPassword)) {
        err.newPassword = 'Password is required';
        validationSuccess = false;
      }
      if (!Validator.required(model.confirmPassword)) {
        err.confirmPassword = 'Confirm Password is required';
        validationSuccess = false;
      } else {
        if (model.newPassword !== model.confirmPassword) {
          err.confirmPassword = "Confirm Password doesn't match with Password";
          validationSuccess = false;
        }
      }
      if (!Validator.required(model.firstName)) {
        err.firstName = 'First Name is required';
        validationSuccess = false;
      } else {
        if (!Validator.min(model.firstName, 2)) {
          err.firstName = 'First Name must be at least 2 characters';
          validationSuccess = false;
        }
      }
      if (!Validator.required(model.lastName)) {
        err.lastName = 'Last Name is required';
        validationSuccess = false;
      } else {
        if (!Validator.min(model.lastName, 2)) {
          err.lastName = 'Last Name must be at least 2 characters';
          validationSuccess = false;
        }
      }
      if (!Validator.required(model.address)) {
        err.address = 'Address is required';
        validationSuccess = false;
      }
      if (!Validator.required(model.phoneNumber)) {
        err.phoneNumber = 'Phone Number is required';
        validationSuccess = false;
      } else {
        if (!Validator.phone(model.phoneNumber)) {
          err.phoneNumber = 'Phone Number is not valid';
          validationSuccess = false;
        } else if (!Validator.min(model.phoneNumber, 6)) {
          err.phoneNumber = 'Phone Number must be at least 6 characters';
          validationSuccess = false;
        }
      }

      //#endregion

      if (!validationSuccess) {
        setError(err);
      } else {
        authRegister(
          {
            ...model,
            username: model.username.toLowerCase(),
            email: model.email.toLowerCase(),
          },
          methods.registerResponseHandler,
        );
      }
    },
  };

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.inputContainer}>
        <TextField
          label="Username"
          error={error.username}
          value={model.username}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => {
            setError({...error, username: null});
            setModel({...model, username: text});
          }}
        />
        <TextField
          label="Email"
          error={error.email}
          value={model.email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => {
            setError({...error, email: null});
            setModel({...model, email: text});
          }}
        />
        <TextField
          label="Password"
          error={error.newPassword}
          value={model.newPassword}
          secureTextEntry={true}
          onChangeText={(text) => {
            setError({...error, newPassword: null});
            setModel({...model, newPassword: text});
          }}
        />
        <TextField
          label="Confirm Password"
          error={error.confirmPassword}
          value={model.confirmPassword}
          secureTextEntry={true}
          onChangeText={(text) => {
            setError({...error, confirmPassword: null});
            setModel({...model, confirmPassword: text});
          }}
        />
        <TextField
          label="First Name"
          error={error.firstName}
          value={model.firstName}
          onChangeText={(text) => {
            setError({...error, firstName: null});
            setModel({...model, firstName: text});
          }}
        />
        <TextField
          label="Last Name"
          error={error.lastName}
          value={model.lastName}
          onChangeText={(text) => {
            setError({...error, lastName: null});
            setModel({...model, lastName: text});
          }}
        />
        <TextField
          label="Address"
          error={error.address}
          value={model.address}
          multiline={true}
          onChangeText={(text) => {
            setError({...error, address: null});
            setModel({...model, address: text});
          }}
        />
        <TextField
          label="Phone Number"
          keyboardType="phone-pad"
          error={error.phoneNumber}
          value={model.phoneNumber}
          onChangeText={(text) => {
            setError({...error, phoneNumber: null});
            setModel({...model, phoneNumber: text});
          }}
        />
        <TextField
          label="Position"
          error={error.position}
          value={model.position}
          onChangeText={(text) => {
            setError({...error, position: null});
            setModel({...model, position: text});
          }}
        />
        <FilePicker
          label="Picture"
          error={error.picture}
          documentTypes={[DocumentPicker.types.images]}
          isMultiple={false}
          onChange={(val) => {
            setError({...error, picture: null});
            setModel({
              ...model,
              picture: val.fileName,
              logoContent: val.base64,
              logoMIME: val.fileType,
            });
            // setModel({...model, picture: val});
          }}
        />

        <Button
          marginTop={14}
          text="Register"
          color={color.primary}
          textColor="white"
          size="lg"
          paddingVertical={12}
          borderRadius={4}
          onPress={() => methods.doRegister()}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    authRegister: (payload, callback) =>
      dispatch(authRegister(payload, callback)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(wrapper(RegisterLayout));
