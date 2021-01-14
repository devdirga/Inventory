import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl, Image } from 'react-native';
import { connect } from 'react-redux';
import { BASE_URL, BASEURL } from 'react-native-dotenv';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles/profile';
import ItemLabelValue from './components/ItemLabelValue';
import Button from '../../components/Button';
import { userGetMe } from '../../store/action/user';
import { authLogout } from '../../store/action/auth';
import { color } from '../../values';
const ProfileLayout = ({
  navigation,
  userGetMe,
  authLogout,
  user,
}) => {
  const [imgSource, setImgSource] = useState(
    require('../../assets/images/app-banner.png'),
  );
  const [
    floatingButtonContainerHeight,
    setFloatingButtonContainerHeight,
  ] = useState(8);

  useEffect(() => {
    if (user.picture) {
      setImgSource({
        uri: `${BASEURL}employee/${user.username}.jpg?last_updated_date=${user.lastUpdatedDate}`
      });
    } else {
      // setImgSource(require('../../assets/images/empty-avatar.png'));
    }
  }, [user.picture, user.lastUpdatedDate]);

  const methods = {
    refreshData: async () => {
      userGetMe();
    },
    changePassword: () => {
      navigation.navigate('ChangePassword');
    },
    editProfile: () => {
      // navigation.navigate('EditProfile');
    },
    onLayout: (e, type = 'floatingbutton') => {
      switch (type) {
        case 'floatingbutton':
          setFloatingButtonContainerHeight(e.nativeEvent.layout.height);
          break;
        default:
          break;
      }
    },
  };

  return (
    <View style={styles.mainWrapper}>
      {/*  */}
      <ScrollView
        style={styles.mainWrapper}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              methods.refreshData();
            }}
          />
        }>

        <Button
          marginTop={16}
          text="Logout"
          color={color.primary}
          textColor="white"
          size="lg"
          paddingVertical={12}
          borderRadius={4}
          marginLeft={32}
          marginRight={32}
          onPress={() => {
            authLogout();
          }}
        />
      </ScrollView>
      {/* <TouchableOpacity style={[
          styles.floatingButtonContainer,
          {
            width: floatingButtonContainerHeight,
            borderRadius: floatingButtonContainerHeight / 2,
          }
        ]} 
        activeOpacity={0.5}
        onPress={() => methods.editProfile()}
        onLayout={(e) => methods.onLayout(e, 'floatingbutton')}
      >
        <Icon style={styles.floatingButtonIcon} name='edit' />
      </TouchableOpacity> */}
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
    userGetMe: () => dispatch(userGetMe()),
    authLogout: () => dispatch(authLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLayout);
