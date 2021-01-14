import React, {useState, useEffect, createRef} from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from './styles';
import ListItem from './ListItem';
import SectionHeader from './SectionHeader';
import {color} from '../../values';
import {Helper, Messaging} from '../../common';
import FlashMessage from 'react-native-flash-message';

const LIMIT = 20;
const DELAY = 750;
let timerSearch;

const SinglePicker = ({
  label,
  data,
  onSelect,
  textExtractor,
  sectionHeaderExtractor,
  value,
  primaryId = 'id',
  captionField,
  headerSectionKey = 'isHeaderSection',
  renderChild,
  containerStyle,
  isMultiple = false,
  emptyValue = null,
  showClearButton = false,
  serverPaging = false,
  allowToAddNewData = false,
  onLoadData,
  fnAddNewData,
  onAddNewValidator,
  placeholder = '',
}) => {
  const [showList, setShowList] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [dataFiltered, setDataFiltered] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadDataDone, setLoadDataDone] = useState(false);
  const [selectedMultipleData, setSelectedMultipleData] = useState([]);

  const flashMessageRef = createRef();

  const onPress = (itemParam) => {
    let item = Helper.clone(itemParam);
    delete item.isAHint;
    if (!isMultiple) {
      onSelect(item);
      setShowList(false);
    } else {
      let temp = Helper.clone(selectedMultipleData);
      let selectedIDs = temp.map((x) => x[primaryId]);
      let idxSelected = selectedIDs.indexOf(item[primaryId]);
      if (idxSelected >= 0) {
        temp.splice(idxSelected, 1);
      } else {
        if (typeof onAddNewValidator == 'function') {
          let {success, message} = onAddNewValidator(item);
          if (success) {
            temp.push(item);
          } else {
            flashMessageRef.current.showMessage({
              message: message || 'Error on add new data',
              type: 'danger',
            });
          }
        } else {
          temp.push(item);
        }
        // existing.concat(action.payload.data)
      }
      setSelectedMultipleData(temp);
      setKeyword('');
    }
  };
  const clearValue = () => {
    onSelect(emptyValue);
  };
  const isHasValue = () => {
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
  };

  useEffect(() => {
    if (isHasValue()) {
      if (isMultiple) {
        setSelectedMultipleData(value);
      }
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (showList) {
      setKeyword('');
      if (!serverPaging) {
        setDataFiltered(data);
      } else {
        refreshData(true);
      }
      return () => {};
    }
  }, [showList]);

  useEffect(() => {
    if (showList) {
      if (!serverPaging) {
        setDataFiltered(
          data.filter((val) => {
            if (val[headerSectionKey]) {
              return true;
            }
            let keys = Object.keys(val);
            let found = false;
            if (keyword.length > 0) {
              for (const key of keys) {
                if (key == primaryId) continue;
                let content = val[key];
                if (content == null) continue;
                if (
                  content
                    .toString()
                    .toLowerCase()
                    .indexOf(keyword.toLowerCase()) > -1
                )
                  found = true;
              }
            } else {
              found = true;
            }
            return found;
          }),
        );
      } else {
        if (timerSearch) {
          clearTimeout(timerSearch);
        }
        timerSearch = setTimeout(() => {
          refreshData(true);
        }, DELAY);
      }
    }
    return () => {};
  }, [keyword]);

  useEffect(() => {
    if (showList) {
      if (serverPaging) {
        if (!allowToAddNewData) {
          setDataFiltered(data);
        } else {
          let temp = Helper.clone(data);
          let selected = Helper.clone(selectedMultipleData);

          temp.forEach((x) => {
            for (let i = 0; i < selected.length; i++) {
              if (selected[i][primaryId] == x[primaryId]) {
                selected.splice(i, 1);
                break;
              }
            }
          });

          if (selected.length > 0) {
            selected.forEach((x) => {
              if (
                x[captionField].toLowerCase().indexOf(keyword.toLowerCase()) >=
                0
              ) {
                temp.unshift(x);
              }
            });
          }

          if (keyword) {
            let obj = {};
            if (typeof fnAddNewData == 'function') {
              obj = fnAddNewData(keyword);
            } else {
              obj[primaryId] = keyword;
              obj[captionField] = keyword;
            }
            obj['isAHint'] = true;
            let allowToAdd = false;
            if (typeof onAddNewValidator == 'function') {
              let {success, message} = onAddNewValidator(obj);
              allowToAdd = success;
            }
            if (allowToAdd) {
              let isFound =
                temp.filter((x) => x[primaryId] === obj[primaryId]).length > 0;
              if (!isFound) {
                temp.unshift(obj);
              }
            }
          }
          setDataFiltered(temp);
        }
      }
      return () => {};
    }
  }, [data]);

  const refreshData = async (reset) => {
    if (onLoadData) {
      if (reset) {
        setLoadDataDone(false);
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      onLoadData(
        {
          skip: reset ? 0 : data.length,
          limit: LIMIT,
          filter: keyword,
        },
        (res) => {
          if (reset) {
            setIsLoading(false);
          } else {
            setIsLoadingMore(false);
          }
          if (res.length < LIMIT) {
            setLoadDataDone(true);
          }
        },
      );
    }
  };

  const done = () => {
    if (isMultiple) {
      onSelect(selectedMultipleData);
    }

    setShowList(false);
  };

  return (
    <View style={styles.viewWrapper}>
      <TouchableOpacity
        style={containerStyle}
        onPress={() => setShowList(true)}
        activeOpacity={0.5}>
        {renderChild}
      </TouchableOpacity>
      {isHasValue() && showClearButton && (
        <TouchableOpacity
          style={styles.clearContainer}
          onPress={() => clearValue()}
          activeOpacity={0.5}>
          <Icon style={styles.clearIcon} name="times" />
        </TouchableOpacity>
      )}
      <Modal
        visible={showList}
        animationType="slide"
        onRequestClose={() => {
          setShowList(false);
        }}>
        <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
          <View style={{...styles.wrapper}}>
            <View style={styles.searchpanel}>
              <TextInput
                style={styles.searchfield}
                placeholder={placeholder ? placeholder : `Search ${label}...`}
                value={keyword}
                onChangeText={(text) => setKeyword(text)}
                onSubmitEditing={(event) => {
                  let theText = event.nativeEvent.text;
                  let obj = {};
                  if (typeof fnAddNewData == 'function') {
                    obj = fnAddNewData(theText);
                  } else {
                    obj[primaryId] = theText;
                    obj[captionField] = theText;
                  }
                  onPress(obj);
                }}
                returnKeyType="done"
              />
              <TouchableOpacity
                style={styles.closepanel}
                onPress={() => done()}
                activeOpacity={0.5}>
                <Text style={styles.closetext}>Done</Text>
              </TouchableOpacity>
            </View>

            {isLoading && (
              <ActivityIndicator
                style={styles.loadingIndicator}
                size="large"
                color={color.accent}
              />
            )}
            {!isLoading && (
              <>
                <FlatList
                  data={!serverPaging ? dataFiltered : dataFiltered}
                  refreshControl={
                    !serverPaging ? null : (
                      <RefreshControl
                        refreshing={false}
                        onRefresh={() => {
                          refreshData(true);
                        }}
                      />
                    )
                  }
                  renderItem={({item}) => {
                    if (item[headerSectionKey]) {
                      return (
                        <SectionHeader
                          item={item}
                          text={
                            sectionHeaderExtractor
                              ? sectionHeaderExtractor(item)
                              : textExtractor(item)
                          }
                        />
                      );
                    } else {
                      return (
                        <ListItem
                          item={item}
                          id={item[primaryId]}
                          selectedIDs={selectedMultipleData.map(
                            (x) => x[primaryId],
                          )}
                          isMultiple={isMultiple}
                          isAHint={item.isAHint}
                          textStyle={item.isAHint ? {fontWeight: 'bold'} : {}}
                          text={textExtractor(item)}
                          onPress={() => onPress(item)}
                        />
                      );
                    }
                  }}
                  keyExtractor={(item) => item[primaryId].toString()}
                  removeClippedSubviews={true}
                  onEndReached={() => (!loadDataDone ? refreshData() : {})}
                  ListEmptyComponent={
                    <View style={styles.noDataContainer}>
                      <Text style={styles.noDataText}>No Data Available</Text>
                    </View>
                  }
                />
                {isLoadingMore && (
                  <View style={styles.loadingMoreContainer}>
                    <View style={styles.loadingMoreContent}>
                      <ActivityIndicator size="small" color={color.accent} />
                      <Text style={styles.loadingMoreText}>
                        Loading more data...
                      </Text>
                    </View>
                  </View>
                )}
              </>
            )}
          </View>
        </SafeAreaView>
        <FlashMessage ref={flashMessageRef} position="top" />
      </Modal>
    </View>
  );
};

export default SinglePicker;
