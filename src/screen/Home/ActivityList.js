import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import moment from 'moment';

import styles from './styles/activity-list';

const ActivityList = ({data, isLastIndex = false}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftIndicatorContainer}>
        <View style={styles.dotIndicator} />
        {!isLastIndex && <View style={styles.verticalLine} />}
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.activityText}>{data.activity}</Text>
        <Text style={styles.dateText}>
          {moment(data.date).format('DD MMM YYYY')}
        </Text>
      </View>
      <Text style={styles.timeText}>{moment(data.date).format('HH:mm')}</Text>
    </View>
  );
};

export default ActivityList;
