import {StyleSheet} from 'react-native';
import {color, font} from '../../../values';

export default StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
  },
  leftIndicatorContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 16,
  },
  dotIndicator: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: color.greyLight,
  },
  verticalLine: {
    flex: 1,
    backgroundColor: color.greyLight,
    width: 1,
  },

  middleContainer: {
    flexDirection: 'column',
    flex: 1,
    top: -4,
    paddingBottom: 16,
  },
  activityText: {
    fontSize: font.size.normal,
    fontWeight: 'bold',
    color: color.textPrimary,
  },
  dateText: {
    fontSize: font.size.normal,
    color: color.textPrimary,
  },

  timeText: {
    fontSize: font.size.normal,
    color: color.textPrimary,
  },
});
