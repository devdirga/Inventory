import {StyleSheet} from 'react-native';
import {color, font} from '../../../values';

export default StyleSheet.create({
  mainWrapper: {
    backgroundColor: color.bgWindow,
    flex: 1,
  },
  //#region header part
  headerWrapper: {
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 1.0,

    // elevation: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    height: 82,
    width: 82,
    borderRadius: 41,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: color.greyLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 40,
    backgroundColor: 'white',
  },
  headerInfoContainer: {
    marginLeft: 24,
    flexDirection: 'column',
    flex: 1,
  },
  userFullname: {
    fontSize: font.size.bigger,
    fontWeight: 'bold',
    color: color.textPrimary,
  },
  userPosition: {
    fontSize: font.size.normal,
    color: color.textPrimary,
  },
  userLocationContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationPinContainer: {
    marginRight: 8,
    backgroundColor: color.greyLight,
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  locationPinIcon: {
    color: color.textLight,
    top: -1,
  },
  userLocation: {
    color: color.textPrimary,
    marginRight: 32,
    fontSize: font.size.normal,
  },
  //#endregion

  //#region information
  informationContainer: {
    backgroundColor: '#ffffff',
    marginTop: 16,
  },
  informationTitle: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    color: color.textPrimary,
    fontWeight: 'bold',
    fontSize: font.size.normal,
  },
  // editProfileContainer: {
  //   flexDirection: 'row-reverse'
  // },
  // editProfileTouchable: {
  //   paddingVertical: 16,
  //   paddingHorizontal: 32
  // },
  // editProfileText: {
  //   color: color.urlColor,
  //   fontSize: font.size.normal
  // }

  editProfileTouchable: {
    position: 'absolute',
    top: 50,
    right: 16,
    zIndex: 1,
    padding: 8,
  },
  editProfileIcon: {
    color: color.primaryDark,
    fontSize: 24,
  },

  // floatingButtonContainer: {
  //   position: 'absolute',
  //   bottom: 16,
  //   right: 16,
  //   padding: 16,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: color.accent
  // },
  // floatingButtonIcon: {
  //   fontSize: 24,
  //   color: color.textLight
  // }

  //#endregion
});
