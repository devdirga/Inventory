import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, Keyboard } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Button from '../../components/Button';

import TextField from '../../components/TextField';

import { wrapperNoScroll } from '../../hoc';

import styles from './styles/login';
import { font, color } from '../../values';

import { connect } from 'react-redux';
import { authLogin, authClearAllState } from '../../store/action/auth';
import { Validator } from '../../common';

import { KEY_STORAGE_TOKEN } from '../../store/constant';
import { BASE_URL } from 'react-native-dotenv';

const LoginLayout = ({ navigation, authLogin, authClearAllState }) => {
  const [error, setError] = useState({
    username: null,
    password: null,
  });

  const [model, setModel] = useState({
    username: '',
    password: '',
  });

  const [showFooter, setShowFooter] = useState(true);

  let keyboardDidShowListener;
  let keyboardDidHideListener;

  useEffect(() => {
    Promise.all([AsyncStorage.getItem(KEY_STORAGE_TOKEN)]).then((res) => {
      let allInfoFulfilled = true;
      res.forEach((x, idx) => {
        allInfoFulfilled =
          allInfoFulfilled && (x !== undefined && x !== null ? true : false);
      });
      if (allInfoFulfilled) {
        navigation.replace('MainTab');
      } else {
        authClearAllState();
      }
    });
    keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow,
    );
    keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide,
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const _keyboardDidShow = () => {
    setShowFooter(false);
  };

  const _keyboardDidHide = () => {
    setShowFooter(true);
  };

  const methods = {
    forgotPassword: () => {
      navigation.navigate('Forgot');
    },
    signUp: () => {
      navigation.navigate('Register');
    },
    login: () => {
      let validationSuccess = true;
      let err = {};
      //#region validation
      if (!Validator.required(model.username)) {
        err.username = 'Username / Email is required';
        validationSuccess = false;
      }
      if (!Validator.required(model.password)) {
        err.password = 'Password is required';
        validationSuccess = false;
      }
      //#endregion

      if (!validationSuccess) {
        setError(err);
      } else {
        authLogin({ ...model, username: model.username.toLowerCase() });
      }
    },
  };

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/app-banner.png')}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextField
          label="NIPP"
          error={error.username}
          value={model.username}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => {
            setError({ ...error, username: null });
            setModel({ ...model, username: text });
          }}
        />
        <TextField
          label="Password"
          error={error.password}
          value={model.password}
          secureTextEntry={true}
          onChangeText={(text) => {
            setError({ ...error, password: null });
            setModel({ ...model, password: text });
          }}
        />

        <Button
          marginTop={14}
          text="LOGIN"
          color={color.primary}
          textColor="white"
          size="lg"
          paddingVertical={12}
          borderRadius={4}
          onPress={() => methods.login()}
        />

        {/* <TouchableOpacity
          style={styles.forgotPasswordContainer}
          activeOpacity={0.5}
          onPress={methods.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity> */}

      </View>
      {/* {showFooter && (
        <TouchableOpacity 
          style={styles.footerContainer} 
          activeOpacity={0.5}
          onPress={methods.signUp}>
          <Text style={styles.footerNonLink}>New to KARA?</Text>
          <Text style={styles.footerLink}>Sign Up</Text>
        </TouchableOpacity>
      )} */}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authLogin: (payload) => dispatch(authLogin(payload)),
    authClearAllState: () => dispatch(authClearAllState()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(wrapperNoScroll(LoginLayout));
