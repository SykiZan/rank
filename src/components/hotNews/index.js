import React from "react";
import Styles from './styles.module.scss'
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const HotNews = () => {
    const navigate = useNavigate();
    const navigationCategories = useSelector(store => store.main.navigationCategories);
    const themeModeStatus = useSelector(store => store.main.themeModeStatus);
    const { t } = useTranslation();

    const categoryHandler = (id) =>{
        navigate(`/posts/category/${id}/page/1`);
    }

    return (
        <section className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}>
            <div className={`${Styles.contentWrap}`}>
                <div className={`${Styles.mainTitle}`}><span>{t('Hot')}</span> {t('Categories')}</div>
                <div className={`${Styles.contentBox}`}>
                    {navigationCategories ? navigationCategories.map((item, index)=>{
                        return (
                            <div
                                className={`${Styles.contentBoxItem}`}
                                key={'hotNews' + index}
                                onClick={()=>{categoryHandler(item.id)}}
                            >
                                <div className={`${Styles.name}`}>{item.name}</div>
                                <div className={`${Styles.value}`}>{item.posts_amount}</div>
                            </div>
                        )
                    }) : null}
                </div>
            </div>
        </section>
    );
};

export default HotNews;