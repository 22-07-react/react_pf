import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { getFlickr } from './api';

//컴포넌트에서 받은 인수값을 api.js에 있는 axios함수에 연결해서 호출하는 함수
export function* returnFlickr(action) {
	const response = yield call(getFlickr, action.Opt);
	yield put({ type: 'FLICKR_SUCCESS', payload: response.data.photos.photo });
}

//요청받은 action타입에 따라서 함수 호출
export function* callFlickr() {
	yield takeLatest('FLICKR_START', returnFlickr);
}

//store.js에 의해서 reducer에 적용될 rootSaga함수 생성
export default function* rootSaga() {
	yield all([fork(callFlickr)]);
}
