const initialState = {
    articleList: [],
    articleDetail:{},
    pageNum: 1,
    total: 0
};

export const actionTypes = {
    ADMIN_GET_ARTICLE_LIST: 'ADMIN_GET_ARTICLE_LIST',
    ADMIN_RESPONSE_GET_ARTICLE_LIST: "ADMIN_RESPONSE_GET_ARTICLE_LIST",
    ADMIN_EDIT_ARTICLE: "ADMIN_EDIT_ARTICLE",
    ADMIN_DELETE_ARTICLE: "ADMIN_DELETE_ARTICLE",
    GET_ARTICLE_DETAIL_SHOW: "GET_ARTICLE_DETAIL_SHOW",
    RESPONSE_GET_ARTICLE_DETAIL: "RESPONSE_GET_ARTICLE_DETAIL",
    SAVE_ARTICLE: "SAVE_ARTICLE"
};

export const actions = {
    get_article_list: function (pageNum = 1) {
        return {
            type: actionTypes.ADMIN_GET_ARTICLE_LIST,
            pageNum
        }
    },
    delete_article: function (id) {
        return {
            type: actionTypes.ADMIN_DELETE_ARTICLE,
            id
        }
    },
    get_article_detail: function (id) {
        return {
            type: actionTypes.GET_ARTICLE_DETAIL_SHOW,
            id
        }
    },
    set_article_detail: function (data) {
        return {
            type: actionTypes.RESPONSE_GET_ARTICLE_DETAIL,
            data
        }
    },
    save_article:function (data) {
        return{
            type:actionTypes.SAVE_ARTICLE,
            data
        }
    }
};

export function articles(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADMIN_RESPONSE_GET_ARTICLE_LIST:
            return {
                ...state, articleList: [...action.data.list], total: action.data.total,pageNum:action.data.pageNum
            };
        case actionTypes.RESPONSE_GET_ARTICLE_DETAIL:

            return {
                ...state, articleDetail: Object.assign({},action.data)
            };
        default:
            return state;
    }
}