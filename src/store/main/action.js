import axios from "axios";


import {
    GET_CURRENT_CITY_STARTED,
    GET_CURRENT_CITY_SUCCESS,
    GET_CURRENT_CITY_FAILURE,
    SET_INIT_STORE,
    SET_CURRENT_MOVIE,
    GET_SUBSCRIBERS_STARTED,
    GET_SUBSCRIBERS_SUCCESS,
    GET_SUBSCRIBERS_FAILURE,
    GET_TAGS_STARTED,
    GET_TAGS_SUCCESS,
    GET_TAGS_FAILURE,
    GET_CATEGORIES_STARTED,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILURE,
    GET_POSTS_STARTED,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAILURE,
    SET_LOGIN_STARTED,
    SET_LOGIN_SUCCESS,
    SET_LOGIN_FAILURE,
    SET_LOGIN_STATUS,
    SET_THEME_MODE_STATUS,
    GET_PREVIEW_MAIN_NEWS_STARTED,
    GET_PREVIEW_MAIN_NEWS_SUCCESS,
    GET_PREVIEW_MAIN_NEWS_FAILURE,
    GET_NAVIGATION_CATEGORIES_STARTED,
    GET_NAVIGATION_CATEGORIES_SUCCESS,
    GET_NAVIGATION_CATEGORIES_FAILURE,
    GET_CATEGORIES_NEWS_STARTED,
    GET_CATEGORIES_NEWS_SUCCESS,
    GET_CATEGORIES_NEWS_FAILURE,
    SET_MAIN_CATEGORY,
    GET_PAGINATE_CATEGORIES_NEWS_STARTED,
    GET_PAGINATE_CATEGORIES_NEWS_SUCCESS,
    GET_PAGINATE_CATEGORIES_NEWS_FAILURE,
    GET_MOST_POPULAR_NEWS_STARTED,
    GET_MOST_POPULAR_NEWS_SUCCESS,
    GET_MOST_POPULAR_NEWS_FAILURE,
    GET_MOST_VIEWED_NEWS_STARTED,
    GET_MOST_VIEWED_NEWS_SUCCESS,
    GET_MOST_VIEWED_NEWS_FAILURE,
    GET_MOVIES_STARTED,
    GET_MOVIES_SUCCESS,
    GET_MOVIES_FAILURE,
    SET_MOBILE_NAVIGATE_STATUS,
    GET_SHORT_NEWS_STARTED,
    GET_SHORT_NEWS_SUCCESS,
    GET_SHORT_NEWS_FAILURE,
    SET_CURRENT_LANG,
    GET_CRYPTO_STARTED,
    GET_CRYPTO_SUCCESS,
    GET_CRYPTO_FAILURE,
    SORT_CRYPTO,
    GET_VOTE_STARTED,
    GET_VOTE_SUCCESS,
    GET_VOTE_FAILURE,
    SET_VOTE_STARTED,
    SET_VOTE_SUCCESS,
    SET_VOTE_FAILURE,
    BASE_REG_STARTED,
    BASE_REG_SUCCESS,
    BASE_REG_FAILURE,
    BASE_LOG_STARTED,
    BASE_LOG_SUCCESS,
    BASE_LOG_FAILURE,
    GET_USER_DATA_STARTED,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAILURE,
    SET_MAGIC_TOKEN,
    SET_MAGIC_NAME,
    GET_CABINET_LINK_STARTED,
    GET_CABINET_LINK_SUCCESS,
    GET_CABINET_LINK_FAILURE,
    SET_AD_STARTED,
    SET_AD_SUCCESS,
    SET_AD_FAILURE,
    GET_VOTE_RESULT_STARTED,
    GET_VOTE_RESULT_SUCCESS,
    GET_VOTE_RESULT_FAILURE,
    SET_VOTE_RESULT_ALL
} from "./types";

import {api} from "../../api";
axios.defaults.withCredentials = true;
const host = api.host;


export const setInitStore = data => ({
    type: SET_INIT_STORE,
    payload: data
});

export const setMobileNavigateStatus = status => ({
    type: SET_MOBILE_NAVIGATE_STATUS,
    payload: status
});

export const getSubscribers = () => {
    let url = host + api.main.subscribers;

    return dispatch => {
        dispatch(getSubscribersStarted());
        axios.get(url)
            .then(res => {
                dispatch(getSubscribersSuccess(res.data.response));
            })
            .catch(err => {
                dispatch(getSubscribersFailure(err));
            });
    };
};

const getSubscribersStarted = () => ({
    type: GET_SUBSCRIBERS_STARTED
});

export const getSubscribersSuccess = serverReport => ({
    type: GET_SUBSCRIBERS_SUCCESS,
    payload: serverReport
});

export const getSubscribersFailure = error => ({
    type: GET_SUBSCRIBERS_FAILURE,
    payload: error
});

export const getTags = (lang) => {
    let url = host + api.main.tags + `?lang=${lang}`;

    return dispatch => {
        dispatch(getTagsStarted());
        axios.get(url)
            .then(res => {
                dispatch(getTagsSuccess(res.data.response));
            })
            .catch(err => {
                dispatch(getTagsFailure(err));
            });
    };
};

const getTagsStarted = () => ({
    type: GET_TAGS_STARTED
});

export const getTagsSuccess = serverReport => ({
    type: GET_TAGS_SUCCESS,
    payload: serverReport
});

export const getTagsFailure = error => ({
    type: GET_TAGS_FAILURE,
    payload: error
});

export const getCategories = (lang) => {
    let url = host + api.main.categories + `?lang=${lang}`;

    return dispatch => {
        dispatch(getCategoriesStarted());
        axios.get(url)
            .then(res => {
                dispatch(getCategoriesSuccess(res.data.response));
            })
            .catch(err => {
                dispatch(getCategoriesFailure(err));
            });
    };
};

const getCategoriesStarted = () => ({
    type: GET_CATEGORIES_STARTED
});

export const getCategoriesSuccess = serverReport => ({
    type: GET_CATEGORIES_SUCCESS,
    payload: serverReport
});

export const getCategoriesFailure = error => ({
    type: GET_CATEGORIES_FAILURE,
    payload: error
});

export const getPosts = (lang) => {
    let url = host + api.main.posts + `?lang=${lang}`;

    return dispatch => {
        dispatch(getPostsStarted());
        axios.get(url)
            .then(res => {
                dispatch(getPostsSuccess(res.data.response));
            })
            .catch(err => {
                dispatch(getPostsFailure(err));
            });
    };
};

const getPostsStarted = () => ({
    type: GET_POSTS_STARTED
});

export const getPostsSuccess = serverReport => ({
    type: GET_POSTS_SUCCESS,
    payload: serverReport
});

export const getPostsFailure = error => ({
    type: GET_POSTS_FAILURE,
    payload: error
});


export const login = (props) => {
    const {data, type} = props;
    let url = host + api.main.login;
    axios.defaults.withCredentials = true;


    return dispatch => {
        dispatch(setLoginStarted());
        axios.get(`${host + 'sanctum/csrf-cookie'}`).then(response => {
            axios.post(url, data)
                .then(res => {
                    dispatch(setLoginSuccess(res.data.response));
                    localStorage.setItem('token', res.data.response.token);
                    dispatch(setLoginStatus({status: true, type: type, address: data.address}));
                })
                .catch(err => {
                    dispatch(setLoginFailure(err));
                    // dispatch(setLoginStatus({status: false, type: false, address: false}));
                });
        });
    };
};

const setLoginStarted = () => ({
    type: SET_LOGIN_STARTED
});

export const setLoginSuccess = serverReport => ({
    type: SET_LOGIN_SUCCESS,
    payload: serverReport
});

export const setLoginFailure = error => ({
    type: SET_LOGIN_FAILURE,
    payload: error
});


export const getCurrentCity = () => {

    return dispatch => {
        dispatch(getCurrentCityStarted());
        axios.get('https://geolocation-db.com/json')
            .then(res => {
                dispatch(getCurrentCitySuccess(res));
            })
            .catch(err => {
                dispatch(getCurrentCityFailure(err));
            });
    };
};

const getCurrentCityStarted = () => ({
    type: GET_CURRENT_CITY_STARTED
});

export const getCurrentCitySuccess = serverReport => ({
    type: GET_CURRENT_CITY_SUCCESS,
    payload: serverReport
});

export const getCurrentCityFailure = error => ({
    type: GET_CURRENT_CITY_FAILURE,
    payload: error
});

export const setCurrentMovie = currentMovie => ({
    type: SET_CURRENT_MOVIE,
    payload: currentMovie
});

export const setLoginStatus = loginStatus => ({
    type: SET_LOGIN_STATUS,
    payload: loginStatus
});

export const setThemeModeStatus = modeStatus => ({
    type: SET_THEME_MODE_STATUS,
    payload: modeStatus
});

export const getPreviewMainNews = (lang) => {
    let url = host + api.main.previewMainNews + `?lang=${lang}`;

    return dispatch => {
        dispatch(getPreviewMainNewsStarted());
        axios.get(url)
            .then(res => {
                dispatch(getPreviewMainNewsSuccess(res.data.response));
            })
            .catch(err => {
                dispatch(getPreviewMainNewsFailure(err));
            });
    };
};

const getPreviewMainNewsStarted = () => ({
    type: GET_PREVIEW_MAIN_NEWS_STARTED
});

export const getPreviewMainNewsSuccess = serverReport => ({
    type: GET_PREVIEW_MAIN_NEWS_SUCCESS,
    payload: serverReport
});

export const getPreviewMainNewsFailure = error => ({
    type: GET_PREVIEW_MAIN_NEWS_FAILURE,
    payload: error
});

export const getNavigationCategories = (num, lang) => {
    let url = host + api.main.categories + `?most_popular=${num}&lang=${lang}`;

    return dispatch => {
        dispatch(getNavigationCategoriesStarted());
        axios.get(url)
            .then(res => {
                dispatch(getNavigationCategoriesSuccess(res.data.response));
            })
            .catch(err => {
                dispatch(getNavigationCategoriesFailure(err));
            });
    };
};

const getNavigationCategoriesStarted = () => ({
    type: GET_NAVIGATION_CATEGORIES_STARTED
});

export const getNavigationCategoriesSuccess = serverReport => ({
    type: GET_NAVIGATION_CATEGORIES_SUCCESS,
    payload: serverReport
});

export const getNavigationCategoriesFailure = error => ({
    type: GET_NAVIGATION_CATEGORIES_FAILURE,
    payload: error
});

export const getCategoriesNews = (category, limit, lang) => {
    let url;
    if (category){
        url = host + api.main.posts + `?category=${category}&limit=${limit}&lang=${lang}`;
    } else {
        url = host + api.main.posts + `?limit=${limit}&lang=${lang}`;
    }


    return dispatch => {
        dispatch(getCategoriesNewsStarted());
        axios.get(url)
            .then(res => {
                dispatch(getCategoriesNewsSuccess(res.data.response));
            })
            .catch(err => {
                dispatch(getCategoriesNewsFailure(err));
            });
    };
};

const getCategoriesNewsStarted = () => ({
    type: GET_CATEGORIES_NEWS_STARTED
});

export const getCategoriesNewsSuccess = serverReport => ({
    type: GET_CATEGORIES_NEWS_SUCCESS,
    payload: serverReport
});

export const getCategoriesNewsFailure = error => ({
    type: GET_CATEGORIES_NEWS_FAILURE,
    payload: error
});

export const setMainCategory = category => ({
    type: SET_MAIN_CATEGORY,
    payload: category
});

export const getPaginateCategoriesNews = (type, id, page, lang) => {
    let url;
    if (type && id){
        url = host + api.main.paginatePosts + `?${type}=${id}&page=${page}&lang=${lang}`;
    } else {
        url = host + api.main.paginatePosts + `?page=${page}&lang=${lang}`;
    }


    return dispatch => {
        dispatch(getPaginateCategoriesNewsStarted());
        axios.get(url)
            .then(res => {
                dispatch(getPaginateCategoriesNewsSuccess(res.data.response));
            })
            .catch(err => {
                dispatch(getPaginateCategoriesNewsFailure(err));
            });
    };
};

const getPaginateCategoriesNewsStarted = () => ({
    type: GET_PAGINATE_CATEGORIES_NEWS_STARTED
});

export const getPaginateCategoriesNewsSuccess = serverReport => ({
    type: GET_PAGINATE_CATEGORIES_NEWS_SUCCESS,
    payload: serverReport
});

export const getPaginateCategoriesNewsFailure = error => ({
    type: GET_PAGINATE_CATEGORIES_NEWS_FAILURE,
    payload: error
});

export const getMostPopularNews = (limit, lang) => {
    let url = host + api.main.posts + `?most_popular=1&limit=${limit}&lang=${lang}`;


    return dispatch => {
        dispatch(getMostPopularNewsStarted());
        axios.get(url)
            .then(res => {
                dispatch(getMostPopularNewsSuccess(res.data.response));
            })
            .catch(err => {
                dispatch(getMostPopularNewsFailure(err));
            });
    };
};

const getMostPopularNewsStarted = () => ({
    type: GET_MOST_POPULAR_NEWS_STARTED
});

export const getMostPopularNewsSuccess = serverReport => ({
    type: GET_MOST_POPULAR_NEWS_SUCCESS,
    payload: serverReport
});

export const getMostPopularNewsFailure = error => ({
    type: GET_MOST_POPULAR_NEWS_FAILURE,
    payload: error
});

export const getMostViewedNews = (limit, lang) => {
    let url = host + api.main.posts + `?most_viewed=1&limit=${limit}&lang=${lang}`;


    return dispatch => {
        dispatch(getMostViewedNewsStarted());
        axios.get(url)
            .then(res => {
                dispatch(getMostViewedNewsSuccess(res.data.response));
            })
            .catch(err => {
                dispatch(getMostViewedNewsFailure(err));
            });
    };
};

const getMostViewedNewsStarted = () => ({
    type: GET_MOST_VIEWED_NEWS_STARTED
});

export const getMostViewedNewsSuccess = serverReport => ({
    type: GET_MOST_VIEWED_NEWS_SUCCESS,
    payload: serverReport
});

export const getMostViewedNewsFailure = error => ({
    type: GET_MOST_VIEWED_NEWS_FAILURE,
    payload: error
});


export const getMovies = (lng) => {
    const YTKey = 'AIzaSyBjBtkjvQciPZyGRbeaixnIbwH7zNiQgnw';
    // const YTKey = 'AIzaSyAundqnvxEEcY59kM0nVT00AAy_cs6ZLGI';
    const YTListId = 'PLGWoWdnsynG49onaGJZguYFJQyFzoHLVE';
    const EngYTListId = 'PLGWoWdnsynG5x3Bd-9sa2ZD68vXRelFKV';
    const YTMax = 50;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${lng === 'en' ? EngYTListId : YTListId}&maxResults=${YTMax}&key=${YTKey}`;
    axios.defaults.withCredentials = false;
// &playlistId=${YTListId}&maxResults=${YTMax}


    return dispatch => {
        dispatch(getMoviesStarted());
        axios.get(url)
            .then(res => {
                dispatch(getMoviesSuccess(res.data));
                dispatch(setCurrentMovie({
                    id: res.data.items[0].id,
                    link: res.data.items[0].snippet.resourceId.videoId
                }))
            })
            .catch(err => {
                dispatch(getMoviesFailure(err));
            });
    };
};

const getMoviesStarted = () => ({
    type: GET_MOVIES_STARTED
});

export const getMoviesSuccess = serverReport => ({
    type: GET_MOVIES_SUCCESS,
    payload: serverReport
});

export const getMoviesFailure = error => ({
    type: GET_MOVIES_FAILURE,
    payload: error
});


export const getShortNews = (lang) => {
    let url = host + api.main.posts + `?category=2&limit=4&lang=${lang}`;


    return dispatch => {
        dispatch(getShortNewsStarted());
        axios.get(url)
            .then(res => {
                dispatch(getShortNewsSuccess(res.data.response));
            })
            .catch(err => {
                dispatch(getShortNewsFailure(err));
            });
    };
};

const getShortNewsStarted = () => ({
    type: GET_SHORT_NEWS_STARTED
});

export const getShortNewsSuccess = serverReport => ({
    type: GET_SHORT_NEWS_SUCCESS,
    payload: serverReport
});

export const getShortNewsFailure = error => ({
    type: GET_SHORT_NEWS_FAILURE,
    payload: error
});

export const setCurrentLang = lang => ({
    type: SET_CURRENT_LANG,
    payload: lang
});

export const getCrypto = () => {
    let url = host + api.main.crypto;


    return dispatch => {
        dispatch(getCryptoStarted());
        axios.get(url)
            .then(res => {
                dispatch(getCryptoSuccess(res.data.response));
            })
            .catch(err => {
                dispatch(getCryptoFailure(err));
            });
    };
};

const getCryptoStarted = () => ({
    type: GET_CRYPTO_STARTED
});

export const getCryptoSuccess = serverReport => ({
    type: GET_CRYPTO_SUCCESS,
    payload: serverReport
});

export const getCryptoFailure = error => ({
    type: GET_CRYPTO_FAILURE,
    payload: error
});

export const sortCrypto = data => ({
    type: SORT_CRYPTO,
    payload: data
});


export const getVote = () => {
    let url = host + api.main.questions;


    return dispatch => {
        dispatch(getVoteStarted());
        axios.get(url)
            .then(res => {
                dispatch(getVoteSuccess(res.data.response));
            })
            .catch(err => {
                dispatch(getVoteFailure(err));
            });
    };
};

const getVoteStarted = () => ({
    type: GET_VOTE_STARTED
});

export const getVoteSuccess = serverReport => ({
    type: GET_VOTE_SUCCESS,
    payload: serverReport
});

export const getVoteFailure = error => ({
    type: GET_VOTE_FAILURE,
    payload: error
});


export const setVote = (qId, vId) => {
    let url = host + api.main.vote + `/${vId}`;

    const oldVotes = JSON.parse(localStorage.getItem('votes'));
    if (oldVotes){
        localStorage.setItem('votes', JSON.stringify(oldVotes.concat([qId])))
    } else {
        localStorage.setItem('votes', JSON.stringify([qId]))
    }


    return dispatch => {
        dispatch(setVoteStarted());
        axios.get(`${host + 'sanctum/csrf-cookie'}`).then(response => {
            axios.post(url)
                .then(res => {
                    dispatch(setVoteSuccess(res.data.response));
                })
                .catch(err => {
                    dispatch(setVoteFailure(err));
                });
        })
    };
};

const setVoteStarted = () => ({
    type: SET_VOTE_STARTED
});

export const setVoteSuccess = serverReport => ({
    type: SET_VOTE_SUCCESS,
    payload: serverReport
});

export const setVoteFailure = error => ({
    type: SET_VOTE_FAILURE,
    payload: error
});

export const baseReg = (data) => {
    let url = host + api.main.baseReg;
    axios.defaults.withCredentials = false;

    return dispatch => {
        dispatch(baseRegStarted());
        axios.post(url, data)
            .then(res => {
                localStorage.setItem('magicToken', res.data.response);
                dispatch(baseRegSuccess(res.data.response));
                dispatch(getUserData(res.data.response));
            })
            .catch(err => {
                dispatch(baseRegFailure(err.response.data.response.errors));
            });
    };
};

const baseRegStarted = () => ({
    type: BASE_REG_STARTED
});

export const baseRegSuccess = serverReport => ({
    type: BASE_REG_SUCCESS,
    payload: serverReport
});

export const baseRegFailure = error => ({
    type: BASE_REG_FAILURE,
    payload: error
});


export const baseLog = (data) => {
    let url = host + api.main.baseLog;
    axios.defaults.withCredentials = false;

    return dispatch => {
        dispatch(baseLogStarted());
        axios.post(url, data)
            .then(res => {
                localStorage.setItem('magicToken', res.data.response);
                dispatch(baseLogSuccess(res.data.response));
                dispatch(getUserData(res.data.response));
            })
            .catch(err => {
                dispatch(baseLogFailure(err.response.data.response.errors));
            });
    };
};

const baseLogStarted = () => ({
    type: BASE_LOG_STARTED
});

export const baseLogSuccess = serverReport => ({
    type: BASE_LOG_SUCCESS,
    payload: serverReport
});

export const baseLogFailure = error => ({
    type: BASE_LOG_FAILURE,
    payload: error
});


export const getUserData = (token) => {
    let url = host + api.main.user;
    const magicToken = localStorage.getItem('magicToken');

    return dispatch => {
        dispatch(getUserDataStarted());
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token ? token : magicToken}`
            }
        })
            .then(res => {
                dispatch(getUserDataSuccess(res.data.response));
                dispatch(setMagicName(res.data.response.name));
                dispatch(setMagicToken(token ? token : magicToken));
                localStorage.setItem('magicName', res.data.response.name);
            })
            .catch(err => {
                dispatch(getUserDataFailure(err));
                dispatch(setMagicName(false));
                dispatch(setMagicToken(false));
            });
    };
};

const getUserDataStarted = () => ({
    type: GET_USER_DATA_STARTED
});

export const getUserDataSuccess = serverReport => ({
    type: GET_USER_DATA_SUCCESS,
    payload: serverReport
});

export const getUserDataFailure = error => ({
    type: GET_USER_DATA_FAILURE,
    payload: error
});

export const setMagicToken = token => ({
    type: SET_MAGIC_TOKEN,
    payload: token
});

export const setMagicName = name => ({
    type: SET_MAGIC_NAME,
    payload: name
});

export const getCabinetLink = () => {
    let url = host + api.main.cabinetLink;
    const magicToken = localStorage.getItem('magicToken');


    return async dispatch => {
        dispatch(getCabinetLinkStarted());
        try {
            const {data} = await axios.post(url, null,{
                headers: {
                    'Authorization': `Bearer ${magicToken}`
                }
            });
            dispatch(getCabinetLinkSuccess(data.response));
        }catch(e){
            dispatch(getCabinetLinkFailure(e));
        }
    };
};

const getCabinetLinkStarted = () => ({
    type: GET_CABINET_LINK_STARTED
});

export const getCabinetLinkSuccess = link => ({
    type: GET_CABINET_LINK_SUCCESS,
    payload: link
});

export const getCabinetLinkFailure = error => ({
    type: GET_CABINET_LINK_FAILURE,
    payload: error
});

export const ad = (data) => {
    let url = host + api.main.ad;
    // axios.defaults.withCredentials = false;

    return dispatch => {
        dispatch(adStarted());
        axios.post(url, data)
            .then(res => {
                dispatch(adSuccess(res.data));
            })
            .catch(err => {
                dispatch(adFailure(err.response.data.response.errors));
            });
    };
};

const adStarted = () => ({
    type: SET_AD_STARTED
});

export const adSuccess = serverReport => ({
    type: SET_AD_SUCCESS,
    payload: serverReport
});

export const adFailure = error => ({
    type: SET_AD_FAILURE,
    payload: error
});


export const getVoteResult = () => {
    let url = host + api.main.questionsResult;


    return dispatch => {
        dispatch(getVoteResultStarted());
        axios.get(url)
            .then(res => {
                dispatch(getVoteResultSuccess(res.data.response));
                let resultSum = 0;
                res.data.response.answers.forEach((item)=>{
                    resultSum = resultSum + item.votes_amount
                })
                dispatch(setVoteResultAll(resultSum));
            })
            .catch(err => {
                dispatch(getVoteResultFailure(err));
            });
    };
};

const getVoteResultStarted = () => ({
    type: GET_VOTE_RESULT_STARTED
});

export const getVoteResultSuccess = serverReport => ({
    type: GET_VOTE_RESULT_SUCCESS,
    payload: serverReport
});

export const getVoteResultFailure = error => ({
    type: GET_VOTE_RESULT_FAILURE,
    payload: error
});

export const setVoteResultAll = all => ({
    type: SET_VOTE_RESULT_ALL,
    payload: all
});




