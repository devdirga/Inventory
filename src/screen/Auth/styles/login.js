import {StyleSheet} from 'react-native';
import {color, font} from '../../../values';

export default StyleSheet.create({
  mainWrapper: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: 32,
    paddingTop: 64,
    flexDirection: 'column',
  },
  logoContainer: {
    flexDirection: 'row',
    minHeight: 100,
  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
    maxHeight: 100,
    marginBottom: 32,
  },
  inputContainer: {
    flex: 1,
  },
  forgotPasswordContainer: {
    marginVertical: 8,
    padding: 8,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: color.urlColor,
    fontSize: font.size.normal,
  },
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  footerNonLink: {
    color: color.textPrimary,
    fontSize: font.size.normal,
    marginHorizontal: 4,
  },
  footerLink: {
    color: color.urlColor,
    fontSize: font.size.normal,
    marginHorizontal: 4,
  },
});
