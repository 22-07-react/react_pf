import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { getFlickr, getMembers, getYoutube } from './api';

//Flickr saga
export function* returnFlickr(action) {
	try {
		const response = yield call(getFlickr, action.Opt);
		yield put({ type: 'FLICKR_SUCCESS', payload: response.data.photos.photo });
	} catch (err) {
		yield put({ typs: 'FLICKR_ERROR', payload: err });
	}
}
export function* callFlickr() {
	yield takeLatest('FLICKR_START', returnFlickr);
}

//Members saga
export function* returnMembers() {
	try {
		const response = yield call(getMembers);
		yield put({ type: 'MEMBERS_SUCCESS', payload: response.data.members });
	} catch (err) {
		yield put({ type: 'MEMBERS_ERROR', payload: err });
	}
}
export function* callMembers() {
	yield takeLatest('MEMBERS_START', returnMembers);
}

//Youtube saga
export function* returnYoutube() {
	try {
		const response = yield call(getYoutube);
		yield put({ type: 'YOUTUBE_SUCCESS', payload: response.data.items });
	} catch (err) {
		yield put({ type: 'YOUTUBE_ERROR', payload: err });
	}
}
export function* callYoutube() {
	yield takeLatest('YOUTUBE_START', returnYoutube);
}

//store.js에 의해서 reducer에 적용될 rootSaga함수 생성
export default function* rootSaga() {
	yield all([fork(callFlickr), fork(callMembers), fork(callYoutube)]);
}
