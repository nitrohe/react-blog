const initialState = {
    timelineList: [],
    timelineDetail: {},
    pageNum: 1,
    total: 0
};

export const actionTypes = {
    GET_TIMELINE_LIST: 'GET_TIMELINE_LIST',
    RESPONSE_GET_TIMELINE_LIST: "RESPONSE_GET_TIMELINE_LIST",
    GET_TIMELINE_DETAIL: 'GET_TIMELINE_DETAIL',
    SET_TIMELINE_DETAIL: 'GET_TIMELINE_DETAIL',
    RESPONSE_GET_TIMELINE_DETAIL: "RESPONSE_GET_TIMELINE_DETAIL",
    GET_TIMELINE_DETAIL: "GET_TIMELINE_DETAIL",
    DELETE_TIMELINE: "DELETE_TIMELINE",
    SAVE_TIMELINE: 'SAVE_TIMELINE',
    //RESPONSE_SAVE_TIMELINE: "RESPONSE_SAVE_TIMELINE",
};

export const actions = {
    get_timeline_list: function (pageNum = 1) {
        return {
            type: actionTypes.GET_TIMELINE_LIST,
            pageNum
        }
    },
    delete_timeline: function (id) {
        return {
            type: actionTypes.DELETE_TIMELINE,
            id
        }
    },
    get_timeline_detail: function (id) {
        return {
            type: actionTypes.GET_TIMELINE_DETAIL,
            id
        }
    },
    set_timeline_detail: function (data) {
        return {
            type: actionTypes.RESPONSE_GET_TIMELINE_DETAIL,
            data
        }
    },
    save_timeline:function (data) {
        return{
            type:actionTypes.SAVE_TIMELINE,
            data
        }
    }
};

export function reducer(state = initialState, action) {

    switch (action.type) {

        case actionTypes.RESPONSE_GET_TIMELINE_LIST:
            return {
                ...state, timelineList: [...action.data.list]
            };
        case actionTypes.RESPONSE_GET_TIMELINE_DETAIL:

            return {
                ...state, timelineDetail: Object.assign({},action.data)
            };


        default:
            return state;
    }
}
