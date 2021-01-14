import {StyleSheet} from 'react-native';
import {color} from '../../../values';

export default StyleSheet.create({
  buttonIcon: {
    alignContent: 'center',
    flexBasis: '33.33333%',
    marginVertical: 8,
    paddingHorizontal: 4,
  },
  border: {
    borderRadius: 16,
    padding: 16,
    height: 80,
    width: 80,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    marginTop: 4,
    textAlign: 'center',
  },
  icon: {
    color: color.textLight,
    fontSize: 36,
  },
});
