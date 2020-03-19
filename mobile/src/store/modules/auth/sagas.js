import { put, all, takeLatest, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import * as Actions from './actions';
import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const { deliveryMan } = payload;

    const { data } = yield call(api.get, `/deliveryMans/${deliveryMan}`);
   
    if (data.length === 1) {
      yield put(Actions.signInSuccess(data[0]));
      return;
    }

    throw new Error();
  } catch (err) {
    Alert.alert(
      'Falha no login',
      'Houve um erro na autenticação, verifique seus dados'
    );
    yield put(Actions.signFailure());
  }
}

export default all([takeLatest(Actions.SIGN_IN_REQUEST, signIn)]);
