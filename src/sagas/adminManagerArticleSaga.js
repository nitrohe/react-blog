import {take,call,put,select} from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as ArticleTypes} from '../reducers/adminManagerArticle'
import {actionTypes as NewArticleTypes} from '../reducers/adminManagerNewArticle'

export function* getArticleList (pageNum) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/getAllArticles`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getArticleListFlow () {
    while (true){
        let req = yield take(ArticleTypes.ADMIN_GET_ARTICLE_LIST);
        let res = yield call(getArticleList,req.pageNum);
        if(res){
            if (res.code === 0) {
                res.data.pageNum = req.pageNum;
                yield put({type:ArticleTypes.ADMIN_RESPONSE_GET_ARTICLE_LIST,data:res.data})
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
export function* getArticleDetailShow (id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        //return yield call(get, `/admin/article/getArticleDetail?id=${id}`);
        return yield call(get, `/getArticleDetail?id=${id}`);

    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getArticleDetailShowFlow () {
    while (true){
        let req = yield take(ArticleTypes.GET_ARTICLE_DETAIL_SHOW);
        let res = yield call(getArticleDetailShow,req.id);
        if(res){
            if (res.code === 0) {
                yield put({type:ArticleTypes.RESPONSE_GET_ARTICLE_DETAIL,data:res.data})
            } else {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}
export function* deleteArticle (id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/admin/article/delArticle?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* deleteArticleFlow () {
    while(true){
        let req = yield take(ArticleTypes.ADMIN_DELETE_ARTICLE);
        const pageNum = yield select(state=>state.admin.articles.pageNum);
        let res = yield call(deleteArticle,req.id);
        if(res){
            if (res.code === 0) {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '删除成功!', msgType: 1});
                yield put({type:ArticleTypes.ADMIN_GET_ARTICLE_LIST,pageNum})
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

export function* saveArticle(data) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        //let id = yield select(state=>state.admin.newArticle.id);
        if(data.id){
            return yield call(post, '/admin/article/updateArticle', data);
        }else{
            return yield call(post, '/admin/article/addArticle', data);
        }

    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* saveArticleFlow() {
    while (true) {
        let request = yield take(ArticleTypes.SAVE_ARTICLE);
        if (request.data.title === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入文章标题', msgType: 0});
        } else if (request.data.content === "") {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入文章内容', msgType: 0});
        } else if (request.data.tags.length === 0) {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请选择文章分类', msgType: 0});
        }
        if (request.data.title && request.data.content && request.data.tags.length > 0) {
            let res = yield call(saveArticle, request.data);
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
