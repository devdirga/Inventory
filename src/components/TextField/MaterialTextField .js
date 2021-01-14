import React, {useState, useEffect, useRef} from 'react';
import {Animated, View, Text, TextInput} from 'react-native';
import styles from './styles/material-text-field';
import {font, color} from '../../values';

const MaterialTextField = ({
  fontSize,
  labelFontSize,
  textColor,
  baseColor,
  tintColor,
  value,
  keyboardType,
  onChangeText,
  label = '',
  error = '',
  secureTextEntry = false,
}) => {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const [text, setText] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const localOnChangeText = (textInput) => {
    setText(textInput);
    if (onChangeText) {
      onChangeText(textInput);
    }
  };

  useEffect(() => {
    if (value) {
      setText(value);
    }

    return () => {};
  }, []);

  useEffect(() => {
    if (text) {
      fadeIn();
    } else {
      fadeOut();
    }
    return () => {};
  }, [text]);

  if (error != errorText) {
    setErrorText(error);
  }

  return (
    <View style={styles.mainContainer}>
      <Animated.Text
        style={[
          styles.labelStyle,
          {
            fontSize: labelFontSize || font.size.inputLabel,
            color: errorText
              ? color.errorColor
              : isFocus
              ? tintColor || color.materialTintColor
              : baseColor || color.materialBaseColor,
          },
          {
            opacity: fadeAnim,
          },
        ]}>
        {label}
      </Animated.Text>
      <TextInput
        style={[
          styles.inputStyle,
          {
            fontSize: fontSize || font.size.normal,
            color: textColor || color.textPrimary,
          },
        ]}
        placeholderTextColor={baseColor || color.materialBaseColor}
        onChangeText={localOnChangeText}
        onFocus={(event) => {
          setIsFocus(true);
        }}
        onBlur={(event) => {
          setIsFocus(false);
        }}
        placeholder={label || ''}
        keyboardType={keyboardType || 'default'}
        secureTextEntry={secureTextEntry}
      />

      <View
        style={{
          height: 2,
        }}>
        <View
          style={{
            height: errorText || isFocus ? 2 : 0.5,
            backgroundColor: errorText
              ? color.errorColor
              : isFocus
              ? tintColor || color.materialTintColor
              : baseColor || color.materialBaseColor,
          }}
        />
      </View>

      {!!errorText && (
        <Text
          style={[
            styles.errorStyle,
            {
              opacity: 1,
            },
          ]}>
          {errorText || ''}
        </Text>
      )}
    </View>
  );
};

export default MaterialTextField;
