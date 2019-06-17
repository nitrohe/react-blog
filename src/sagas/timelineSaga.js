import {take,call,put,select} from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as TimelineTypes} from '../reducers/timelineReducer'

export function* getTimelineList () {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/getTimeLine`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getTimelineListFlow () {
    while (true){
        let req = yield take(TimelineTypes.GET_TIMELINE_LIST);
        let res = yield call(getTimelineList);
        if(res){
            if(res.code === 0){
                yield put({type: TimelineTypes.RESPONSE_GET_TIMELINE_LIST,data:res.data});
            }else{
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}

export function* deleteTimeline (id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/admin/Timeline/delTimeline?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* deleteTimelineFlow () {
    while(true){
        let req = yield take(TimelineTypes.DELETE_TIMELINE);
        //const pageNum = yield select(state=>state.admin.articles.pageNum);
        let res = yield call(deleteTimeline,req.id);
        if(res){
            if (res.code === 0) {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '删除成功!', msgType: 1});
                //yield put({type:TimelineTypes.GET_TIMELINE_LIST,pageNum})
            } else if (res.message === '身份信息已过期，请重新登录') {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
                setTimeout(function () {
                    location.replace('/');
                }, 1000);
            } else {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}

export function* getTimelineDetail (id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/admin/Timeline/getTimelineDetail?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getTimelineDetailFlow () {
    while (true){
        let req = yield take(TimelineTypes.GET_TIMELINE_DETAIL);
        let res = yield call(getTimelineDetail,req.id);
        if(res){
            if (res.code === 0) {
                yield put({type:TimelineTypes.RESPONSE_GET_TIMELINE_DETAIL,data:res.data})
            } else {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}

export function* saveTimeline(data) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        //let id = yield select(state=>state.admin.newArticle.id);
        if(data.id){
            return yield call(post, '/admin/Timeline/updateTimeline', data);
        }else{
            return yield call(post, '/admin/Timeline/addTimeline', data);
        }

    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* saveTimelineFlow() {
    while (true) {
        let req= yield take(TimelineTypes.SAVE_TIMELINE);
        if (req.data) {
            let res = yield call(saveTimeline, req.data);
            if (res) {
                if (res.code === 0) {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
                } else if (res.message === '身份信息已过期，请重新登录') {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
                    setTimeout(function () {
                        location.replace('/');
                    }, 1000);
                } else {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
                }
            }
        }
    }
}
