import React, {useState} from 'react';
import {Text, View} from 'react-native';

import Button from '../../components/Button';
import TextField from '../../components/TextField';

import {Messaging, Validator} from '../../common';

import {wrapperNoScroll} from '../../hoc';

import styles from './styles/change-password';
import {font, color} from '../../values';

import {connect} from 'react-redux';
import {userChangePassword} from '../../store/action/user';

const ChangePasswordLayout = ({navigation, userChangePassword}) => {
  const [error, setError] = useState({
    oldPassword: null,
    newPassword: null,
    confirmPassword: null,
  });

  const [model, setModel] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const methods = {
    save: () => {
      let validationSuccess = true;
      let err = {};
      //#region validation
      if (!Validator.required(model.oldPassword)) {
        err.oldPassword = 'Current Password is required';
        validationSuccess = false;
      }
      if (!Validator.required(model.newPassword)) {
        err.newPassword = 'New Password is required';
        validationSuccess = false;
      }
      if (!Validator.required(model.confirmPassword)) {
        err.confirmPassword = 'Confirm Password is required';
        validationSuccess = false;
      } else {
        if (model.newPassword !== model.confirmPassword) {
          err.confirmPassword =
            "Confirm Password doesn't match with New Password";
          validationSuccess = false;
        }
      }
      if (validationSuccess) {
        if (model.oldPassword == model.newPassword) {
          err.newPassword =
            'Your new password cannot be the same as your current password';
          validationSuccess = false;
        }
      }
      //#endregion

      if (!validationSuccess) {
        setError(err);
      } else {
        userChangePassword({...model}, methods.changePassResponseHandler);
      }
    },
    changePassResponseHandler: (response) => {
      if (response.success) {
        Messaging.showMessage({
          message: 'Password successfully changed',
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
  };

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.inputContainer}>
        <TextField
          label="Current Password"
          error={error.oldPassword}
          value={model.oldPassword}
          secureTextEntry={true}
          onChangeText={(text) => {
            setError({...error, oldPassword: null});
            setModel({...model, oldPassword: text});
          }}
        />

        <TextField
          label="New Password"
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

        <Button
          marginTop={14}
          text="Save"
          color={color.primary}
          textColor="white"
          size="lg"
          paddingVertical={12}
          borderRadius={4}
          onPress={() => methods.save()}
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
    userChangePassword: (payload, callback) =>
      dispatch(userChangePassword(payload, callback)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(wrapperNoScroll(ChangePasswordLayout));
