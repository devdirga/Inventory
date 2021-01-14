import {StyleSheet} from 'react-native';
import {color, font} from '../../../values';

export default StyleSheet.create({
  mainWrapper: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: 32,
    paddingTop: 16,
    flexDirection: 'column',
  },

  //#region header part
  headerWrapper: {
    backgroundColor: '#ffffff',
    marginTop: 8,
    marginBottom: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    height: 102,
    width: 102,
    borderRadius: 51,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: color.greyLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
    backgroundColor: 'white',
  },
  photoIconContainer: {
    position: 'absolute',
    height: 36,
    width: 36,
    borderRadius: 18,
    bottom: 4,
    right: 4,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.0,

    elevation: 6,
  },
  photoIcon: {
    color: color.textLight,
  },
  //#endregion

  inputContainer: {
    flex: 1,
  },

  loadingContainer: {
    justifyContent: 'center',
    ...StyleSheet.absoluteFill,
  },
  loadingContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 8,
  },
  loadingText: {
    fontSize: font.size.normal,
    color: color.textSecondary,
    marginLeft: 8,
  },
  loadingIndicator: {
    paddingTop: 16,
    paddingBottom: 32,
  },
});
