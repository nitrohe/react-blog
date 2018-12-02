import {take,put,call} from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as FrontActionTypes} from '../reducers/frontReducer'


export function* getArticleList (tag,pageNum) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/getArticles?pageNum=${pageNum}&isPublish=true&tag=${tag}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getArticlesListFlow () {
    while (true){
        let req = yield take(FrontActionTypes.GET_ARTICLE_LIST);
        let res = yield call(getArticleList,req.tag,req.pageNum);
        if(res){
            if(res.code === 0){
                res.data.pageNum = req.pageNum;
                yield put({type: FrontActionTypes.RESPONSE_ARTICLE_LIST,data:res.data});
            }else{
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}

export function* getArticleDetail (id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/getArticleDetail?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getArticleDetailFlow () {
    while (true){
        let req = yield take(FrontActionTypes.GET_ARTICLE_DETAIL);
        let res = yield call(getArticleDetail,req.id);
        if(res){
            if(res.code === 0){
                yield put({type: FrontActionTypes.RESPONSE_ARTICLE_DETAIL,data:res.data});
            }else{
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}
export function* getCommentList (type, aId) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/getComments?type=${type}&aId=${aId}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getCommentListFlow () {
    while (true){
        let req = yield take(FrontActionTypes.GET_COMMENT_LIST);
        let res = yield call(getCommentList, req.cType, req.aId);
        if(res){
            if(res.code === 0){
                yield put({type: FrontActionTypes.RESPONSE_COMMENT_LIST,data:res.data});
            }else{
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}

export function* addComment(data) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(post, '/addComment', data);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* addCommentFlow() {
    while (true) {
        let request = yield take(FrontActionTypes.ADD_COMMENT);
        if (request.data.comment === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入留言', msgType: 0});
        }
        if (request.data.comment) {
            let res = yield call(addComment, request.data);
            if (res) {
                if (res.code === 0) {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
                    /*
                    setTimeout(function () {
                        location.replace('/Interact');
                    }, 1000);
                    */
                   yield put({type: FrontActionTypes.RESPONSE_COMMENT_LIST,data:res.data});
                }  else {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
                }
            }
        }
    }
}

export function* getTimeLineList () {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/getTimeLine`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getTimeLineListFlow () {
    while (true){
        let req = yield take(FrontActionTypes.GET_TIME_LINE_LIST);
        let res = yield call(getTimeLineList);
        if(res){
            if(res.code === 0){
                yield put({type: FrontActionTypes.RESPONSE_TIME_LINE_LIST,data:res.data});
            }else{
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}

export function* getFriendLinkList () {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/getFriendLink`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getFriendLinkListFlow () {
    while (true){
        let req = yield take(FrontActionTypes.GET_FRIEND_LINK_LIST);
        let res = yield call(getFriendLinkList);
        if(res){
            if(res.code === 0){
                yield put({type: FrontActionTypes.RESPONSE_FRIEND_LINK_LIST,data:res.data});
            }else{
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}

export function* getColumnList (site) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/getColumn?site=${site}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getColumnListFlow () {
    while (true){
        let req = yield take(FrontActionTypes.GET_COLUMN_LIST);
        let res = yield call(getColumnList,req.site);
        if(res){
            if(res.code === 0){
                yield put({type: FrontActionTypes.RESPONSE_COLUMN_LIST,data:res.data});
            }else{
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}
