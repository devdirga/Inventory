import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {color} from '../../values';

const ListItem = ({onPress, text}) => {
  return (
    <View style={styles.item} onPress={() => onPress()}>
      <View style={styles.container}>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
    backgroundColor: color.greyLightest,
  },
  container: {
    borderBottomColor: 'rgba(0,0,0,.1)',
    borderBottomWidth: 1,
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 0,
  },
});

export default ListItem;
