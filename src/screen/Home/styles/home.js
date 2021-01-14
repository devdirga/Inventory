import { StyleSheet } from 'react-native';
import { color, font } from '../../../values';

export default StyleSheet.create({
  mainWrapper: {
    backgroundColor: color.bgWindow,
    flex: 1,
  },
  //#region header part
  headerContainer: {
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 32,
    flexDirection: 'row',
    backgroundColor: color.primary,
    alignItems: 'center',
  },
  avatarContainer: {
    backgroundColor: 'white',
    width: 86,
    height: 86,
    borderRadius: 43,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: 'white',
  },
  greetingContainer: {
    marginLeft: 24,
    flexDirection: 'column',
    flex: 1,
  },
  fullNameText: {
    fontSize: font.size.bigger,
    fontWeight: 'bold',
    color: color.textLight,
  },
  entityContainer: {
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  entityIcon: {
    fontSize: font.size.bigger,
    color: color.textLight,
    marginRight: 8,
  },
  entityRightIcon: {
    fontSize: font.size.normal,
    color: color.textLight,
    marginLeft: 16,
  },
  entitySelected: {
    fontSize: font.size.bigger,
    color: color.textLight,
  },

  subscriptionContainer: {
    position: 'absolute',
    top: 5,
    right: 32,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
    backgroundColor: '#FFC700',
  },
  subscriptionText: {
    fontSize: font.size.smallest,
    color: color.textPrimary,
    fontWeight: '300',
  },
  surveyContainer: {
    position: 'absolute',
    top: 5,
    right: 80,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
    backgroundColor: '#FFC700',
  },
  surveyText: {
    fontSize: font.size.smallest,
    color: color.textPrimary,
    fontWeight: '300',
    backgroundColor: '#FFC700'
  },
  //#endregion

  //#region location part
  locationContainer: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 32,
    borderRadius: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.0,

    elevation: 8,

    zIndex: 1,
  },
  locationContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationPinContainer: {
    backgroundColor: color.greyLight,
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  locationPinIcon: {
    color: color.textPrimary,
    top: -2,
  },
  locationTextContainer: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 16,
  },
  locationTextCaption: {
    color: color.textSecondary,
    fontSize: font.size.normal,
  },
  locationTextValue: {
    color: color.textPrimary,
    fontSize: font.size.normal,
    fontWeight: 'bold',
  },
  locationIcon: {
    alignContent: 'center',
    alignItems: 'center',
    borderLeftColor: color.greyLightest,
    borderLeftWidth: 1,
    paddingLeft: 10,
  },
  locationIconRight: {
    color: color.primary,
  },
  locationIconRightText: {
    paddingTop: 2,
    fontSize: 10,
  },
  //#endregion

  //#region menu part
  menuContainer: {
    backgroundColor: '#ffffff',
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  //#endregion

  //#region activity part
  activityContainer: {
    backgroundColor: '#ffffff',
    marginTop: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  activityTitleContainer: {
    flexDirection: 'row',
  },
  activityTitleLeftContainer: {
    flex: 1,
  },
  activityTitleText: {
    fontSize: font.size.normal,
    fontWeight: 'bold',
    color: color.textPrimary,
  },
  activityTitleToday: {
    fontSize: font.size.normal,
    color: color.textPrimary,
  },
  activityTitleViewAllContainer: {
    padding: 8,
  },
  activityTitleViewAllText: {
    color: color.urlColor,
    fontSize: font.size.normal,
  },

  activityContent: {
    marginTop: 16,
    paddingVertical: 8,
  },
  //#endregion

  noDataContainer: {
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontWeight: '700',
    fontSize: font.size.normal,
    color: color.textSecondary,
  },
});
