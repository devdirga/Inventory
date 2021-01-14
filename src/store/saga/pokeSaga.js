import { takeLatest, call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {
  POKE_FETCH_LIST,
  POKE_ADD_LIST,
  POKE_FETCH_ERROR,
  POKE_FETCH_LOADING,
  KEY_STORAGE_TOKEN,
} from '../constant';

const pokeApi = async () => {
  let JWT_TOKEN = await AsyncStorage.getItem(KEY_STORAGE_TOKEN);
  let response = await axios.get('https://pokeapi.co/api/v2/pokemon');
  return response;
};

function* pokeEffectSaga(action) {
  yield put({ type: POKE_FETCH_LOADING, loading: true });
  try {
    let {
      data: { results },
    } = yield call(pokeApi, action.payload);
    yield put({ type: POKE_ADD_LIST, pokemon: [...results] });
  } catch (e) {
    yield put({ type: POKE_FETCH_ERROR, message: 'Error on calling api' });
  }
}

export function* pokeWatcherSaga() {
  yield takeLatest(POKE_FETCH_LIST, pokeEffectSaga);
}
