import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

import { setInterceptor } from "../initAxios";
import { LOGIN, LOGIN_COMPLETED, LOGIN_FAILED } from "../actions/types";

//this is for testing with mock
function sampleLogin() {
  return "sfgsdfgsdfg";
}

function callLoginApi(data) {
  return axios.post("/api/authenticate/", data);
}

function* Login(action) {
  try {
    const loginResponse = yield call(callLoginApi, action.data);
    yield localStorage.setItem("AUTH_TOKEN", loginResponse.data.auth_token);
    yield setInterceptor();
    yield put({
      type: LOGIN_COMPLETED,
      payload: loginResponse.data.auth_token
    });
    //this is for testing with mock should component sampleLogin and uncommnet above statement once testing with real api
    // let loginResponse = yield sampleLogin();
    // yield localStorage.setItem("AUTH_TOKEN", loginResponse);
    // yield put({ type: LOGIN_FAILED, payload: loginResponse });
  } catch (error) {
    console.warn(error);
    yield put({
      type: LOGIN_FAILED,
      payload: { message: "Something went wrong. Please try again later" }
    });
  }
}

export function* LoginWatcher() {
  yield takeLatest(LOGIN, Login);
}
