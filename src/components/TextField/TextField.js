import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, Text, TextInput } from 'react-native';
import styles from './styles/text-field';
import { font, color } from '../../values';

const TextField = ({
  fontSize,
  labelFontSize,
  textColor,
  baseColor,
  tintColor,
  value,
  keyboardType,
  autoCapitalize,
  onChangeText,
  label = '',
  error = '',
  secureTextEntry = false,
  multiline = false,
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

    return () => { };
  }, []);

  useEffect(() => {
    if (text) {
      fadeIn();
    } else {
      fadeOut();
    }
    return () => { };
  }, [text]);

  if (error != errorText) {
    setErrorText(error);
  }

  return (
    <View style={styles.mainContainer}>
      <Animated.View
        style={[
          styles.labelContainerStyle,
          {
            opacity: fadeAnim,
          },
        ]}>
        <Text
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
          ]}>
          {label}
        </Text>
      </Animated.View>
      <View
        style={[
          styles.inputContainerStyle,
          {
            borderWidth: errorText || isFocus ? 1 : 0.5,
            borderColor: errorText
              ? color.errorColor
              : isFocus
                ? tintColor || color.materialTintColor
                : baseColor || color.materialBaseColor,
          },
        ]}>
        <TextInput
          style={[
            styles.inputStyle,
            {
              fontSize: fontSize || font.size.normal,
              color: textColor || color.textPrimary,
            },
          ]}
          multiline={multiline}
          placeholderTextColor={baseColor || color.materialBaseColor}
          value={value}
          onChangeText={localOnChangeText}
          onFocus={(event) => {
            setIsFocus(true);
          }}
          onBlur={(event) => {
            setIsFocus(false);
          }}
          placeholder={label || ''}
          autoCapitalize={autoCapitalize || 'sentences'}
          keyboardType={keyboardType || 'default'}
          secureTextEntry={secureTextEntry}
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

export default TextField;
