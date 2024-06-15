import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';

function* getEmailSagaFunc(action: { type: string, payload: string }) {
  yield put({ type: 'getEmailReducer', payload: action.payload });

}
function* clearEmailSagaFunc() {
  yield put({ type: 'clearEmailReducer' });

}

interface responseInterface {
  success: boolean,
  msg?: string,
  name?: string,
  userName?: string,
  email?: string,
  profilePic?: string,
  followers?: string[],
  following?: string[],
  noti?: boolean,
}

function* getCurrentUserDetailsSagaFunc() {
  const res: Response = yield fetch("/api/checkNotiAndGetDetails", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data: responseInterface = yield res.json();
  if (data.success) {
    yield put({ type: 'getCurrentUserDetailsReducer', payload: data });
  }

}

function* pushFollowingToArrSagaFunc(action: { type: string, payload: string }) {
  yield put({ type: 'pushFollowingToArrReducer', payload: action.payload });

}

function* popFollowingToArrSagaFunc(action: { type: string, payload: string }) {
  yield put({ type: 'popFollowingToArrReducer', payload: action.payload });

}


function* storeAllPostsSagaFunc(action: { type: string, payload: string }) {
    yield put({ type: 'storeAllPostsReducer', payload: action.payload });
}

function* mySaga() {
  yield takeEvery('getEmailAction', getEmailSagaFunc);
  yield takeEvery('clearEmailAction', clearEmailSagaFunc);
  yield takeEvery('getCurrentUserDetailsAction', getCurrentUserDetailsSagaFunc);
  yield takeEvery('pushFollowingToArrAction', pushFollowingToArrSagaFunc);
  yield takeEvery('popFollowingToArrAction', popFollowingToArrSagaFunc);
  yield takeEvery('storeAllPostsAction', storeAllPostsSagaFunc);
}

export default mySaga;