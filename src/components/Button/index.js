import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const Button = ({
  text,
  onPress,
  textColor = 'rgba(0,0,0,.7)',
  color = 'white',
  outline = false,
  marginLeft = 0,
  marginRight = 0,
  marginBottom = 0,
  marginTop = 0,
  size = 'sm',
  borderRadius = 3,
  paddingHorizontal = null,
  paddingVertical = null,
  containerStyle = {},
}) => {
  let buttonStyling = {
    backgroundColor: color,
    marginLeft,
    marginBottom,
    marginRight,
    marginTop,
    borderRadius,
  };
  let textStyling = {color: textColor, fontSize: 12, fontWeight: 'normal'};

  if (outline) {
    buttonStyling.borderColor = color;
    buttonStyling.borderWidth = StyleSheet.hairlineWidth;
    buttonStyling.backgroundColor = 'transparent';
  }

  buttonStyling.paddingHorizontal = 8;
  buttonStyling.paddingVertical = 4;
  if (size == 'md') {
    buttonStyling.paddingHorizontal = 16;
    buttonStyling.paddingVertical = 8;
    textStyling.fontSize = 14;
  } else if (size == 'lg') {
    buttonStyling.paddingHorizontal = 16;
    buttonStyling.paddingVertical = 16;
    textStyling.fontSize = 14;
    textStyling.fontWeight = 'bold';
  }
  if (paddingHorizontal && !isNaN(paddingHorizontal)) {
    buttonStyling.paddingHorizontal = paddingHorizontal;
  }
  if (paddingVertical && !isNaN(paddingVertical)) {
    buttonStyling.paddingVertical = paddingVertical;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={{...buttonStyling, ...styles.button, ...containerStyle}}>
      <Text style={{...textStyling, ...styles.text}}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {},
});

export default Button;
