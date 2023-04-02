import React, { useEffect, useState } from "react";
import Styles from "./styles.module.scss";

import FilterNews from "../../components/filterNews";
// import Banner from "../../components/_UI/banner";
// import bannerImg2 from "../../theme/assets/other/img12.jpg";
import Subscribers from "../../components/subscribers";
import TabNews from "../../components/tabNews";
import { useDispatch, useSelector } from "react-redux";
import {
  getMostPopularNews,
  getMostViewedNews,
  getPaginateCategoriesNews,
  getPreviewMainNews,
  getSubscribers,
  getUserData,
} from "../../store/main/action";
import MainNews from "../../components/mainNews";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Breadcrumbs from "../../components/breadcrumbs";
import RankTable from "../../components/rankTable/RankTable";
import { useTranslation } from "react-i18next";

const CategoriesPage = (props) => {
  let { type, id, page } = useParams();

  const location = useLocation();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);
  const currentLng = useSelector((store) => store.main.lang);
  const magicToken = localStorage.getItem("magicToken");

  const [isIdoPage, setIsIdoPage] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("/ido")) setIsIdoPage(true);
    else setIsIdoPage(false);
  }, [location.pathname]);

  useEffect(() => {
    if (magicToken) {
      dispatch(getUserData());
    }
  }, [dispatch, magicToken]);

  useEffect(() => {
    document.getElementById("root").scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    dispatch(getPreviewMainNews(currentLng));
    dispatch(getSubscribers());
    dispatch(getMostPopularNews(5, currentLng));
    dispatch(getMostViewedNews(5, currentLng));
  }, [currentLng, dispatch]);

  useEffect(() => {
    dispatch(getPaginateCategoriesNews(type, id, page, currentLng));
  }, [currentLng, dispatch, id, page, type]);

  return (
    <section
      className={`${Styles.container} ${themeModeStatus ? Styles.dark : null} ${
        location.pathname.includes("/ratings") ? Styles.containerRank : ""
      } `}
      style={{
        paddingTop: `${props.page === "ido" ? "2rem" : ""}`,
      }}
    >
      {!(props.page !== "ido" || props.page !== "ratings") && (
        <Helmet>
          <title>MAGIC RANK ▶ Latest Crypto News: Bitcoin, Ethereum, ICO</title>
          <meta
            name="description"
            content="Find the latest cryptocurrency news, updates, values, prices, and more | Cryptocurrency, Bitcoin, Ethereum, Lightcoin, Ripple | News with analysis, video and live price updates"
          />
        </Helmet>
      )}
      {props.page === "ratings" ? (
        <Breadcrumbs page="ratings" />
      ) : (
        <Breadcrumbs />
      )}

      {props.page !== "ido" &&
        props.page !== "ratings" &&
        !location.pathname.includes("/posts/category") && (
          <MainNews trandingStatus={false} />
        )}

      {location.pathname.includes("/ratings") && (
        <div className={Styles.innerWrap}>
          <div
            className={`${Styles.longColumn}`}
            style={{
              width: `${
                location.pathname.includes("/ratings") ? "fit-content" : ""
              }`,
            }}
          >
            {!location.pathname.includes("/ratings") && <FilterNews />}
            {location.pathname.includes("/ratings") && <RankTable />}
          </div>
          <div className={`${Styles.shortColumn}`}>
            <div className={`${Styles.stickyWrap}`}>
              {/*<Banner img={bannerImg2} pos='right' max={true} withBg={true}/>*/}
              <Subscribers withBg={true} />
              <TabNews withBg={true} />
            </div>
          </div>
        </div>
      )}
      {!location.pathname.includes("/ratings") && (
        <>
          <div
            className={`${Styles.longColumn}`}
            style={{
              width: `${
                location.pathname.includes("/ratings") ? "fit-content" : ""
              }`,
            }}
          >
            {!location.pathname.includes("/ratings") && <FilterNews />}
            {location.pathname.includes("/ratings") && <RankTable />}
          </div>
          <div className={`${Styles.shortColumn}`}>
            <div className={`${Styles.stickyWrap}`}>
              {/*<Banner img={bannerImg2} pos='right' max={true} withBg={true}/>*/}
              <Subscribers withBg={true} />
              <TabNews withBg={true} />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CategoriesPage;
