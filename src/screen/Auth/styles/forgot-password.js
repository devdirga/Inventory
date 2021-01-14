import {StyleSheet} from 'react-native';
import {color, font} from '../../../values';

export default StyleSheet.create({
  mainWrapper: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: 32,
    flexDirection: 'column',
  },
  inputContainer: {
    flex: 1,
  },
  infoContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  infoText: {
    color: color.textPrimary,
    fontSize: font.size.normal,
    textAlign: 'center',
  },
});
