import produce from 'immer';
import * as Actions from './actions';

const INITIAL_STATE = {
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Actions.SIGN_IN_SUCCESS: {
        draft.signed = true;
        draft.loading = false;
        break;
      }

      case Actions.SIGN_IN_REQUEST: {
        draft.loading = true;
        break;
      }

      case Actions.SIGN_FAILURE: {
        draft.loading = false;
        break;
      }

      case Actions.SIGN_OUT_REQUEST: {
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
