import React, {useState} from 'react';
import {Text, View} from 'react-native';

import Button from '../../components/Button';
import TextField from '../../components/TextField';

import {Messaging, Validator} from '../../common';

import {wrapperNoScroll} from '../../hoc';

import styles from './styles/forgot-password';
import {font, color} from '../../values';

import {connect} from 'react-redux';
import {authForgotPassword} from '../../store/action/auth';

const ForgtPasswordLayout = ({navigation, authForgotPassword}) => {
  const [error, setError] = useState({
    username: null,
  });

  const [model, setModel] = useState({
    username: '',
  });

  const methods = {
    forgot: () => {
      let validationSuccess = true;
      let err = {};
      //#region validation
      if (!Validator.required(model.username)) {
        err.username = 'Username / Email is required';
        validationSuccess = false;
      }
      //#endregion

      if (!validationSuccess) {
        setError(err);
      } else {
        authForgotPassword(
          {...model, username: model.username.toLowerCase()},
          methods.forgotPassResponseHandler,
        );
      }
    },
    forgotPassResponseHandler: (response) => {
      if (response.success) {
        Messaging.showMessage({
          message: 'You will receive a link to create a new password',
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
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Please enter your email address</Text>
        <Text style={styles.infoText}>
          you will receive a link to create a new password
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextField
          label="Username / Your Email"
          error={error.username}
          value={model.username}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => {
            setError({...error, username: null});
            setModel({...model, username: text});
          }}
        />

        <Button
          marginTop={14}
          text="Send"
          color={color.primary}
          textColor="white"
          size="lg"
          paddingVertical={12}
          borderRadius={4}
          onPress={() => methods.forgot()}
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
    authForgotPassword: (payload, callback) =>
      dispatch(authForgotPassword(payload, callback)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(wrapperNoScroll(ForgtPasswordLayout));
