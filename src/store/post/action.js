import axios from "axios";
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

import {api} from "../../api";
const host = api.host;

export const getComments = (id, link) => {
    let url = link ? link : host + api.post.comments + `/${id}`;

    return dispatch => {
        dispatch(getCommentsStarted());
        axios.get(url)
            .then(res => {
                dispatch(getCommentsSuccess(res.data.response));
            })
            .catch(err => {
                dispatch(getCommentsFailure(err));
            });
    };
};

const getCommentsStarted = () => ({
    type: GET_COMMENTS_STARTED
});

export const getCommentsSuccess = serverReport => ({
    type: GET_COMMENTS_SUCCESS,
    payload: serverReport
});

export const getCommentsFailure = error => ({
    type: GET_COMMENTS_FAILURE,
    payload: error
});

export const setComments = (comment, id, parentId) => {
    const token = localStorage.getItem('magicToken');
    let url = host + api.post.comments;
    let data;
    if (parentId){
        data = {post_id: id, message: comment, parent_comment_id: parentId}
    } else {
        data = {post_id: id, message: comment}
    }
    return async dispatch => {
        dispatch(setCommentsStarted());
        await axios.get(`${host + 'sanctum/csrf-cookie'}`);
        await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                dispatch(setCommentsSuccess(res.data.response));
            })
            .catch(err => {
                dispatch(setCommentsFailure(err));
            });
    };
};

const setCommentsStarted = () => ({
    type: SET_COMMENTS_STARTED
});

export const setCommentsSuccess = serverReport => ({
    type: SET_COMMENTS_SUCCESS,
    payload: serverReport
});

export const setCommentsFailure = error => ({
    type: SET_COMMENTS_FAILURE,
    payload: error
});

export const getPost = (id) => {
    // let url = host + api.post.post + `/${id}?lang=${lang}`;
    let url = host + api.post.post + `/${id}`;

    return dispatch => {
        dispatch(getPostStarted());
        axios.get(url)
            .then(res => {
                dispatch(getPostSuccess(res.data.response));
            })
            .catch(err => {
                dispatch(getPostFailure(err));
            });
    };
};

const getPostStarted = () => ({
    type: GET_POST_STARTED
});

export const getPostSuccess = serverReport => ({
    type: GET_POST_SUCCESS,
    payload: serverReport
});

export const getPostFailure = error => ({
    type: GET_POST_FAILURE,
    payload: error
});

export const clearComments = error => ({
    type: CLEAR_COMMENTS,
    payload: error
});

export const getRelatedNews = (id, lang) => {
    let url = host + api.post.post + `/${id}/similar?lang=${lang}`;

    return dispatch => {
        dispatch(getRelatedNewsStarted());
        axios.get(url)
            .then(res => {
                dispatch(getRelatedNewsSuccess(res.data.response));
            })
            .catch(err => {
                dispatch(getRelatedNewsFailure(err));
            });
    };
};

const getRelatedNewsStarted = () => ({
    type: GET_RELATED_NEWS_STARTED
});

export const getRelatedNewsSuccess = serverReport => ({
    type: GET_RELATED_NEWS_SUCCESS,
    payload: serverReport
});

export const getRelatedNewsFailure = error => ({
    type: GET_RELATED_NEWS_FAILURE,
    payload: error
});


export const addNewLike = (id) => {
    let url = host + api.post.post + `/${id}/like`;

    return dispatch => {
        dispatch(addNewLikeStarted());
        axios.get(url)
            .then(res => {
                dispatch(addNewLikeSuccess(res.data.response));
                dispatch(upLike());
            })
            .catch(err => {
                dispatch(addNewLikeFailure(err));
            });
    };
};

const addNewLikeStarted = () => ({
    type: ADD_NEW_LIKE_STARTED
});

export const addNewLikeSuccess = serverReport => ({
    type: ADD_NEW_LIKE_SUCCESS,
    payload: serverReport
});

export const addNewLikeFailure = error => ({
    type: ADD_NEW_LIKE_FAILURE,
    payload: error
});

export const upLike = () => ({
    type: UP_LIKE,
});
