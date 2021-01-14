import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {font, color} from '../../values';

const ListItem = ({
  onPress,
  text,
  item,
  id,
  selectedIDs = [],
  isMultiple = false,
  isAHint = false,
  textStyle = {},
}) => {
  const isSelected = () => {
    if (!isMultiple) {
      return false;
    }
    if (selectedIDs.indexOf(id) < 0) {
      return false;
    }
    return true;
  };
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress()}>
      <View style={[styles.container, isAHint ? styles.hintContainer : {}]}>
        {isAHint && (
          <Text style={styles.addNewText}>Tap / hit enter to add</Text>
        )}
        <Text style={[styles.theText, textStyle]}>{text}</Text>
        {isSelected() && <Icon style={styles.theIcon} name="check" />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 0,
  },
  container: {
    borderBottomColor: 'rgba(0,0,0,.1)',
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hintContainer: {
    backgroundColor: '#EEEEEE',
  },
  addNewText: {
    fontSize: font.size.normal,
    color: color.urlColor,
    fontStyle: 'italic',
    marginRight: 8,
  },
  theText: {
    fontSize: font.size.normal,
    color: color.textPrimary,
    flex: 1,
  },
  theIcon: {
    fontSize: font.size.normal,
    color: color.accent,
  },
});

export default ListItem;
