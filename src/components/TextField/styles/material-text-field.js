import {StyleSheet, StatusBar} from 'react-native';
import {color, font} from '../../../values';

export default StyleSheet.create({
  mainContainer: {
    marginVertical: 8,
    flexDirection: 'column',
  },
  labelStyle: {
    paddingHorizontal: 4,
  },
  inputStyle: {
    paddingTop: 0,
    paddingBottom: 4,
    paddingHorizontal: 4,
  },
  errorStyle: {
    paddingHorizontal: 4,
    fontSize: font.size.inputError,
    color: color.errorColor,
  },
});
