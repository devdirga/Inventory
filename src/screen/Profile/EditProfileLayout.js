import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import CaptureImage from '../../components/CaptureImage';
import { showAlert } from '../../components/Alert';

import { BASE_URL } from 'react-native-dotenv';

import Button from '../../components/Button';
import TextField from '../../components/TextField';

import { Messaging, Validator, Permissions } from '../../common';

import { wrapper } from '../../hoc';

import styles from './styles/edit-profile';
import { color } from '../../values';

import { connect } from 'react-redux';
import { userChangeProfile, userGetMe } from '../../store/action/user';

const EditProfileLayout = ({
  navigation,
  userChangeProfile,
  userGetMe,

  user,
}) => {
  const [imgSource, setImgSource] = useState(
    require('../../assets/images/app-banner.png'),
  );

  const [randomKey, setRandomKey] = useState(Math.random());

  const [error, setError] = useState({
    username: null,
    email: null,
    phoneNumber: null,
    firstName: null,
    lastName: null,
    address: null,
    position: null,
  });

  const [model, setModel] = useState({
    id: '',
    username: '',
    email: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    address: '',
    position: '',
    picture: '',
  });

  const [isLoadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    setModel({
      ...model,
      id: user.id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      position: user.position,
      picture: user.picture,
    });

    if (user.picture) {
      setImgSource({
        uri: `${BASE_URL}file/${user.picture}?last_updated_date=${user.lastUpdatedDate}`,
      });
    }
    setRandomKey(Math.random());
    setLoadingImage(false);
  }, []);

  const methods = {
    save: () => {
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
      if (!Validator.required(model.firstName)) {
        err.firstName = 'First Name is required';
        validationSuccess = false;
      } else {
        if (!Validator.min(model.firstName, 2)) {
          err.firstName = 'First Name be at least 2 characters';
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
      if (!Validator.required(model.phoneNumber)) {
        err.phoneNumber = 'Phone Number is required';
        validationSuccess = false;
      } else {
        if (!Validator.phone(model.phoneNumber)) {
          err.phoneNumber = 'Phone Number is not valid';
          validationSuccess = false;
        } else if (!Validator.min(model.phoneNumber, 5)) {
          err.phoneNumber = 'Phone Number must be at least 5 characters';
          validationSuccess = false;
        }
      }
      if (!Validator.required(model.address)) {
        err.address = 'Address is required';
        validationSuccess = false;
      }
      //#endregion

      if (!validationSuccess) {
        setError(err);
      } else {
        userChangeProfile(
          {
            ...model,
            username: model.username.toLowerCase(),
            email: model.email.toLowerCase(),
          },
          methods.editProfileResponseHandler,
        );
      }
    },
    editProfileResponseHandler: (response) => {
      if (response.success) {
        Messaging.showMessage({
          message: 'Profile successfully updated',
          type: Messaging.types.SUCCESS,
        });
        userGetMe();
        navigation.goBack();
      } else {
        Messaging.showMessage({
          message: response.message,
          type: Messaging.types.DANGER,
        });
      }
    },
    pickImage: async () => {
      setLoadingImage(true);
      CaptureImage({
        customButtons: [],
        cameraType: 'front',
        mediaType: 'photo',
      })
        .then((res) => {
          setLoadingImage(false);
          if (!res.success) {
            return;
          }

          setModel({
            ...model,
            picture: res.fileName,
            logoContent: res.logoContent,
            logoMIME: res.logoMIME,
          });
          setImgSource({
            uri: res.uri,
          });
        })
        .catch((err) => {
          setLoadingImage(false);
          showAlert({
            title: 'Error',
            detail: err.message,
            type: 'danger',
          });
        });
    },
  };

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.headerWrapper}>
        <View style={[styles.headerContainer]}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={imgSource} />
            <TouchableOpacity
              style={styles.photoIconContainer}
              activeOpacity={0.7}
              onPress={() => methods.pickImage()}>
              <Icon name="camera" style={styles.photoIcon} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {isLoadingImage && (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingContent}>
            <ActivityIndicator size="small" color={color.accent} />
            <Text style={styles.loadingText}>Loading ...</Text>
          </View>
        </View>
      )}
      {!isLoadingImage && (
        <View style={styles.inputContainer} key={randomKey}>
          <TextField
            label="Username"
            error={error.username}
            value={model.username}
            autoCapitalize="none"
            onChangeText={(text) => {
              setError({ ...error, username: null });
              setModel({ ...model, username: text });
            }}
          />
          <TextField
            label="Email"
            error={error.email}
            value={model.email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => {
              setError({ ...error, email: null });
              setModel({ ...model, email: text });
            }}
          />
          <TextField
            label="Phone Number"
            keyboardType="phone-pad"
            error={error.phoneNumber}
            value={model.phoneNumber}
            onChangeText={(text) => {
              setError({ ...error, phoneNumber: null });
              setModel({ ...model, phoneNumber: text });
            }}
          />
          <TextField
            label="First Name"
            error={error.firstName}
            value={model.firstName}
            onChangeText={(text) => {
              setError({ ...error, firstName: null });
              setModel({ ...model, firstName: text });
            }}
          />
          <TextField
            label="Last Name"
            error={error.lastName}
            value={model.lastName}
            onChangeText={(text) => {
              setError({ ...error, lastName: null });
              setModel({ ...model, lastName: text });
            }}
          />
          <TextField
            label="Address"
            error={error.address}
            value={model.address}
            multiline={true}
            onChangeText={(text) => {
              setError({ ...error, address: null });
              setModel({ ...model, address: text });
            }}
          />
          <TextField
            label="Position"
            error={error.position}
            value={model.position}
            onChangeText={(text) => {
              setError({ ...error, position: null });
              setModel({ ...model, position: text });
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
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userChangeProfile: (payload, callback) =>
      dispatch(userChangeProfile(payload, callback)),
    userGetMe: () => dispatch(userGetMe()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(wrapper(EditProfileLayout));
