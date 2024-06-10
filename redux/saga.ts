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
  // yield put({ type: 'clearEmailReducer' });
  const res: Response = yield fetch("/api/checkNotiAndGetDetails", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
    // body: JSON.stringify(result),
  });
  const data: responseInterface = yield res.json();
  if (data.success) {
    yield put({ type: 'getCurrentUserDetailsReducer', payload: data });
  }
  // else {
  // }
  //   if (data.success) {
  //     setIsNoti(data.noti);
  //     setprofilePic(data.profilePic);
  //     setIsEmail(true);
  //     setUserName(data.userName);
  //   }


}

function* pushFollowingToArrSagaFunc(action: { type: string, payload: string }) {
  yield put({ type: 'pushFollowingToArrReducer', payload: action.payload });

}

function* popFollowingToArrSagaFunc(action: { type: string, payload: string }) {
  yield put({ type: 'popFollowingToArrReducer', payload: action.payload });

}

function* mySaga() {
  yield takeEvery('getEmailAction', getEmailSagaFunc);
  yield takeEvery('clearEmailAction', clearEmailSagaFunc);
  yield takeEvery('getCurrentUserDetailsAction', getCurrentUserDetailsSagaFunc);
  yield takeEvery('pushFollowingToArrAction', pushFollowingToArrSagaFunc);
  yield takeEvery('popFollowingToArrAction', popFollowingToArrSagaFunc);
}

export default mySaga;