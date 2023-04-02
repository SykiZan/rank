import React, {useEffect} from "react";
import Styles from './styles.module.scss'
import Subscribers from "../../components/subscribers";
import {getMostPopularNews, getMostViewedNews, getSubscribers, getUserData} from "../../store/main/action";
import {useDispatch, useSelector} from "react-redux";
import TabNews from "../../components/tabNews";
// import bannerImg2 from "../../theme/assets/other/img12.jpg";
// import Banner from "../../components/_UI/banner";
import {useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
import Breadcrumbs from "../../components/breadcrumbs";
import Company from "../../components/company";

const CompanyPage = () => {
    let {title} = useParams();

    const dispatch = useDispatch();
    const themeModeStatus = useSelector(store => store.main.themeModeStatus);
    const currentLng = useSelector(store => store.main.lang);
    const magicToken = localStorage.getItem('magicToken');

    useEffect(()=>{
        if (magicToken){
            dispatch(getUserData());
        }
    }, [dispatch, magicToken])

    useEffect(()=>{
        dispatch(getSubscribers());
        dispatch(getMostPopularNews(5, currentLng));
        dispatch(getMostViewedNews(5, currentLng));
        document.getElementById('root').scrollTo(0, 0);
    },[currentLng, dispatch, title])

    return (
        <section className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}>
            <Helmet>
                <title>MAGIC RANK ▶ Contacts from our team</title>
                <meta
                    name="description"
                    content="Find the latest cryptocurrency news, updates, values, prices, and more | Cryptocurrency, Bitcoin, Ethereum, Lightcoin, Ripple | News with analysis, video and live price updates"
                />
            </Helmet>
            <Breadcrumbs page='company'/>
            <div>
                <Company/>
            </div>
            <div className={`${Styles.shortColumn}`}>
                <div className={`${Styles.stickyWrap}`}>
                    {/*<Banner img={bannerImg2} pos='right' max={true} withBg={true}/>*/}
                    <Subscribers withBg={true}/>
                    <TabNews withBg={true}/>
                </div>
            </div>
        </section>
    );
};

export default CompanyPage;