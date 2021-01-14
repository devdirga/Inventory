import {StyleSheet, StatusBar} from 'react-native';
import {color, font} from '../../../values';

export default StyleSheet.create({
  mainContainer: {
    marginBottom: 8,
    flexDirection: 'column',
    top: -6,
  },
  labelContainerStyle: {
    flexDirection: 'row',
    top: 6,
    marginLeft: 6,
    zIndex: 1,
  },
  labelStyle: {
    paddingHorizontal: 4,
    backgroundColor: 'white',
  },
  inputContainerStyle: {
    borderStyle: 'solid',
    borderRadius: 4,
    borderWidth: 0.5,
    paddingBottom: 4,
    paddingTop: 6,
    paddingHorizontal: 8,
  },
  inputStyle: {
    paddingTop: 0,
    paddingBottom: 4,
    paddingHorizontal: 4,
  },
  errorStyle: {
    paddingHorizontal: 4,
    marginTop: 4,
    fontSize: font.size.inputError,
    color: color.errorColor,
  },
});
