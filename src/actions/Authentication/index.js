import * as types from "actions/ActionTypes";
import host from "config";

export function CheckTokenRequest(token) {
  return (dispatch) => {
    dispatch(CkeckToken());
    return fetch(`${host}/users/check`, { headers: { 'x-access-token': token, 'Content-Type': 'application/json' } })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          return dispatch(CkeckTokenSuccess(res.info, token));
        } else {
          // SetSession("opendesign_token", null);
          return dispatch(CkeckTokenFailure());
        }
      })
      .catch(err => {
        // SetSession("opendesign_token", null);
        dispatch(CkeckTokenFailure());
      });
  };
};

export function CkeckToken() {
  return {
    type: types.AUTH_CHECK_TOKEN
  }
};

export function CkeckTokenSuccess(info, token) {
  return {
    type: types.AUTH_CHECK_TOKEN_SUCCESS,
    info,
    token
  }
};

export function CkeckTokenFailure() {
  return {
    type: types.AUTH_CHECK_TOKEN_FAILURE
  }
};

export function CheckEmailRequest(email) {
  return (dispatch) => {
    dispatch(CheckEmail());
    return fetch(`${host}/users/checkEmail`, { headers: { 'Content-Type': 'application/json' }, method: "POST", body: JSON.stringify(email) })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          return dispatch(CheckEmailSuccess());
        } else {
          return dispatch(CheckEmailFailure(res.error));
        }
      })
      .catch(err => dispatch(CheckEmailFailure()));
  };
};

export function CheckEmail() {
  return {
    type: types.AUTH_CHECK_EMAIL
  }
};

export function CheckEmailSuccess() {
  return {
    type: types.AUTH_CHECK_EMAIL_SUCCESS,
    checkEmail: true
  }
};


export function CheckEmailFailure(err) {
  return {
    type: types.AUTH_CHECK_EMAIL_FAILURE,
    checkEmail: false,
    error: err
  }
};

export function CheckNickNameRequest(NickName) {
  return (dispatch) => {
    dispatch(CheckNickName());
    return fetch(`${host}/users/checkNickName`, { headers: { 'Content-Type': 'application/json' }, method: "POST", body: JSON.stringify(NickName) })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          return dispatch(CheckNickNameSuccess());
        } else {
          return dispatch(CheckNickNameFailure(res.error));
        }
      })
      .catch(err => dispatch(CheckNickNameFailure()));
  };
};

export function CheckNickName() {
  return {
    type: types.AUTH_CHECK_NICKNAME
  }
};

export function CheckNickNameSuccess() {
  return {
    type: types.AUTH_CHECK_NICKNAME_SUCCESS,
    checkNickName: true
  }
};


export function CheckNickNameFailure(err) {
  return {
    type: types.AUTH_CHECK_NICKNAME_FAILURE,
    checkNickName: false,
    error: err
  }
};

export function CheckFBUserRequest(FB_user_id) {
  return (dispatch) => {
    dispatch(CheckFBUser());
    return fetch(`${host}/users/checkFBUser`, { headers: { 'Content-Type': 'application/json' }, method: "POST", body: JSON.stringify(FB_user_id) })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          return dispatch(CheckFBUserSuccess());
        } else {
          return dispatch(CheckFBUserFailure(res.error));
        }
      })
      .catch(err => dispatch(CheckFBUserFailure()));
  };
};

export function CheckFBUser() {
  return {
    type: types.AUTH_CHECK_FBUSER
  }
};

export function CheckFBUserSuccess() {
  return {
    type: types.AUTH_CHECK_FBUSER_SUCCESS,
    checkFBUser: true
  }
};


export function CheckFBUserFailure(err) {
  return {
    type: types.AUTH_CHECK_FBUSER_FAILURE,
    checkFBUser: false,
    error: err
  }
};
