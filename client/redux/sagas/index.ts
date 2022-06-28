//@ts-nocheck
import axios from "axios";
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchTracksSuccess } from "../actionCreator";
import { ActionType } from "../../types";

const getTracks = () => axios.get('http://localhost:5000/tracks');
const searchTracks = (query) => axios.get(`http://localhost:5000/tracks/search?query=${query}`);

function* fetchTracksSaga() {
    const response = yield call(getTracks);
    yield put(fetchTracksSuccess(response.data));
}

function* searchTracksSaga(action: ActionType) {
    const response = yield call(searchTracks, action.payload);
    yield put(fetchTracksSuccess(response.data));
}

function* tracksSaga() {
    yield all([takeLatest('FETCH_TRACKS', fetchTracksSaga)]);
}

function* searchSaga() {
    yield all([takeLatest('SEARCH_TRACKS', searchTracksSaga)]);
}

export default function* rootSaga() {
    yield all([
        tracksSaga(),
        searchSaga(),
    ]);
};