export const SIGN_IN_REQUEST = '@auth/SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = '@auth/SIGN_IN_SUCCESS';
export const SIGN_FAILURE = '@auth/SIGN_FAILURE';
export const SIGN_OUT_REQUEST = '@auth/SIGN_OUT_REQUEST';

export function signInRequest(deliveryMan) {
  return {
    type: SIGN_IN_REQUEST,
    payload: { deliveryMan },
  };
}

export function signInSuccess(user) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: { user },
  };
}

export function signFailure() {
  return {
    type: SIGN_FAILURE,
  };
}

export function signOutRequest() {
  return {
    type: SIGN_OUT_REQUEST,
  };
}
