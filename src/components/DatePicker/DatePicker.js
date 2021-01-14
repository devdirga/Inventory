import React, { useState, useEffect, memo } from 'react';
import { Modal, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './styles';

import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Calendar as RNCalendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';

import TextFieldWithoutInput from '../TextField/TextFieldWithoutInput';

const DEFAULT_DATE_FORMAT = 'DD MMM YYYY';
const DEFAULT_TIME_FORMAT = 'HH:mm';
const DEFAULT_DATE_TIME_FORMAT = 'DD MMM YYYY HH:mm';

const DatePicker = ({
  onSelect,
  containerStyle = {},
  value,
  mode = 'date',
  label = '',
  error = '',
}) => {
  const [showList, setShowList] = useState(false);

  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState(new Date());

  const [errorText, setErrorText] = useState('');
  const [currentMode, setCurrentMode] = useState('date');

  const methods = {
    onDateSelected: (day) => {
      setSelectedDate(day.dateString);
      if (mode == 'date') {
        onSelect(day.dateString);
        setShowList(false);
      }
      if (mode == 'datetime') {
        setCurrentMode('time');
      }
    },
    onTimeSelected: (event, selected) => {
      if (!selected) {
        if (mode == 'datetime') {
          setCurrentMode('date');
        }
      } else {
        let result = '';
        if (mode == 'datetime') {
          result = moment(
            `${selectedDate} ${moment(selected).format('HH:mm:00')}`,
          ).format();
          setCurrentMode('date');
        } else {
          result = moment(selected).format('HH:mm:00');
        }
        setSelectedTime(selected);
        onSelect(result);
        methods.closeModal();
      }
    },
    clearValue: () => {
      setSelectedDate('');
      setSelectedTime(new Date());
      onSelect('');
    },
    setInitialCurrentMode: () => {
      if (mode == 'date' || mode == 'datetime') {
        setCurrentMode('date');
      } else if (mode == 'time') {
        setCurrentMode('time');
      }
    },
    closeModal: () => {
      methods.setInitialCurrentMode();
      setShowList(false);
    },
    theValue: () => {
      switch (mode) {
        case 'datetime':
          if (selectedDate) {
            return moment(
              `${selectedDate} ${moment(selectedTime).format('HH:mm:00')}`,
            ).format(DEFAULT_DATE_TIME_FORMAT);
          }
          return '';
        case 'date':
          if (selectedDate) {
            return moment(`${selectedDate}`).format(DEFAULT_DATE_FORMAT);
          }
          return '';
        case 'time':
          return moment(selectedTime).format(DEFAULT_TIME_FORMAT);
        default:
          return '-';
      }
    },
  };

  useEffect(() => {
    if (value) {
      setSelectedDate(moment(value).format('YYYY-MM-DD'));
      setSelectedTime(moment(value).toDate());
    }
    methods.setInitialCurrentMode();

    return () => { };
  }, []);

  if (error != errorText) {
    setErrorText(error);
  }

  return (
    <>
      <View style={[containerStyle, styles.viewWrapper]}>
        <TouchableOpacity onPress={() => setShowList(true)} activeOpacity={0.5}>
          <TextFieldWithoutInput
            value={methods.theValue()}
            label={label}
            error={error}
          />
        </TouchableOpacity>
        {!!selectedDate && (
          <TouchableOpacity
            style={styles.clearDateContainer}
            onPress={() => methods.clearValue()}
            activeOpacity={0.5}>
            <Icon style={styles.clearDateIcon} name="times" />
          </TouchableOpacity>
        )}
      </View>
      <Modal
        visible={showList}
        animationType="slide"
        onRequestClose={() => {
          methods.closeModal();
        }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
          <View style={{ ...styles.wrapper }}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {currentMode == 'date'
                  ? 'Select A Date'
                  : currentMode == 'time'
                    ? 'Select A Time'
                    : 'Select'}
              </Text>
              <TouchableOpacity
                style={styles.closeContainer}
                onPress={() => methods.closeModal()}
                activeOpacity={0.5}>
                <Icon style={styles.closeIcon} name="times" />
              </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
              {showList && currentMode == 'date' && (
                <RNCalendar
                  current={selectedDate || Date()}
                  onDayPress={methods.onDateSelected}
                  markedDates={{
                    [selectedDate]: {
                      selected: true,
                      selectedDotColor: 'orange',
                    },
                  }}
                />
              )}
              {showList && currentMode == 'time' && (
                <DateTimePicker
                  value={selectedTime}
                  mode="time"
                  is24Hour={true}
                  display="spinner"
                  onChange={methods.onTimeSelected}
                />
              )}
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default DatePicker;
