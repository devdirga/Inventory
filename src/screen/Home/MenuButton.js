import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import styles from './styles/menu-button';
import {color} from '../../values';
import Icon from 'react-native-vector-icons/FontAwesome5';

const MenuButton = ({
  label,
  icon,
  onPress,
  textColor = color.textPrimary,
  bgColor = color.primary,
  isMoreButton = false,
  style = {},
}) => {
  let textStyling = {
    color: textColor,
  };
  const theIcon = () => {
    let arr = icon ? icon.split(' ') : [];
    if (icon && !isMoreButton && arr.length > 1) {
      let iconName = arr[1].replace('fa-', '');
      if (arr[0] == 'fas') {
        return <Icon name={iconName} style={[styles.icon]} solid />;
      } else {
        return <Icon name={iconName} style={[styles.icon]} />;
      }
    } else if (isMoreButton) {
      return <Icon name="ellipsis-h" style={[styles.icon]} solid={true} />;
    }
    return <></>;
  };
  return (
    <TouchableOpacity
      style={{...styles.buttonIcon, ...style}}
      onPress={onPress}
      activeOpacity={0.5}>
      <View
        style={[
          styles.border,
          {
            backgroundColor: bgColor,
          },
        ]}>
        {theIcon()}
      </View>

      <Text
        style={{...styles.menuLabel, ...textStyling}}
        numberOfLines={2}
        ellipsizeMode="tail">
        {isMoreButton ? 'More' : label}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuButton;
