import {fork} from 'redux-saga/effects'
import {loginFlow, registerFlow, user_auth, logout} from './homeSaga'
import {get_all_users_flow} from './adminManagerUsersSaga'
import {getAllTagsFlow, addTagFlow, delTagFlow} from './adminManagerTagsSaga'

import {getArticleListFlow,getArticleDetailShowFlow,deleteArticleFlow,saveArticleFlow} from './adminManagerArticleSaga'
import {getTimelineListFlow,getTimelineDetailFlow,saveTimelineFlow,deleteTimelineFlow} from './adminManagerTimelineSaga'
import {getFriendlinkListFlow,getFriendlinkDetailFlow,saveFriendlinkFlow,deleteFriendlinkFlow} from './adminManagerFriendlinkSaga'
import {getCommentsListFlow,getCommentsDetailFlow,saveCommentsFlow,deleteCommentsFlow} from './adminManagerCommentsSaga'
import {getArticlesListFlow,getArticleDetailFlow,getCommentListFlow,addCommentFlow,getTimeLineListFlow,getFriendLinkListFlow,getColumnListFlow} from './frontSaga'

export default function* rootSaga() {
    yield  fork(loginFlow);
    yield  fork(registerFlow);
    yield  fork(user_auth);
    yield  fork(logout);
    yield fork(get_all_users_flow);
    yield fork(getAllTagsFlow);
    yield fork(addTagFlow);
    yield fork(delTagFlow);
    yield fork(saveArticleFlow);
    yield fork(getArticleListFlow);
    yield fork(deleteArticleFlow);
    yield fork(getArticlesListFlow);
    yield fork(getArticleDetailFlow);
    yield fork(getArticleDetailShowFlow);
    yield fork(getCommentListFlow);
    yield fork(addCommentFlow);
    yield fork(getTimeLineListFlow);
    yield fork(getFriendLinkListFlow);
    yield fork(getColumnListFlow);

    yield fork(getTimelineListFlow);
    yield fork(getTimelineDetailFlow);
    yield fork(saveTimelineFlow);
    yield fork(deleteTimelineFlow);

    yield fork(getFriendlinkListFlow);
    yield fork(getFriendlinkDetailFlow);
    yield fork(saveFriendlinkFlow);
    yield fork(deleteFriendlinkFlow);

    yield fork(getCommentsListFlow);
    yield fork(getCommentsDetailFlow);
    yield fork(saveCommentsFlow);
    yield fork(deleteCommentsFlow);



}
