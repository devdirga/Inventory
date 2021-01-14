import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  View,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';

import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-picker';

import styles from './styles/file-picker';
import { font, color } from '../../values';
import { Permissions } from '../../common';

const FilePicker = ({
  fontSize,
  labelFontSize,
  baseColor,
  tintColor,
  onChange,
  value,
  isMultiple = false,
  documentTypes = [DocumentPicker.types.allFiles],
  label = '',
  error = '',
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

  const [selectedItem, setSelectedItem] = useState([]);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (selectedItem && selectedItem.length) {
      fadeIn();
    } else {
      fadeOut();
    }
    return () => { };
  }, [selectedItem]);

  if (error != errorText) {
    setErrorText(error);
  }

  const methods = {
    pickFile: async () => {
      if (
        JSON.stringify(documentTypes) ==
        JSON.stringify([DocumentPicker.types.images]) &&
        !isMultiple
      ) {
        await methods.pickImage();
        return;
      }
      let permission = await Permissions.requestStoragePermission();
      if (permission) {
        try {
          let results;
          if (isMultiple) {
            results = await DocumentPicker.pickMultiple({
              type: documentTypes,
            });
          } else {
            results = [
              await DocumentPicker.pick({
                type: documentTypes,
              }),
            ];
          }

          let existingAttachment = [];
          if (isMultiple) {
            existingAttachment = selectedItem || [];
          }
          for (const res of results) {
            let base64 = await RNFetchBlob.fs.readFile(res.uri, 'base64');

            existingAttachment.push({
              fileName: res.name,
              fileType: res.type,
              fileSize: res.size,
              base64: base64,
              uri: res.uri,
            });
          }
          setSelectedItem(existingAttachment);
          methods.localOnChange(existingAttachment);
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker, exit any dialogs or menus and move on
          } else {

          }
        } finally {
        }
      }
    },
    pickImage: async () => {
      const options = {
        customButtons: [],
        cameraType: 'front',
        mediaType: 'photo',
      };

      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
        } else {
          let base64 = response.data;
          // setModel({...model,
          //   picture: response.fileName,
          //   logoContent: base64,
          //   logoMIME: response.type
          // });

          let existingAttachment = [];

          existingAttachment.push({
            fileName: response.fileName,
            fileType: response.type,
            fileSize: response.fileSize,
            base64: base64,
            uri: response.uri,
          });

          setSelectedItem(existingAttachment);
          methods.localOnChange(existingAttachment);
        }
      });
    },
    localOnChange: (items) => {
      let emitter;
      if (items && items.length) {
        if (isMultiple) {
          emitter = items;
        } else {
          emitter = items[0];
        }
        fadeIn();
      } else {
        fadeOut();
      }
      if (onChange) {
        onChange(emitter);
      }
    },
    isSelectedItemAvailable: () => {
      return !!(selectedItem && selectedItem.length);
    },
  };

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
            borderWidth: errorText ? 1 : 0.5,
            borderColor: errorText
              ? color.errorColor
              : baseColor || color.materialBaseColor,
          },
        ]}>
        <View style={styles.fileListContainer}>
          {!methods.isSelectedItemAvailable() && (
            <Text
              style={[
                styles.placeHolderStyle,
                {
                  fontSize: fontSize || font.size.normal,
                  color: baseColor || color.materialBaseColor,
                },
              ]}>
              {label}
            </Text>
          )}
          {methods.isSelectedItemAvailable() && (
            <>
              {selectedItem &&
                selectedItem.map((row, idx) => {
                  return (
                    <TouchableOpacity
                      key={`${row.fileName}-${idx}`}
                      style={styles.attachmentItem}
                      onPress={() => { }}>
                      <Text style={styles.attachmentItemText}>
                        {row.fileName}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </>
          )}
        </View>
        <View
          style={{
            width: 3,
            backgroundColor: 'white',
            right: 1,
          }}
        />
        <TouchableOpacity
          onPress={() => methods.pickFile()}
          style={styles.selectFile}>
          <Text style={[styles.selectFileText]}>Select File</Text>
        </TouchableOpacity>
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

export default FilePicker;
