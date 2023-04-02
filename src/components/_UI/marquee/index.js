import React, {useState} from "react";
import Styles from './styles.module.scss'
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Slider from "react-slick";
import translite from "../../../helpers/urlConverter";
import {useTranslation} from "react-i18next";

const Marquee = (props) => {
    const {mostPopularNews} = props;
    const navigate = useNavigate();
    const { t } = useTranslation();
    const themeModeStatus = useSelector(store => store.main.themeModeStatus);

    const [currentItem, setCurrentItem] = useState(0);

    const postLinkHandler = (title, id) =>{
        const correctUrl = translite(title, id);
        navigate(`/${correctUrl}`);
    }

    const settings = {
        dots: false,
        arrows: false,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        beforeChange: (oldI, newI)=>{setCurrentItem(newI)}
    };


    return (
        <section className={`${Styles.container}  ${themeModeStatus ? Styles.dark : null}`}>
            <div className={`${Styles.contentWrap}`}>
                <div className={`${Styles.trendingRow}`}>
                    <div className={`${Styles.trendingArrow}`}>
                        {t('Trending now')}
                    </div>
                    <Slider {...settings}>
                        {mostPopularNews ? mostPopularNews.map((item, index)=>{
                            return (
                                <div
                                    className={`${Styles.trendingContentItem}`}
                                    key={'most popular' + index}
                                    onClick={()=>{postLinkHandler(mostPopularNews[currentItem].title, mostPopularNews[currentItem].id)}}

                                >
                                    <span className='text'>{item.title}</span>
                                </div>
                            )
                        }) : null}
                    </Slider>
                    <div className={`${Styles.trendingContentWrap}`}>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Marquee;