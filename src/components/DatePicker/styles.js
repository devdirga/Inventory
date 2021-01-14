import {StyleSheet, StatusBar} from 'react-native';
import {color, font} from '../../values';

export default StyleSheet.create({
  wrapper: {
    // ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    // paddingTop: StatusBar.currentHeight,
    zIndex: 99,
    elevation: 99,
  },
  viewWrapper: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  clearDateContainer: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 14,
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  clearDateIcon: {
    fontSize: 16,
    color: color.textSecondary,
  },
  titleContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: color.greyLight,
  },
  title: {
    fontSize: font.size.bigger,
    color: color.textSecondary,
    fontWeight: 'bold',
  },
  closeContainer: {
    position: 'absolute',
    right: 0,
    padding: 16,
  },
  closeIcon: {
    fontSize: 20,
    color: color.textSecondary,
    fontWeight: '100',
  },
  mainContainer: {
    padding: 16,
    paddingTop: 0,
  },
});
