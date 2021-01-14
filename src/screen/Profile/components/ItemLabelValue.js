import React from 'react';
import {View, Text} from 'react-native';
import styles from '../styles/item-label-value';

const ItemLabelValue = ({label, value}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.line} />
      <View style={styles.theContainer}>
        <Text style={styles.captionText}>{label}</Text>
        <Text style={styles.valueText}>{value}</Text>
      </View>

      <View style={styles.line} />
    </View>
  );
};

export default ItemLabelValue;
