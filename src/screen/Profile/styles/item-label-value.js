import {StyleSheet} from 'react-native';
import {color, font} from '../../../values';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
  },
  theContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  line: {
    height: 0.5,
    backgroundColor: color.greyLight,
  },
  captionText: {
    color: color.textPrimary,
    fontSize: font.size.normal,
    flex: 1,
  },
  valueText: {
    color: color.textPrimary,
    fontSize: font.size.normal,
  },
});
