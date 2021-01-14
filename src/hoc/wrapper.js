import React, {memo} from 'react';
import {
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import {color} from '../values';

import {connect} from 'react-redux';

const Wrapper = (WrappedComponent) => {
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
      <>
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
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
            }}>
            <WrappedComponent {...props} />
          </ScrollView>
        </SafeAreaView>
      </>
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

export default Wrapper;

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
