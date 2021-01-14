import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl, Image, Dimensions, Button, Alert, BackHandler, DeviceEventEmitter } from 'react-native';

import { APP_VERSION } from 'react-native-dotenv';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { BASE_URL, BASEURL } from 'react-native-dotenv';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { Calculate, Helper } from '../../common';
import MenuButton from './MenuButton';
import ActivityList from './ActivityList';
import SinglePicker from '../../components/SinglePicker';
import styles from './styles/wikihomestyle';


import {
  activity as activityDummy,
  activityType as activityTypeDummy,
} from '../../store/dummy';
import {
  userSetEntity,
  userSetLocation,
  userGetMe,
  userGetLocations,
  userGetLocationList,
  userGetSubscription,
  userSetSubscriptionStatus,
} from '../../store/action/user';
import { entityGetList, entityGetByID } from '../../store/action/entity';
import { surveyGetByID } from '../../store/action/survey';
import { activityTypeGetList } from '../../store/action/activityType';
import { locationGetList } from '../../store/action/location';
import {
  activityGetRecentList,
  activityGetList,
} from '../../store/action/activity';
import { KEY_STORAGE_ENTITY, KEY_STORAGE_TOKEN } from '../../store/constant';
import { showAlert } from '../../components/Alert';

const HomeLayout = ({
  navigation,
  entityGetList,
  entityGetByID,
  activityTypeGetList,
  activityGetRecentList,
  activityGetList,
  userSetEntity,
  userSetLocation,
  userGetMe,
  userGetLocationList,
  userGetSubscription,
  userSetSubscriptionStatus,
  user,
  entity,
  activity,
  activityType,
  location,
  locationGetList,
  survey,
  surveyGetByID,
}) => {
  const refRBSheet = useRef();
  const [locationContainerHeight, setLocationContainerHeight] = useState(8);
  const [isUserLocationSelected, setIsUserLocationSelected] = useState(false)
  const [locations, setLocations] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [imgSource, setImgSource] = useState(require('../../assets/images/app-banner.png'));
  const { height } = Dimensions.get('window');

  useEffect(() => {
    if (user.picture) {
      setImgSource({ uri: `${BASEURL}employee/${user.username}.jpg` });
    } else {
      setImgSource(require('../../assets/images/app-banner.png'));
    }
  }, [user.picture, user.lastUpdatedDate]);
  useEffect(() => {
    let entityID = user.selectedEntity ? user.selectedEntity.id || '' : '';
    let userID = user.id
    // get current subscription
    if (entityID) {
      activityTypeGetList({ entityID: entityID, skip: 0, limit: 10, search: '' });
      // get current logged user's location list based on entity ID
      userGetLocationList({ userID: userID });
      if (user.id) {
        activityGetRecentList({ entityID: entityID, userID: user.id });
        activityGetList(
          {
            entityID: entityID,
            userID: user.id,
            skip: 0,
            limit: 20,
            search: '',
            locationID: '',
            startDate: '',
            endDate: '',
          },
          () => { },
          true,
        );
      }
    }
  }, [user.selectedEntity, user.id]);
  const methods = {
    refreshData: async () => {



      const entityProcess = async () => {
        // get survey data
        surveyGetByID(0, (response) => {
          setSurveys(response.success ? response.data : [])
        })
        // get selected entity from storage
        const setDefaultEntity = () => {
          entityGetList({ skip: 0, limit: 1, search: '' }, (response) => {
            methods.setEntity((response.success && response.data.length) ? response.data[0] : null)
          })
        }
        let entityID = await AsyncStorage.getItem(KEY_STORAGE_ENTITY);
        if (entityID) {
          entityGetByID(entityID, (response) => {
            if (response.success) {
              methods.setEntity(response.data);
            } else {
              setDefaultEntity();
            }
          })
        } else {
          setDefaultEntity();
        }

      };
      // get current logged in user
      userGetMe(entityProcess);
    },
    purchaseMsg: (msg, dialogOnly) => {
      let buttons = [];
      if (!dialogOnly) {
        buttons = [
          {
            text: 'Purchase',
            type: 'info',
            onPress: async () => {
              await methods.purchaseProcess();
            },
          },
          {
            text: 'Cancel',
            type: 'default',
            onPress: async () => { },
          },
        ];
      }
      showAlert({
        title: 'Warning',
        detail: msg,
        type: 'warning',
        buttons: buttons,
      });
    },
    purchaseProcess: async () => {
      let token = await AsyncStorage.getItem(KEY_STORAGE_TOKEN);
      navigation.navigate('Purchase', {
        token: token,
        refreshMethod: methods.refreshData,
      });
    },
    onLayoutLocationContainer: (e) => {
      setLocationContainerHeight(e.nativeEvent.layout.height);
    },
    setEntity: async (selectedData) => {
      if (!selectedData) {
        showAlert({
          title: 'Warning',
          detail: "You don't have any entity, some features might not be accessible",
          type: 'warning',
        });
        return;
      }
      let entityID = selectedData ? selectedData.id || '' : '';
      await AsyncStorage.setItem(KEY_STORAGE_ENTITY, entityID);
      userSetEntity(selectedData);
    },

    inKm: (distanceMeters) => {
      if (!isNaN(distanceMeters)) return (distanceMeters / 1000).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      return 0;
    },
    activityScreen: (activity, type) => {
      if (methods.checkSubscriptionStatus()) {
        //CheckDataISComplete
        if (user.location.name == '...') {
          showAlert({ title: 'Warning', detail: 'You have not been assigned in any location', type: 'warning' })
        } else {
          navigation.navigate(type, {
            title: activity.name,
            location: (type === 'Activity') ? user.location : surveys,
            isUserLocationSelected: isUserLocationSelected,
            user: user,
            activity,
            refreshMethod: methods.refreshAfterLogging,
          })
        }
      }
    },
    refreshAfterLogging: () => {
      let entityID = user.selectedEntity ? user.selectedEntity.id || '' : '';
      if (entityID && user.id) {
        activityGetRecentList({ entityID: entityID, userID: user.id });
        activityGetList({ entityID: entityID, userID: user.id, skip: 0, limit: 20, search: '', locationID: '', startDate: '', endDate: '' }, () => { },
          true,
        );
      }
    },
    showActionLog: () => {
      navigation.jumpTo('HistoryTab');
    },
    isCanScanQR: () => {
      let ownerID = user.selectedEntity && user.selectedEntity.owner ? user.selectedEntity.owner.id : '';
      if (user.id == ownerID) return true;
      if (
        user.selectedEntity &&
        user.selectedEntity.groups instanceof Array &&
        user.selectedEntity.groups.length
      ) {
        if (
          user.selectedEntity.groups.filter(
            (x) => x.name.toLowerCase() !== 'member',
          ).length
        ) {
          return true;
        }
      }
      return false;
    },
    IsThereSurvey: () => { return (surveys.length > 0) ? true : false },
    scanQR: () => {
      if (methods.checkSubscriptionStatus()) {
        navigation.navigate('ScanQR');
      }
    },
    daysLeft: () => {
      if (user.subscription && user.subscription.expiredDate) {
        return Calculate.daysLeft(user.subscription.expiredDate);
      }
      return 0;
    },
    subscriptionText: () => {
      let res =
        (user.subscription ? user.subscription.license.name : '') + ' - ';
      if (methods.daysLeft() > 0) {
        res +=
          methods.daysLeft() + ' ' + (methods.daysLeft() > 1 ? 'days' : 'day');
      } else {
        res += 'expired';
      }
      return res;
    },
    checkSubscriptionStatus: () => {
      switch (user.subscriptionStatus) {
        case 'expired':
          let ownerID =
            user.selectedEntity && user.selectedEntity.owner
              ? user.selectedEntity.owner.id
              : '';
          if (ownerID === user.id) {
            methods.purchaseMsg('Your subscription is expired', false);
          } else {
            methods.purchaseMsg(
              `Subscription for entity "${user.selectedEntity.name}" is expired`,
              true,
            );
          }
          return false;
        case 'none':
          methods.purchaseMsg('You are not subscribed to any license', false);
          return false;
        default:
          return true;
      }
    }
  }
  return (
    <>
      < ScrollView
        style={styles.mainWrapper}
        refreshControl={< RefreshControl refreshing={false} onRefresh={() => { methods.refreshData() }} />}>
        <RBSheet ref={refRBSheet} height={height / 2} openDuration={250}>
          <ScrollView>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 40, paddingHorizontal: 16, paddingTop: 16 }}>
              {activityType.list.map((row, idx) => {
                return (
                  <MenuButton
                    label={row.name} icon={row.icon} key={'sheet' + idx}
                    onPress={() => {
                      refRBSheet.current.close();
                      setTimeout(() => { methods.activityScreen(row, 'Activity') }, 400);
                    }}
                  />
                )
              })}
            </View>
          </ScrollView>
        </RBSheet>
        <View
          style={[styles.headerContainer, { paddingBottom: styles.headerContainer.paddingBottom + locationContainerHeight / 2 }]}>

          <View style={styles.subscriptionContainer}>
            <Text style={styles.subscriptionText}>{APP_VERSION}</Text>
          </View>
        </View>

        <View style={styles.MainContainer}>
          <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={() => { methods.scanQR() }}>
            <MaterialCommunityIcons name="qrcode-scan" style={styles.ImageIconStyle} size={23} />
            <View style={styles.SeparatorLine} />
            <Text style={styles.TextStyle}> Search by QRCODE </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={() => { methods.scanQR() }}>
            <MaterialCommunityIcons name="qrcode-scan" style={styles.ImageIconStyle} size={23} />
            <View style={styles.SeparatorLine} />
            <Text style={styles.TextStyle}> Update by QRCODE </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    entity: state.entity,
    activity: state.activity,
    activityType: state.activityType,
    location: state.location,
    survey: state.survey
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    entityGetList: (param, callback) =>
      dispatch(entityGetList(param, callback)),
    entityGetByID: (id, callback) => dispatch(entityGetByID(id, callback)),
    surveyGetByID: (id, callback) => dispatch(surveyGetByID(id, callback)),
    activityTypeGetList: (param, callback) =>
      dispatch(activityTypeGetList(param, callback)),
    activityGetRecentList: ({ entityID, userID }, callback) =>
      dispatch(activityGetRecentList({ entityID, userID }, callback)),
    activityGetList: ({ entityID, userID, skip, limit, search, locationID, startDate, endDate }, callBack, ignoreLoading) =>
      dispatch(activityGetList({ entityID, userID, skip, limit, search, locationID, startDate, endDate }, callBack, ignoreLoading)),
    userSetEntity: (selectedEntity) => dispatch(userSetEntity(selectedEntity)),
    userSetLocation: (location) => dispatch(userSetLocation(location)),
    userGetMe: (callback) => dispatch(userGetMe(callback)),
    userGetLocations: () => dispatch(userGetLocations()),
    userGetLocationList: (payload) => dispatch(userGetLocationList(payload)),
    userGetSubscription: (entityID, callback) =>
      dispatch(userGetSubscription(entityID, callback)),
    userSetSubscriptionStatus: (status) =>
      dispatch(userSetSubscriptionStatus(status)),
    locationGetList: (param, callback) =>
      dispatch(locationGetList(param, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeLayout);
