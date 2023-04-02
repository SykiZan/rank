import {
    GET_COMMENTS_STARTED,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAILURE,
    SET_COMMENTS_STARTED,
    SET_COMMENTS_SUCCESS,
    SET_COMMENTS_FAILURE,
    GET_POST_STARTED,
    GET_POST_SUCCESS,
    GET_POST_FAILURE,
    CLEAR_COMMENTS,
    GET_RELATED_NEWS_STARTED,
    GET_RELATED_NEWS_SUCCESS,
    GET_RELATED_NEWS_FAILURE,
    ADD_NEW_LIKE_STARTED,
    ADD_NEW_LIKE_SUCCESS,
    ADD_NEW_LIKE_FAILURE,
    UP_LIKE
} from "./types";



const initialState = {
    commentsStarted: false,
    comments: false,
    commentsData: false,
    commentsErr: false,
    setCommentsStarted: false,
    setComments: false,
    setCommentsErr: false,
    postStarted: false,
    post: false,
    postErr: false,
    relatedNewsStarted: false,
    relatedNews: false,
    relatedNewsErr: false,
    newLikeStarted: false,
    newLike: false,
    newLikeErr: false
};

export function postReducer(state = initialState, action) {
    switch (action.type) {
        case CLEAR_COMMENTS:
            return {
                ...state,
                comments: false,
                commentsData: false
            };
        case GET_COMMENTS_STARTED:
            return {
                ...state,
                commentsStarted: true
            };
        case GET_COMMENTS_SUCCESS:
            // let fixData;
            // if (state.commentsData){
            //
            //     let badData = {...state.commentsData, ...action.payload.data};
            //     console.log(state.commentsData);
            //     console.log(action.payload.data);
            //     console.log(badData);
            //     fixData = badData.slice(0, state.commentsData.length - action.payload.data.length);
            //     console.log(fixData);
            //
            // }

            return {
                ...state,
                comments: action.payload,
                commentsData: state.commentsData ? [...state.commentsData, ...action.payload.data] : action.payload.data,
                commentsStarted: false
            };
        case GET_COMMENTS_FAILURE:
            return {
                ...state,
                commentsErr: action.payload,
                commentsStarted: false
            };
        case SET_COMMENTS_STARTED:
            return {
                ...state,
                setCommentsStarted: true
            };
        case SET_COMMENTS_SUCCESS:
            return {
                ...state,
                setComments: action.payload,
                setCommentsStarted: false
            };
        case SET_COMMENTS_FAILURE:
            return {
                ...state,
                setCommentsErr: action.payload,
                setCommentsStarted: false
            };
        case GET_POST_STARTED:
            return {
                ...state,
                postStarted: true
            };
        case GET_POST_SUCCESS:
            return {
                ...state,
                post: action.payload,
                postStarted: false
            };
        case GET_POST_FAILURE:
            return {
                ...state,
                postErr: action.payload,
                postStarted: false
            };
        case GET_RELATED_NEWS_STARTED:
            return {
                ...state,
                relatedNewsStarted: true
            };
        case GET_RELATED_NEWS_SUCCESS:
            return {
                ...state,
                relatedNews: action.payload,
                relatedNewsStarted: false
            };
        case GET_RELATED_NEWS_FAILURE:
            return {
                ...state,
                relatedNewsErr: action.payload,
                relatedNewsStarted: false
            };
        case ADD_NEW_LIKE_STARTED:
            return {
                ...state,
                newLikeStarted: true
            };
        case ADD_NEW_LIKE_SUCCESS:
            return {
                ...state,
                newLike: action.payload,
                newLikeStarted: false
            };
        case ADD_NEW_LIKE_FAILURE:
            return {
                ...state,
                newLikeErr: action.payload,
                newLikeStarted: false
            };
        case UP_LIKE:
            return {
                ...state,
                post: {...state.post, likes_count: state.post.likes_count + 1}
            };
        default:
            return state;
    }
}

