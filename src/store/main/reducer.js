import {
    TEST,
    GET_CURRENT_CITY_STARTED,
    GET_CURRENT_CITY_SUCCESS,
    GET_CURRENT_CITY_FAILURE,
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

import testImg from '../../theme/assets/other/slide1.jpg';
import i18n from "i18next";




const initialState = {
    mobileNavigateStatus: false,
    currentCityStarted: false,
    currentCity: 'Kiev',
    currentCityErr: false,
    subscribersStarted: false,
    subscribers: false,
    subscribersErr: false,
    previewMainNewsStarted: false,
    previewMainNews: false,
    previewMainNewsErr: false,
    tagsStarted: false,
    tags: false,
    tagsErr: false,
    categoriesStarted: false,
    categories: false,
    categoriesErr: false,
    postsStarted: false,
    posts: false,
    postsErr: false,
    loginStarted: false,
    login: false,
    loginErr: false,
    loginStatus: {status: false, type: false, address: false},
    navigationCategories: false,
    navigationCategoriesErr: false,
    navigationCategoriesStarted: false,
    categoriesNews: false,
    categoriesNewsErr: false,
    categoriesNewsStarted: false,
    mostPopularNews: false,
    mostPopularNewsErr: false,
    mostPopularNewsStarted: false,
    mostViewedNews: false,
    mostViewedNewsErr: false,
    mostViewedNewsStarted: false,
    paginateCategoriesNews: false,
    paginateCategoriesNewsErr: false,
    paginateCategoriesNewsStarted: false,
    shortNewsStarted: false,
    shortNews: false,
    shortNewsErr: false,
    mainCategory: {id: false, name: 'Все'},
    themeModeStatus: JSON.parse(localStorage.getItem('mode')) ? JSON.parse(localStorage.getItem('mode')) : false,
    moviesListStarted: false,
    moviesList: false,
    moviesListErr: false,
    cryptoStarted: false,
    crypto: false,
    cryptoErr: false,
    voteStarted: false,
    vote: false,
    voteErr: false,
    setVoteStarted: false,
    setVote: false,
    setVoteErr: false,
    movies: [
        {
            id: 1,
            img: testImg,
            link: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            title: 'Never Gonna Give You Up',
            author: 'Rick Astley'
        },
        {
            id: 2,
            img: testImg,
            link: 'https://www.youtube.com/embed/YnopHCL1Jk8',
            title: 'Dragostea Din Tei',
            author: 'O-Zone'
        },
        {
            id: 3,
            img: testImg,
            link: 'https://www.youtube.com/embed/QW8TID50L8I',
            title: 'Bayraktar',
            author: 'Ukraine army edition'
        },
        {
            id: 4,
            img: testImg,
            link: 'https://www.youtube.com/embed/0TFNGRYMz1U',
            title: 'Je veux',
            author: 'ZAZ'
        },
        {
            id: 5,
            img: testImg,
            link: 'https://www.youtube.com/embed/_nSmmhjwTGk',
            title: 'ПАПЯРОСКА',
            author: 'BRUTTO'
        },
        {
            id: 6,
            img: testImg,
            link: 'https://www.youtube.com/embed/CVY5YxluoIw',
            title: '26.04',
            author: 'Noize MC'
        }
    ],
    currentMovie: false,
    baseRegStarted: false,
    baseReg: false,
    baseRegErr: false,
    baseLogStarted: false,
    baseLog: false,
    baseLogErr: false,
    userDataStarted: false,
    userData: false,
    userDataErr: false,
    lang: i18n.language,
    magicToken: localStorage.getItem('magicToken') ? localStorage.getItem('magicToken') : false,
    magicName: localStorage.getItem('magicName') ? localStorage.getItem('magicName') : false,
    cabinetLinkStarted: false,
    cabinetLink: false,
    cabinetLinkErr: false,
    adStarted: false,
    ad: false,
    adErr: false,
    voteResultStarted: false,
    voteResult: false,
    voteResultErr: false,
    voteResultAll: false
};

export function mainReducer(state = initialState, action) {
    switch (action.type) {
        case TEST:
            return {
                ...state,
                status: action.payload
            };
        case SET_MOBILE_NAVIGATE_STATUS:
            return {
                ...state,
                mobileNavigateStatus: action.payload
            };
        case GET_CURRENT_CITY_STARTED:
            return {
                ...state,
                currentCityStarted: true
            };
        case GET_CURRENT_CITY_SUCCESS:
            return {
                ...state,
                currentCity: action.payload,
                currentCityStarted: false
            };
        case GET_CURRENT_CITY_FAILURE:
            return {
                ...state,
                currentCityErr: action.payload,
                currentCityStarted: false
            };
        case GET_SUBSCRIBERS_STARTED:
            return {
                ...state,
                subscribersStarted: true
            };
        case GET_SUBSCRIBERS_SUCCESS:
            return {
                ...state,
                subscribers: action.payload,
                subscribersStarted: false
            };
        case GET_SUBSCRIBERS_FAILURE:
            return {
                ...state,
                subscribersErr: action.payload,
                subscribersStarted: false
            };
        case GET_PREVIEW_MAIN_NEWS_STARTED:
            return {
                ...state,
                previewMainNewsStarted: true
            };
        case GET_PREVIEW_MAIN_NEWS_SUCCESS:
            return {
                ...state,
                previewMainNews: action.payload,
                previewMainNewsStarted: false
            };
        case GET_PREVIEW_MAIN_NEWS_FAILURE:
            return {
                ...state,
                previewMainNewsErr: action.payload,
                previewMainNewsStarted: false
            };
        case SET_CURRENT_MOVIE:
            return {
                ...state,
                currentMovie: action.payload
            };
        case GET_TAGS_STARTED:
            return {
                ...state,
                tagsStarted: true
            };
        case GET_TAGS_SUCCESS:
            return {
                ...state,
                tags: action.payload,
                tagsStarted: false
            };
        case GET_TAGS_FAILURE:
            return {
                ...state,
                tagsErr: action.payload,
                tagsStarted: false
            };
        case GET_CATEGORIES_STARTED:
            return {
                ...state,
                categoriesStarted: true
            };
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                categoriesStarted: false
            };
        case GET_CATEGORIES_FAILURE:
            return {
                ...state,
                categoriesErr: action.payload,
                categoriesStarted: false
            };
        case GET_POSTS_STARTED:
            return {
                ...state,
                postsStarted: true
            };
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                postsStarted: false
            };
        case GET_POSTS_FAILURE:
            return {
                ...state,
                postsErr: action.payload,
                postsStarted: false
            };
        case SET_LOGIN_STARTED:
            return {
                ...state,
                loginStarted: true
            };
        case SET_LOGIN_SUCCESS:
            return {
                ...state,
                login: action.payload,
                loginStarted: false
            };
        case SET_LOGIN_FAILURE:
            return {
                ...state,
                loginErr: action.payload,
                loginStarted: false
            };
        case GET_NAVIGATION_CATEGORIES_STARTED:
            return {
                ...state,
                navigationCategoriesStarted: true
            };
        case GET_NAVIGATION_CATEGORIES_SUCCESS:
            return {
                ...state,
                navigationCategories: action.payload,
                navigationCategoriesStarted: false
            };
        case GET_NAVIGATION_CATEGORIES_FAILURE:
            return {
                ...state,
                navigationCategoriesErr: action.payload,
                navigationCategoriesStarted: false
            };
        case GET_CATEGORIES_NEWS_STARTED:
            return {
                ...state,
                categoriesNewsStarted: true
            };
        case GET_CATEGORIES_NEWS_SUCCESS:
            return {
                ...state,
                categoriesNews: action.payload,
                categoriesNewsStarted: false
            };
        case GET_CATEGORIES_NEWS_FAILURE:
            return {
                ...state,
                categoriesNewsErr: action.payload,
                categoriesNewsStarted: false
            };
        case GET_PAGINATE_CATEGORIES_NEWS_STARTED:
            return {
                ...state,
                paginateCategoriesNewsStarted: true
            };
        case GET_PAGINATE_CATEGORIES_NEWS_SUCCESS:
            return {
                ...state,
                paginateCategoriesNews: action.payload,
                paginateCategoriesNewsStarted: false
            };
        case GET_PAGINATE_CATEGORIES_NEWS_FAILURE:
            return {
                ...state,
                paginateCategoriesNewsErr: action.payload,
                paginateCategoriesNewsStarted: false
            };
        case SET_LOGIN_STATUS:
            return {
                ...state,
                loginStatus: action.payload,
            };
        case SET_THEME_MODE_STATUS:
            return {
                ...state,
                themeModeStatus: action.payload,
            };
        case SET_MAIN_CATEGORY:
            return {
                ...state,
                mainCategory: action.payload,
            };
        case GET_MOST_POPULAR_NEWS_STARTED:
            return {
                ...state,
                mostPopularNewsStarted: true
            };
        case GET_MOST_POPULAR_NEWS_SUCCESS:
            return {
                ...state,
                mostPopularNews: action.payload,
                mostPopularNewsStarted: false
            };
        case GET_MOST_POPULAR_NEWS_FAILURE:
            return {
                ...state,
                mostPopularNewsErr: action.payload,
                mostPopularNewsStarted: false
            };
        case GET_MOST_VIEWED_NEWS_STARTED:
            return {
                ...state,
                mostViewedNewsStarted: true
            };
        case GET_MOST_VIEWED_NEWS_SUCCESS:
            return {
                ...state,
                mostViewedNews: action.payload,
                mostViewedNewsStarted: false
            };
        case GET_MOST_VIEWED_NEWS_FAILURE:
            return {
                ...state,
                mostViewedNewsErr: action.payload,
                mostViewedNewsStarted: false
            };
        case GET_MOVIES_STARTED:
            return {
                ...state,
                moviesListStarted: true
            };
        case GET_MOVIES_SUCCESS:
            return {
                ...state,
                moviesList: action.payload,
                moviesListStarted: false
            };
        case GET_MOVIES_FAILURE:
            return {
                ...state,
                moviesListErr: action.payload,
                moviesListStarted: false
            };
        case GET_SHORT_NEWS_STARTED:
            return {
                ...state,
                shortNewsStarted: true
            };
        case GET_SHORT_NEWS_SUCCESS:
            return {
                ...state,
                shortNews: action.payload,
                shortNewsStarted: false
            };
        case GET_SHORT_NEWS_FAILURE:
            return {
                ...state,
                shortNewsErr: action.payload,
                shortNewsStarted: false
            };
        case GET_CRYPTO_STARTED:
            return {
                ...state,
                cryptoStarted: true
            };
        case GET_CRYPTO_SUCCESS:
            return {
                ...state,
                crypto: action.payload,
                cryptoStarted: false
            };
        case GET_CRYPTO_FAILURE:
            return {
                ...state,
                cryptoErr: action.payload,
                cryptoStarted: false
            };
        case SET_CURRENT_LANG:
            return {
                ...state,
                lang: action.payload
            };
        case SORT_CRYPTO:
            return {
                ...state,
                crypto: [...action.payload],
            };
        case GET_VOTE_STARTED:
            return {
                ...state,
                voteStarted: true
            };
        case GET_VOTE_SUCCESS:
            return {
                ...state,
                vote: action.payload,
                voteStarted: false
            };
        case GET_VOTE_FAILURE:
            return {
                ...state,
                voteErr: action.payload,
                voteStarted: false
            };
        case SET_VOTE_STARTED:
            return {
                ...state,
                setVoteStarted: true
            };
        case SET_VOTE_SUCCESS:
            return {
                ...state,
                setVote: action.payload,
                setVoteStarted: false
            };
        case SET_VOTE_FAILURE:
            return {
                ...state,
                setVoteErr: action.payload,
                setVoteStarted: false
            };
        case BASE_REG_STARTED:
            return {
                ...state,
                baseRegStarted: true
            };
        case BASE_REG_SUCCESS:
            return {
                ...state,
                baseReg: action.payload,
                baseRegStarted: false
            };
        case BASE_REG_FAILURE:
            return {
                ...state,
                baseRegErr: action.payload,
                baseRegStarted: false
            };
        case BASE_LOG_STARTED:
            return {
                ...state,
                baseLogStarted: true
            };
        case BASE_LOG_SUCCESS:
            return {
                ...state,
                baseLog: action.payload,
                baseLogStarted: false
            };
        case BASE_LOG_FAILURE:
            return {
                ...state,
                baseLogErr: action.payload,
                baseLogStarted: false
            };
        case GET_USER_DATA_STARTED:
            return {
                ...state,
                userDataStarted: true
            };
        case GET_USER_DATA_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                userDataStarted: false
            };
        case GET_USER_DATA_FAILURE:
            return {
                ...state,
                userDataErr: action.payload,
                userDataStarted: false
            };
        case SET_MAGIC_TOKEN:
            return {
                ...state,
                magicToken: action.payload
            };
        case SET_MAGIC_NAME:
            return {
                ...state,
                magicName: action.payload
            };
        case GET_CABINET_LINK_STARTED:
            return {
                ...state,
                cabinetLinkStarted: true
            };
        case GET_CABINET_LINK_SUCCESS:
            return {
                ...state,
                cabinetLink: action.payload,
                cabinetLinkStarted: false
            };
        case GET_CABINET_LINK_FAILURE:
            return {
                ...state,
                cabinetLinkErr: action.payload,
                cabinetLinkStarted: false
            };
        case SET_AD_STARTED:
            return {
                ...state,
                adStarted: true
            };
        case SET_AD_SUCCESS:
            return {
                ...state,
                ad: action.payload,
                adStarted: false
            };
        case SET_AD_FAILURE:
            return {
                ...state,
                adErr: action.payload,
                adStarted: false
            };
        case GET_VOTE_RESULT_STARTED:
            return {
                ...state,
                voteResultStarted: true
            };
        case GET_VOTE_RESULT_SUCCESS:
            return {
                ...state,
                voteResult: action.payload,
                voteResultStarted: false
            };
        case GET_VOTE_RESULT_FAILURE:
            return {
                ...state,
                voteResultErr: action.payload,
                voteResultStarted: false
            };
        case SET_VOTE_RESULT_ALL:
            return {
                ...state,
                voteResultAll: action.payload
            };
        default:
            return state;
    }
}

