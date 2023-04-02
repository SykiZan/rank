import React, { useEffect } from "react";
import Styles from "./styles.module.scss";
import MainNews from "../../components/mainNews";
import CategoriesNews from "../../components/categoriesNews";
import { Helmet } from "react-helmet";
// import bannerImg from '../../theme/assets/other/baner.jpg';
// import bannerImg2 from '../../theme/assets/other/img12.jpg';
import ShortNews from "../../components/shortNews";
// import Weather from "../../components/weather";
import TabNews from "../../components/tabNews";
// import Banner from "../../components/_UI/banner";
import Movies from "../../components/movies";
import Subscribers from "../../components/subscribers";
import TextNews from "../../components/textNews";
import LastNews from "../../components/lastNews";
import HotNews from "../../components/hotNews";
import Calendar from "../../components/calendar";
import CheckForm from "../../components/checkForm";
// import Tags from "../../components/tags";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getCategoriesNews,
  getCrypto,
  getMostPopularNews,
  getMostViewedNews,
  getMovies,
  getNavigationCategories,
  getPosts,
  getPreviewMainNews,
  getShortNews,
  getSubscribers,
  getTags,
  getUserData,
  getVote,
  getVoteResult,
} from "../../store/main/action";
import CryptoWidget from "../../components/cryptoVidget";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainPage = () => {
  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);
  const mainCategory = useSelector((store) => store.main.mainCategory);
  const currentLng = useSelector((store) => store.main.lang);
  const dispatch = useDispatch();
  const magicToken = localStorage.getItem("magicToken");

  const toastHandler = (msg) => {
    toast(msg);
  };

  useEffect(() => {
    document.getElementById("root").scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (magicToken) {
      dispatch(getUserData());
    }
  }, [dispatch, magicToken]);

  useEffect(() => {
    dispatch(getPreviewMainNews(currentLng));
    dispatch(getSubscribers());
    dispatch(getTags(currentLng));
    dispatch(getCategories(currentLng));
    dispatch(getPosts(currentLng));
    dispatch(getNavigationCategories(1, currentLng));
    dispatch(getMostPopularNews(5, currentLng));
    dispatch(getMostViewedNews(5, currentLng));
    dispatch(getMovies(currentLng));
    dispatch(getShortNews(currentLng));
    dispatch(getCrypto());
    dispatch(getVote());
    dispatch(getVoteResult());
    // dispatch(getCategoriesNews(false, 19))
  }, [currentLng, dispatch]);

  useEffect(() => {
    dispatch(getCategoriesNews(mainCategory?.id, 19, currentLng));
  }, [currentLng, dispatch, mainCategory]);

  return (
    <section
      className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}
    >
      <Helmet>
        <title>MAGIC RANK ▶ Latest Crypto News: Bitcoin, Ethereum, ICO</title>
        <meta
          name="description"
          content="Find the latest cryptocurrency news, updates, values, prices, and more | Cryptocurrency, Bitcoin, Ethereum, Lightcoin, Ripple | News with analysis, video and live price updates"
        />
      </Helmet>
      <ToastContainer />
      <MainNews trandingStatus={true} />
      <div className={`${Styles.stickyWrap}`}>
        <div className={`${Styles.topLongColumn}`}>
          <CategoriesNews
            type="box"
            content={{ start: 0, end: 4 }}
            isBanner={true}
          />
          {/*<Banner img={bannerImg} pos='left'/>*/}
          <CategoriesNews type="row" content={{ start: 5, end: 9 }} />
        </div>
        <div className={`${Styles.topShortColumn}`}>
          <CryptoWidget />
          <ShortNews />
          <TabNews withBg={true} />
        </div>
      </div>
      <Movies />
      <div className={`${Styles.bottomLongColumn}`}>
        <TextNews content={{ start: 10, end: 13 }} />
        {/*<Banner img={bannerImg} pos='left' />*/}
        <LastNews content={{ start: 14, end: 19 }} />
      </div>
      <div className={`${Styles.bottomShortColumn}`}>
        <Subscribers />
        <HotNews />
        {/*<Banner img={bannerImg2} pos='right' max={true}/>*/}
        <Calendar />
        <CheckForm toastHandler={toastHandler} />
        {/*<Tags/>*/}
      </div>
    </section>
  );
};

export default MainPage;
