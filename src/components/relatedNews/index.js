import React from "react";
import Styles from './styles.module.scss'
import {Icon} from "@iconify/react";
import {useSelector} from "react-redux";
import translite from "../../helpers/urlConverter";
import {useNavigate} from "react-router-dom";
import Date from "../_UI/date";
// import Like from "../_UI/like";
import {useTranslation} from "react-i18next";

const RelatedNews = (props) => {
    const {post} = props;
    const navigate = useNavigate();
    const { t } = useTranslation();
    const themeModeStatus = useSelector(store => store.main.themeModeStatus);
    const relatedNews = useSelector(store => store.post.relatedNews);

    const postLinkHandler = (title, id) =>{
        const correctUrl = translite(title, id);
        navigate(`/${correctUrl}`);
    }

    const moreBtnHandler = (id) =>{
        if (id){
            navigate(`/posts/category/${id}/page/1`);
        } else {
            navigate(`/posts/page/1`);
        }
    }

    return (
        <section className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}>
            <div className={`${Styles.contentWrap}`}>
                <div className={`${Styles.navigationRow}`}>
                    <div className={`${Styles.mainTitle}`}><span>{t('Related')}</span> {t('News')}</div>
                    {/*<div className={`${Styles.arrowWrap}`}>*/}
                    {/*    <div className={`${Styles.arrowItem}`}>*/}
                    {/*        <Icon icon='bi-caret-left' className={`${Styles.icon}`}/>*/}
                    {/*    </div>*/}
                    {/*    <div className={`${Styles.arrowItem}`}>*/}
                    {/*        <Icon icon='bi-caret-right' className={`${Styles.icon}`}/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <div className={`${Styles.contentBox}`}>
                    {relatedNews ? relatedNews.map((item, index)=>{
                        return (
                            <div
                                className={`${Styles.contentBoxItem}`}
                                key={'latestNews' + index}
                                onClick={()=>{postLinkHandler(item.title, item.id)}}
                            >
                                <div className={`${Styles.imgWrap}`}>
                                    <img src={item.picture} alt={item.title}/>
                                </div>
                                <div className={`${Styles.contentBoxItemNote}`}>
                                    <div className={`${Styles.title}`}>{item.title}</div>
                                    <div className={`${Styles.statWrap}`}>
                                        <div className={`${Styles.date}`}>
                                            <div className={`${Styles.iconWrap}`}>
                                                <Icon icon='bi-clock' className={`${Styles.icon}`}/>
                                            </div>
                                            <div className={`${Styles.dateContent}`}>
                                                <Date data={item.date}/>
                                            </div>
                                        </div>
                                        <div className={`${Styles.likes}`}>
                                            <div className={`${Styles.iconWrap}`}>
                                                <Icon icon='bi-hand-thumbs-up' className={`${Styles.icon}`}/>
                                            </div>
                                            <div className={`${Styles.likesContent}`}>
                                                {item.likes_count}
                                                {/*<Like data={item.likes_count}/>*/}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${Styles.description}`}>{item.description}</div>
                                </div>
                            </div>
                        )
                    }) : null}
                </div>
                <div className={`${Styles.moreBtn}`}>
                    <span onClick={()=>{moreBtnHandler(post.category.id)}}>{t('More popular posts')}</span>
                    {/*<div className={`${Styles.socials}`}>*/}
                    {/*    <Icon icon='bi-share-fill' className={`${Styles.icon}`}/>*/}
                    {/*    <Icon icon='bi-heart-fill' className={`${Styles.icon}`}/>*/}
                    {/*    <Icon icon='bi-twitter' className={`${Styles.icon}`}/>*/}
                    {/*</div>*/}
                </div>
            </div>
        </section>
    );
};

export default RelatedNews;