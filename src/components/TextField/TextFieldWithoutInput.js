import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles/text-field-without-input';
import {font, color} from '../../values';
import Icon from 'react-native-vector-icons/FontAwesome5';

const TextFieldWithoutInput = ({
  fontSize,
  labelFontSize,
  textColor,
  baseColor,
  value,
  onDeleteItem,
  primaryId = 'id',
  captionField = 'id',
  label = '',
  error = '',
}) => {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const [errorText, setErrorText] = useState('');

  if (error != errorText) {
    setErrorText(error);
  }
  const methods = {
    isHasValue: () => {
      if (!value) {
        return false;
      }
      if (value instanceof Array) {
        return value.length > 0;
      }
      if (Object.keys(value).length <= 0) {
        return false;
      }
      return true;
    },
    renderValue: () => {
      if (value instanceof Array && value.length) {
        return (
          <View style={styles.valueItemWrapper}>
            {value.map((row, idx) => {
              return (
                <View key={`${row[primaryId]}-${idx}`} style={styles.valueItem}>
                  <Text style={styles.valueItemText}>{row[captionField]}</Text>
                  <TouchableOpacity
                    style={styles.valueItemDeleteIconContainer}
                    activeOpacity={0.5}
                    onPress={() => {
                      onDeleteItem(row);
                    }}>
                    <Icon style={styles.valueItemDeleteIcon} name="times" />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        );
      }
      return (
        <Text
          style={[
            styles.inputStyle,
            {
              fontSize: fontSize || font.size.normal,
              color: !methods.isHasValue()
                ? baseColor || color.materialBaseColor
                : textColor || color.textPrimary,
            },
          ]}>
          {!methods.isHasValue() ? label || '-' : value}
        </Text>
      );
    },
  };

  return (
    <View style={styles.mainContainer}>
      <View
        style={[
          styles.labelContainerStyle,
          {
            opacity: methods.isHasValue() ? 1 : 0,
          },
        ]}>
        <Text
          style={[
            styles.labelStyle,
            {
              fontSize: labelFontSize || font.size.inputLabel,
              color: errorText
                ? color.errorColor
                : baseColor || color.materialBaseColor,
            },
          ]}>
          {label}
        </Text>
      </View>
      <View
        style={[
          styles.inputContainerStyle,
          {
            borderWidth: errorText ? 1 : 0.5,
            borderColor: errorText
              ? color.errorColor
              : baseColor || color.materialBaseColor,
          },
        ]}>
        {methods.renderValue()}
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

export default TextFieldWithoutInput;
