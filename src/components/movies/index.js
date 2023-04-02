import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import Styles from './styles.module.scss'
import {setCurrentMovie} from "../../store/main/action";
import {useTranslation} from "react-i18next";

const Movies = () => {
    const moviesList =  useSelector(store => store.main.moviesList);
    const currentMovie =  useSelector(store => store.main.currentMovie);
    const themeModeStatus = useSelector(store => store.main.themeModeStatus);

    const dispatch = useDispatch();
    const { t } = useTranslation();

    // useEffect(()=>{
    //     if (moviesList){
    //         setCurrentMovie({
    //             id: moviesList.items[0].id,
    //             link: moviesList.items[0].snippet.resourceId.videoId
    //         })
    //     }
    // }, [moviesList])


    return (
        <section className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}>
            <div className={`${Styles.contentWrap}`}>
                <div className={`${Styles.mainTitle}`}>{t('Movies')} Magic DAO</div>
                <div className={`${Styles.moviesWrap}`}>
                    <div className={`${Styles.moviesBox}`}>
                        {currentMovie ?
                            <iframe
                                className={`${Styles.movies}`}
                                src={`https://www.youtube.com/embed/${currentMovie.link}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                            : null}
                    </div>
                </div>
                <div className={`${Styles.moviesListWrap}`}>
                    <div className={`${Styles.moviesListTitleBox}`}>
                        <div className={`${Styles.mainListTitle}`}>{t('Analytics')}, </div>
                        <div className={`${Styles.otherListTitle}`}>{t('reviews and news')}</div>
                    </div>
                    <div className={`${Styles.moviesListBox}`}>
                        {moviesList?.items?.map((item, index)=>{
                            return (
                                <div
                                    className={`${Styles.moviesListBoxItem} ${currentMovie.id === item.id ? Styles.moviesListBoxItemActive : null}`}
                                    key={'movies' + index}
                                    onClick={()=>{dispatch(setCurrentMovie({id: item.id, link: item.snippet.resourceId.videoId}))}}
                                >
                                    <div className={`${Styles.imgWrap}`}>
                                        <img src={item?.snippet?.thumbnails?.medium?.url} alt="preview"/>
                                    </div>
                                    <div className={`${Styles.noteWrap}`}>
                                        <div className={`${Styles.noteTitle}`}>{item.snippet.title}</div>
                                        <div className={`${Styles.noteAuthor}`}>{item.snippet.channelTitle}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Movies;