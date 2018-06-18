const initialState = {
    category: [],
    articleList: [],
    articleDetail: {},
    pageNum: 1,
    total: 0,
    commentList: [],
    editorShow: '',
    editorValue: '',
    progressWidth: '',
    friendLinkList: [],
    timeLineList: [],
    columnList: []
};
export const actionTypes = {
    GET_ARTICLE_LIST: "GET_ARTICLE_LIST",
    RESPONSE_ARTICLE_LIST: "RESPONSE_ARTICLE_LIST",
    GET_ARTICLE_DETAIL: "GET_ARTICLE_DETAIL",
    RESPONSE_ARTICLE_DETAIL: "RESPONSE_ARTICLE_DETAIL",
    GET_COMMENT_LIST: "GET_COMMENT_LIST",
    RESPONSE_COMMENT_LIST: "RESPONSE_COMMENT_LIST",
    ADD_COMMENT:"ADD_COMMENT",
    SET_EDITOR_SHOW:"SET_EDITOR_SHOW",
    SET_EDITOR_VALUE:"SET_EDITOR_VALUE",
    SET_PROGRESS_WIDTH:"SET_PROGRESS_WIDTH",
    GET_FRIEND_LINK_LIST: "GET_FRIEND_LINK_LIST",
    RESPONSE_FRIEND_LINK_LIST: "RESPONSE_FRIEND_LINK_LIST",
    GET_TIME_LINE_LIST: "GET_TIME_LINE_LIST",
    RESPONSE_TIME_LINE_LIST: "RESPONSE_TIME_LINE_LIST",
    GET_COLUMN_LIST: "GET_COLUMN_LIST",
    RESPONSE_COLUMN_LIST: "RESPONSE_COLUMN_LIST"
};

export const actions = {
    get_article_list: function (tag = '', pageNum = 1) {
        return {
            type: actionTypes.GET_ARTICLE_LIST,
            tag,
            pageNum
        }
    },
    get_article_detail: function (id) {
        return {
            type: actionTypes.GET_ARTICLE_DETAIL,
            id
        }
    },
    get_comment_list: function () {
        return {
            type: actionTypes.GET_COMMENT_LIST
        }
    },
    add_comment:function (data) {
        return{
            type:actionTypes.ADD_COMMENT,
            data
        }
    },
    set_editor_show:function (show) {
        return{
            type:actionTypes.SET_EDITOR_SHOW,
            show
        }
    },
    set_editor_value:function (value) {
        return{
            type:actionTypes.SET_EDITOR_VALUE,
            value
        }
    },
    set_progress_width:function (value) {
        return{
            type:actionTypes.SET_PROGRESS_WIDTH,
            value
        }
    },
    get_friend_link_list: function () {
        return {
            type: actionTypes.GET_FRIEND_LINK_LIST
        }
    },
    get_time_line_list: function () {
        return {
            type: actionTypes.GET_TIME_LINE_LIST
        }
    },
    get_column_list: function (site) {
        return {
            type: actionTypes.GET_COLUMN_LIST,
            site
        }
    },
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.RESPONSE_ARTICLE_LIST:
            return {
                ...state, articleList: [...action.data.list], pageNum: action.data.pageNum, total: action.data.total
            };
        case actionTypes.RESPONSE_ARTICLE_DETAIL:
            return {
                ...state, articleDetail: action.data
            };
        case actionTypes.RESPONSE_COMMENT_LIST:
            return {
                ...state, commentList: [...action.data.list]
            };
        case actionTypes.SET_EDITOR_SHOW:
            return {
                ...state, editorShow: action.show
            };
        case actionTypes.SET_EDITOR_VALUE:
            return {
                ...state, editorValue: action.value
            };
        case actionTypes.SET_PROGRESS_WIDTH:
            return {
                ...state, progressWidth: action.value
            };
        case actionTypes.RESPONSE_FRIEND_LINK_LIST:
            return {
                ...state, friendLinkList: [...action.data.list]
            };
        case actionTypes.RESPONSE_TIME_LINE_LIST:
            return {
                ...state, timeLineList: [...action.data.list]
            };
        case actionTypes.RESPONSE_COLUMN_LIST:
                return {
                    ...state, columnList: [...action.data.list]
                };
        default:
            return state;
    }
}
