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
    flexDirection: 'row',
    borderStyle: 'solid',
    borderRadius: 4,
    borderWidth: 0.5,
    backgroundColor: color.greyLightest,
    // paddingBottom: 4,
    // paddingTop: 6,
    // paddingHorizontal: 8,
  },
  fileListContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  placeHolderStyle: {
    marginVertical: 4,
    marginHorizontal: 4,
  },
  attachmentItem: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: color.greyLightest,
    marginVertical: 4,
    marginHorizontal: 4,
  },
  attachmentItemText: {
    fontSize: font.size.smaller,
    color: color.textPrimary,
  },
  selectFile: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectFileText: {
    fontSize: font.size.normal,
    color: color.textPrimary,
  },
  errorStyle: {
    paddingHorizontal: 4,
    marginTop: 4,
    fontSize: font.size.inputError,
    color: color.errorColor,
  },
});
