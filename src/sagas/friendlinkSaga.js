import {take,call,put,select} from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as FriendlinkTypes} from '../reducers/friendlinkReducer'

export function* getFriendlinkList () {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/getFriendlink`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getFriendlinkListFlow () {
    while (true){
        let req = yield take(FriendlinkTypes.GET_FRIENDLINK_LIST);
        let res = yield call(getFriendlinkList);
        if(res){
            if(res.code === 0){
                yield put({type: FriendlinkTypes.RESPONSE_GET_FRIENDLINK_LIST,data:res.data});
            }else{
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}

export function* deleteFriendlink (id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/admin/Friendlink/delFriendlink?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* deleteFriendlinkFlow () {
    while(true){
        let req = yield take(FriendlinkTypes.DELETE_FRIENDLINK);
        //const pageNum = yield select(state=>state.admin.articles.pageNum);
        let res = yield call(deleteFriendlink,req.id);
        if(res){
            if (res.code === 0) {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '删除成功!', msgType: 1});
                //yield put({type:FriendlinkTypes.GET_FRIENDLINK_LIST,pageNum})
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

export function* getFriendlinkDetail (id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/admin/Friendlink/getFriendlinkDetail?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getFriendlinkDetailFlow () {
    while (true){
        let req = yield take(FriendlinkTypes.GET_FRIENDLINK_DETAIL);
        let res = yield call(getFriendlinkDetail,req.id);
        if(res){
            if (res.code === 0) {
                yield put({type:FriendlinkTypes.RESPONSE_GET_FRIENDLINK_DETAIL,data:res.data})
            } else {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}

export function* saveFriendlink(data) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        //let id = yield select(state=>state.admin.newArticle.id);
        if(data.id){
            return yield call(post, '/admin/Friendlink/updateFriendlink', data);
        }else{
            return yield call(post, '/admin/Friendlink/addFriendlink', data);
        }

    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* saveFriendlinkFlow() {
    while (true) {
        let req= yield take(FriendlinkTypes.SAVE_FRIENDLINK);
        if (req.data) {
            let res = yield call(saveFriendlink, req.data);
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
