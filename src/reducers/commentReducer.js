const initialState = {
    commentList: [],
    commentDetail: {},
    pageNum: 1,
    total: 0
};

export const actionTypes = {
    GET_COMMENTS_LIST: 'GET_COMMENTS_LIST',
    RESPONSE_GET_COMMENT_LIST: "RESPONSE_GET_COMMENT_LIST",
    GET_COMMENT_DETAIL: 'GET_COMMENT_DETAIL',
    SET_COMMENT_DETAIL: 'GET_COMMENT_DETAIL',
    RESPONSE_GET_COMMENT_DETAIL: "RESPONSE_GET_COMMENT_DETAIL",
    GET_COMMENT_DETAIL: "GET_COMMENT_DETAIL",
    DELETE_COMMENT: "DELETE_COMMENT",
    SAVE_COMMENT: 'SAVE_COMMENT',
    //RESPONSE_SAVE_COMMENT: "RESPONSE_SAVE_COMMENT",
};

export const actions = {
    get_comment_list: function (pageNum = 1) {
        return {
            type: actionTypes.GET_COMMENTS_LIST,
            pageNum
        }
    },
    delete_comment: function (id) {
        return {
            type: actionTypes.DELETE_COMMENT,
            id
        }
    },
    get_comment_detail: function (id) {
        return {
            type: actionTypes.GET_COMMENT_DETAIL,
            id
        }
    },
    set_comment_detail: function (data) {
        return {
            type: actionTypes.RESPONSE_GET_COMMENT_DETAIL,
            data
        }
    },
    save_comment:function (data) {
        return{
            type:actionTypes.SAVE_COMMENT,
            data
        }
    }
};

export function reducer(state = initialState, action) {

    switch (action.type) {

        case actionTypes.RESPONSE_GET_COMMENT_LIST:
            return {
                ...state, commentList: [...action.data.list]
            };
        case actionTypes.RESPONSE_GET_COMMENT_DETAIL:

            return {
                ...state, commentDetail: Object.assign({},action.data)
            };


        default:
            return state;
    }
}
