import {combineReducers} from 'redux'
import {users} from './userReducer'
import {reducer as tags} from './tagsReducer'
import {reducer as newArticle} from "./newArticleReducer";
import {articles} from './articleReducer'
import {reducer as timeline} from './timelineReducer'
import {reducer as friendlink} from './friendlinkReducer'
import {reducer as comment} from './commentReducer'

export const actionTypes = {
    ADMIN_URI_LOCATION:"ADMIN_URI_LOCATION"
};

const initialState = {
    url:"/admin.html"
};

export const actions = {
    change_location_admin:function (url) {
        return{
            type:actionTypes.ADMIN_URI_LOCATION,
            data:url
        }
    }
};

export function reducer(state=initialState,action) {
    switch (action.type){
        case actionTypes.ADMIN_URI_LOCATION:
            return {
                ...state,url:action.data
            };
        default:
            return state
    }
}

const admin = combineReducers({
    adminGlobalState:reducer,
    users,
    tags,
    newArticle,
    articles,
    timeline,
    friendlink,
    comment
});

export default admin
