const initialState = {
    friendlinkList: [],
    friendlinkDetail: {},
    pageNum: 1,
    total: 0
};

export const actionTypes = {
    GET_FRIENDLINK_LIST: 'GET_FRIENDLINK_LIST',
    RESPONSE_GET_FRIENDLINK_LIST: "RESPONSE_GET_FRIENDLINK_LIST",
    GET_FRIENDLINK_DETAIL: 'GET_FRIENDLINK_DETAIL',
    SET_FRIENDLINK_DETAIL: 'GET_FRIENDLINK_DETAIL',
    RESPONSE_GET_FRIENDLINK_DETAIL: "RESPONSE_GET_FRIENDLINK_DETAIL",
    GET_FRIENDLINK_DETAIL: "GET_FRIENDLINK_DETAIL",
    DELETE_FRIENDLINK: "DELETE_FRIENDLINK",
    SAVE_FRIENDLINK: 'SAVE_FRIENDLINK',
    //RESPONSE_SAVE_FRIENDLINK: "RESPONSE_SAVE_FRIENDLINK",
};

export const actions = {
    get_friendlink_list: function (pageNum = 1) {
        return {
            type: actionTypes.GET_FRIENDLINK_LIST,
            pageNum
        }
    },
    delete_friendlink: function (id) {
        return {
            type: actionTypes.DELETE_FRIENDLINK,
            id
        }
    },
    get_friendlink_detail: function (id) {
        return {
            type: actionTypes.GET_FRIENDLINK_DETAIL,
            id
        }
    },
    set_friendlink_detail: function (data) {
        return {
            type: actionTypes.RESPONSE_GET_FRIENDLINK_DETAIL,
            data
        }
    },
    save_friendlink:function (data) {
        return{
            type:actionTypes.SAVE_FRIENDLINK,
            data
        }
    }
};

export function reducer(state = initialState, action) {

    switch (action.type) {

        case actionTypes.RESPONSE_GET_FRIENDLINK_LIST:
            return {
                ...state, friendlinkList: [...action.data.list]
            };
        case actionTypes.RESPONSE_GET_FRIENDLINK_DETAIL:

            return {
                ...state, friendlinkDetail: Object.assign({},action.data)
            };


        default:
            return state;
    }
}
