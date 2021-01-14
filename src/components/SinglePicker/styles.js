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
  searchpanel: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchfield: {
    backgroundColor: 'white',
    flex: 1,
    paddingVertical: 0,
  },
  closepanel: {
    paddingLeft: 16,
  },
  closetext: {
    fontWeight: 'bold',
    color: color.textSecondary,
  },

  viewWrapper: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  clearContainer: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 14,
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  clearIcon: {
    fontSize: 16,
    color: color.textSecondary,
  },

  noDataContainer: {
    flex: 1,
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontWeight: '700',
    fontSize: font.size.normal,
    color: color.textSecondary,
  },
  loadingMoreContainer: {
    justifyContent: 'flex-end',
    ...StyleSheet.absoluteFill,
    // zIndex: 1,
  },
  loadingMoreContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 8,
  },
  loadingMoreText: {
    fontSize: font.size.normal,
    color: color.textSecondary,
    marginLeft: 8,
  },
  loadingIndicator: {
    paddingTop: 16,
    paddingBottom: 32,
  },
});
