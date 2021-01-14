/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {AppState, Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import {KEY_STORAGE_TOKEN} from './store/constant';

import './config';

import RootStack from './navigation/RootStack';
import {navigationRef, isMountedRef} from './navigation/RootNavigation';
import {store} from './store';

import FlashMessage from 'react-native-flash-message';
import Alert from './components/Alert';

const App = () => {
  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  AppState.addEventListener('change', (state) => {
    const getDeepLinkUri = async () => {
      // Get the deep link used to open the app
      const urlFromBrowser = await Linking.getInitialURL();

      const token = await AsyncStorage.getItem(KEY_STORAGE_TOKEN);
      if (token == null && urlFromBrowser !== null) {
        let finding = urlFromBrowser.split('/');
        if (finding[finding.length - 2] == 'launch') {
          let incomingToken = finding[finding.length - 1];
          await AsyncStorage.setItem(KEY_STORAGE_TOKEN, incomingToken);
        }
      }
    };

    getDeepLinkUri();
  });

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <RootStack />
      </NavigationContainer>
      <FlashMessage position="top" animated={true} />
      <Alert />
    </Provider>
  );
};

export default App;
