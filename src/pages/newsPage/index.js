import React, {useEffect} from "react";
import Styles from './styles.module.scss'
import FullNews from "../../components/fullNews";
import Subscribers from "../../components/subscribers";
import {getMostPopularNews, getMostViewedNews, getSubscribers, getUserData} from "../../store/main/action";
import {useDispatch, useSelector} from "react-redux";
import TabNews from "../../components/tabNews";
// import bannerImg2 from "../../theme/assets/other/img12.jpg";
// import Banner from "../../components/_UI/banner";
import RelatedNews from "../../components/relatedNews";
import CommentsForm from "../../components/commentsForm";
import Comments from "../../components/comments";
import {clearComments, getComments, getPost, getPostFailure, getRelatedNews} from "../../store/post/action";
import {useNavigate, useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
import Breadcrumbs from "../../components/breadcrumbs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NewsPage = () => {
    let {title} = useParams();
    const post = useSelector(store => store.post.post);
    const postErr = useSelector(store => store.post.postErr);
    const currentLng = useSelector(store => store.main.lang);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const themeModeStatus = useSelector(store => store.main.themeModeStatus);
    const magicToken = localStorage.getItem('magicToken');

    const toastHandler = (msg) =>{
        toast(msg)
    }

    useEffect(()=>{
        if (magicToken){
            dispatch(getUserData());
        }
    }, [dispatch, magicToken])

    useEffect(()=>{
        dispatch(clearComments())
        dispatch(getSubscribers());
        dispatch(getComments(title.slice(title.lastIndexOf('n') + 1, title.length)))
        dispatch(getPost(title.slice(title.lastIndexOf('n') + 1, title.length)))
        dispatch(getMostPopularNews(5, currentLng));
        dispatch(getMostViewedNews(5, currentLng));
        dispatch(getRelatedNews(title.slice(title.lastIndexOf('n') + 1, title.length), currentLng));
        document.getElementById('root').scrollTo(0, 0);
    },[dispatch, title, currentLng])
    
    useEffect(()=>{
        if (postErr){
            navigate('/');
            dispatch(getPostFailure(false))
        }
    },[dispatch, navigate, postErr])

    return (
        <section className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}>
            <Helmet>
                <title>{post?.title ? 'MAGIC RANK ▶ ' + post.title : 'MAGIC RANK ▶ Latest Crypto News: Bitcoin, Ethereum, ICO'}</title>
                <meta
                    name="description"
                    content="Find the latest cryptocurrency news, updates, values, prices, and more | Cryptocurrency, Bitcoin, Ethereum, Lightcoin, Ripple | News with analysis, video and live price updates"
                />
            </Helmet>
            <ToastContainer/>
            <Breadcrumbs page='news'/>
            <div>
                <FullNews post={post}/>
                <RelatedNews post={post}/>
                <Comments toastHandler={toastHandler}/>
                <CommentsForm toastHandler={toastHandler}/>
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

export default NewsPage;