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
    paddingTop: 5,
    paddingBottom: 7,
    paddingHorizontal: 4,
  },
  valueItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  valueItem: {
    borderRadius: 4,
    backgroundColor: color.greyLightest,
    marginVertical: 4,
    marginHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  valueItemText: {
    paddingVertical: 4,
    paddingLeft: 8,
    fontSize: font.size.normal,
    color: color.textPrimary,
  },
  valueItemDeleteIconContainer: {
    paddingLeft: 8,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueItemDeleteIcon: {
    fontSize: font.size.smaller,
    color: color.textSecondary,
  },
  errorStyle: {
    paddingHorizontal: 4,
    marginTop: 4,
    fontSize: font.size.inputError,
    color: color.errorColor,
  },
});
