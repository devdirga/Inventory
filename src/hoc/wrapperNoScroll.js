import React, {Fragment, memo} from 'react';
import {
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {color} from '../values';

import {connect} from 'react-redux';

const wrapperNoScroll = (WrappedComponent) => {
  const container = memo((props) => {
    const isLoading = () => {
      return (
        props.loading.activity ||
        props.loading.activityType ||
        props.loading.auth ||
        props.loading.entity ||
        props.loading.user ||
        props.loading.event
      );
    };
    return (
      <Fragment>
        <StatusBar backgroundColor={color.statusBar} barStyle="light-content" />
        <SafeAreaView style={{flex: 0, backgroundColor: color.statusBar}} />
        <SafeAreaView style={{flex: 1}}>
          {isLoading() && (
            <View style={styles.overlay}>
              <View style={styles.center}>
                <View style={styles.innerCenter}>
                  <ActivityIndicator size="large" color={color.accent} />
                </View>
                <View style={styles.innerCenter}>
                  <Text style={styles.loadingText}>L O A D I N G</Text>
                </View>
              </View>
            </View>
          )}
          <WrappedComponent {...props} />
        </SafeAreaView>
      </Fragment>
    );
  });

  const mapStateToProps = (state) => {
    return {
      loading: {
        activity: state.activity.loading,
        activityType: state.activityType.loading,
        auth: state.auth.loading,
        entity: state.entity.loading,
        user: state.user.loading,
        event: state.event.loading,
      },
    };
  };

  return connect(mapStateToProps, null)(container);
};

export default wrapperNoScroll;

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    backgroundColor: color.bgWindow,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    margin: 16,
  },
  innerCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  loadingText: {
    color: color.textSecondary,
    textAlign: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    top: 0,
    backgroundColor: '#000000' + '7f',
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
