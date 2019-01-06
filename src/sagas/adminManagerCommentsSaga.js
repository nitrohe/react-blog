import {take,call,put,select} from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as CommentTypes} from '../reducers/adminManagerComment'

export function* getCommentsList () {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/getComments`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getCommentsListFlow () {
    while (true){
        let req = yield take(CommentTypes.GET_COMMENTS_LIST);
        let res = yield call(getCommentsList);
        if(res){
            if(res.code === 0){
                yield put({type: CommentTypes.RESPONSE_GET_COMMENT_LIST,data:res.data});
            }else{
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}

export function* deleteComments (id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/admin/Comments/delComments?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* deleteCommentsFlow () {
    while(true){
        let req = yield take(CommentTypes.DELETE_COMMENT);
        //const pageNum = yield select(state=>state.admin.articles.pageNum);
        let res = yield call(deleteComments,req.id);
        if(res){
            if (res.code === 0) {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '删除成功!', msgType: 1});
                //yield put({type:CommentTypes.GET_COMMENT_LIST,pageNum})
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

export function* getCommentsDetail (id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/admin/Comments/getCommentsDetail?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getCommentsDetailFlow () {
    while (true){
        let req = yield take(CommentTypes.GET_COMMENT_DETAIL);
        let res = yield call(getCommentsDetail,req.id);
        if(res){
            if (res.code === 0) {
                yield put({type:CommentTypes.RESPONSE_GET_COMMENT_DETAIL,data:res.data})
            } else {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}

export function* saveComments(data) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        //let id = yield select(state=>state.admin.newArticle.id);
        if(data.id){
            return yield call(post, '/admin/Comments/updateComments', data);
        }else{
            return yield call(post, '/admin/Comments/addComments', data);
        }

    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* saveCommentsFlow() {
    while (true) {
        let req= yield take(CommentTypes.SAVE_COMMENT);
        if (req.data.comment === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入留言', msgType: 0});
        }
        if (req.data.comment) {
            let res = yield call(saveComments, req.data);
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
