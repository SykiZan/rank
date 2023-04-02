import React, { useEffect, useState } from "react";
import Styles from "./styles.module.scss";
import ContentPreloader from "../contentPreloader";
import { useSelector } from "react-redux";
import translite from "../../helpers/urlConverter";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Marquee from "../_UI/marquee";

import previewImg from "../../theme/assets/svg/news_preview.svg";
import { isSafari } from "react-device-detect";
import useScreenWidth from "../../hooks/use-screenWidth";

const MainNews = (props) => {
  const { trandingStatus } = props;
  const navigate = useNavigate();
  const preloaderStatus = false;
  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);
  const previewMainNews = useSelector((store) => store.main.previewMainNews);
  const mostPopularNews = useSelector((store) => store.main.mostPopularNews);

  const [newsData, setNewsData] = useState(null);
  // const [preloaderStatus, setPreloaderStatus] = useState(true);

  const paginateCategoriesNews = useSelector(
    (store) => store.main.paginateCategoriesNews
  );

  const location = useLocation();

  const screenWidth = useScreenWidth();

  useEffect(() => {
    if (location.pathname.includes("posts/page"))
      setNewsData(paginateCategoriesNews.data);
    else setNewsData(previewMainNews);
  }, [previewMainNews, paginateCategoriesNews]);

  const postLinkHandler = (title, id) => {
    const correctUrl = translite(title, id);
    navigate(`/${correctUrl}`);
  };

  const startIdoHandler = (date) => {
    const date1 = new Date();
    const date2 = new Date(date);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = diffInTime / oneDay;

    if (diffInDays <= 0 && diffInDays > -1) {
      return (
        <div className={`${Styles.trendingNewsOtherRowItemStart}`}>
          Стратует сегодня
        </div>
      );
    } else if (diffInDays > 0) {
      return (
        <div className={`${Styles.trendingNewsOtherRowItemStart}`}>
          До старта:{" "}
          <span className={`${Styles.circle}`}>{Math.ceil(diffInDays)} д.</span>
        </div>
      );
    } else {
      return (
        <div className={`${Styles.trendingNewsOtherRowItemStart}`}>
          Стартовал: <span className={`${Styles.circle}`}>{date}</span>
        </div>
      );
    }
  };

  const getHeight = () => {
    if (!newsData && screenWidth >= 1880) return "46rem";
    if (!newsData && screenWidth >= 1760) return "42.5rem";
    if (!newsData && screenWidth >= 1610) return "38.3rem";
    if (!newsData && screenWidth >= 1280) return "34.4rem";
    if (!newsData && screenWidth >= 1180) return "31.6rem";
    if (!newsData && screenWidth >= 1030) return "27.4rem";
    return "";
  };

  return (
    <section
      className={`
                ${Styles.container} 
                ${themeModeStatus ? Styles.dark : null} 
                ${!trandingStatus ? Styles.withoutTranding : null}
                ${isSafari ? Styles.safari : null}
            `}
    >
      <div
        className={`${Styles.contentWrap}`}
        // style={{ height: `${preloaderStatus ? "40rem" : "auto"}` }}
      >
        {/* {preloaderStatus ? (
          <ContentPreloader type="main" />
        ) : ( */}
        <>
          {trandingStatus ? (
            <Marquee mostPopularNews={mostPopularNews} />
          ) : null}
          {
            // newsData &&
            <div
              className={`${Styles.trendingNewsBox}`}
              style={{
                // height: `${newsData && screenWidth >= 1030 ? "auto" : ""}`,
                height: getHeight(),
              }}
              // style={{ height: `${newsData ? "auto" : "35rem"}` }}
            >
              <div className={`${Styles.trendingNewsMainRow}`}>
                <div
                  className={`${Styles.trendingNewsMainRowItem}`}
                  onClick={() => {
                    postLinkHandler(newsData[0]?.title, newsData[0]?.id);
                  }}
                >
                  <div className={`${Styles.trendingNewsMainRowItemImgWrap}`}>
                    <img
                      src={
                        newsData && newsData[0]?.picture
                          ? newsData[0]?.picture
                          : previewImg
                      }
                      alt="slide1"
                    />
                  </div>
                  <div className={`${Styles.trendingNewsMainRowItemContent}`}>
                    <div
                      className={`${Styles.trendingNewsMainRowItemTheme}`}
                      style={{
                        background: `${
                          newsData && newsData[0]?.category?.color
                        }`,
                      }}
                    >
                      {newsData && newsData[0]?.category?.name}
                    </div>
                    <div className={`${Styles.trendingNewsMainRowItemTitle}`}>
                      {newsData && newsData[0]?.title}
                    </div>
                    {newsData && newsData[0]?.category?.name === "IDO" ? (
                      <>
                        <div
                          className={`${Styles.trendingNewsMainRowItemStart}`}
                        >
                          {newsData && newsData[0]?.date_ico
                            ? startIdoHandler(newsData[0]?.date_ico)
                            : null}
                        </div>
                        <div
                          className={`${Styles.trendingNewsMainRowItemRankScore}`}
                        >
                          Magiс Rank Score:{" "}
                          <span className={`${Styles.circle}`}>
                            {newsData[0]?.rank_score}
                          </span>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className={`${Styles.trendingNewsOtherRow}`}>
                <div
                  className={`${Styles.trendingNewsOtherRowItem} ${Styles.trendingNewsOtherRowItemFirst}`}
                  onClick={() => {
                    postLinkHandler(newsData[1]?.title, newsData[1]?.id);
                  }}
                >
                  <div className={`${Styles.trendingNewsOtherRowItemImgWrap}`}>
                    <img
                      src={
                        newsData && newsData[1]?.picture
                          ? newsData[1]?.picture
                          : previewImg
                      }
                      alt="slide4"
                    />
                  </div>
                  <div className={`${Styles.trendingNewsOtherRowItemContent}`}>
                    <div
                      className={`${Styles.trendingNewsOtherRowItemTheme}`}
                      style={{
                        background: `${
                          newsData && newsData[1]?.category?.color
                        }`,
                      }}
                    >
                      {newsData && newsData[1]?.category?.name}
                    </div>
                    <div className={`${Styles.trendingNewsOtherRowItemTitle}`}>
                      {newsData && newsData[1]?.title}
                    </div>
                    {newsData && newsData[1]?.category?.name === "IDO" ? (
                      <>
                        <div
                          className={`${Styles.trendingNewsOtherRowItemStart}`}
                        >
                          {newsData && newsData[1]?.date_ico
                            ? startIdoHandler(newsData && newsData[1]?.date_ico)
                            : null}
                        </div>
                        <div
                          className={`${Styles.trendingNewsOtherRowItemRankScore}`}
                        >
                          Magiс Rank Score:{" "}
                          <span className={`${Styles.circle}`}>
                            {newsData && newsData[1]?.rank_score}
                          </span>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
                <div
                  className={`${Styles.trendingNewsOtherRowItem}`}
                  onClick={() => {
                    postLinkHandler(
                      newsData && newsData[2]?.title,
                      newsData && newsData[2]?.id
                    );
                  }}
                >
                  <div className={`${Styles.trendingNewsOtherRowItemImgWrap}`}>
                    <img
                      src={
                        newsData && newsData[2]?.picture
                          ? newsData && newsData[2]?.picture
                          : previewImg
                      }
                      alt="slide2"
                    />
                  </div>
                  <div className={`${Styles.trendingNewsOtherRowItemContent}`}>
                    <div
                      className={`${Styles.trendingNewsOtherRowItemTheme}`}
                      style={{
                        background: `${
                          newsData && newsData[2]?.category?.color
                        }`,
                      }}
                    >
                      {newsData && newsData[2]?.category?.name}
                    </div>
                    <div className={`${Styles.trendingNewsOtherRowItemTitle}`}>
                      {newsData && newsData[2]?.title}
                    </div>
                    {newsData && newsData[2]?.category?.name === "IDO" ? (
                      <>
                        <div
                          className={`${Styles.trendingNewsOtherRowItemStart}`}
                        >
                          {newsData && newsData[2]?.date_ico
                            ? startIdoHandler(newsData && newsData[2]?.date_ico)
                            : null}
                        </div>
                        <div
                          className={`${Styles.trendingNewsOtherRowItemRankScore}`}
                        >
                          Magiс Rank Score:{" "}
                          <span className={`${Styles.circle}`}>
                            {newsData && newsData[2]?.rank_score}
                          </span>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
                <div
                  className={`${Styles.trendingNewsOtherRowItem}`}
                  onClick={() => {
                    postLinkHandler(
                      newsData && newsData[3]?.title,
                      newsData && newsData[3]?.id
                    );
                  }}
                >
                  <div className={`${Styles.trendingNewsOtherRowItemImgWrap}`}>
                    <img
                      src={
                        newsData && newsData[3]?.picture
                          ? newsData && newsData[3]?.picture
                          : previewImg
                      }
                      alt="slide3"
                    />
                  </div>
                  <div className={`${Styles.trendingNewsOtherRowItemContent}`}>
                    <div
                      className={`${Styles.trendingNewsOtherRowItemTheme}`}
                      style={{
                        background: `${
                          newsData && newsData[3]?.category?.color
                        }`,
                      }}
                    >
                      {newsData && newsData[3]?.category?.name}
                    </div>
                    <div className={`${Styles.trendingNewsOtherRowItemTitle}`}>
                      {newsData && newsData[3]?.title}
                    </div>
                    {newsData && newsData[3]?.category?.name === "IDO" ? (
                      <>
                        <div
                          className={`${Styles.trendingNewsOtherRowItemStart}`}
                        >
                          {newsData && newsData[3]?.date_ico
                            ? startIdoHandler(newsData && newsData[3]?.date_ico)
                            : null}
                        </div>
                        <div
                          className={`${Styles.trendingNewsOtherRowItemRankScore}`}
                        >
                          Magiс Rank Score:{" "}
                          <span className={`${Styles.circle}`}>
                            {newsData && newsData[3]?.rank_score}
                          </span>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
                <div
                  className={`${Styles.trendingNewsOtherRowItem}`}
                  onClick={() => {
                    postLinkHandler(
                      newsData && newsData[4]?.title,
                      newsData && newsData[4]?.id
                    );
                  }}
                >
                  <div className={`${Styles.trendingNewsOtherRowItemImgWrap}`}>
                    <img
                      src={
                        newsData && newsData[4]?.picture
                          ? newsData && newsData[4]?.picture
                          : previewImg
                      }
                      alt="slide3"
                    />
                  </div>
                  <div className={`${Styles.trendingNewsOtherRowItemContent}`}>
                    <div
                      className={`${Styles.trendingNewsOtherRowItemTheme}`}
                      style={{
                        background: `${
                          newsData && newsData[4]?.category?.color
                        }`,
                      }}
                    >
                      {newsData && newsData[4]?.category?.name}
                    </div>
                    <div className={`${Styles.trendingNewsOtherRowItemTitle}`}>
                      {newsData && newsData[4]?.title}
                    </div>
                    {newsData && newsData[4]?.category?.name === "IDO" ? (
                      <>
                        <div
                          className={`${Styles.trendingNewsOtherRowItemStart}`}
                        >
                          {newsData && newsData[4]?.date_ico
                            ? startIdoHandler(newsData && newsData[4]?.date_ico)
                            : null}
                        </div>
                        <div
                          className={`${Styles.trendingNewsOtherRowItemRankScore}`}
                        >
                          Magiс Rank Score:{" "}
                          <span className={`${Styles.circle}`}>
                            {newsData && newsData[4]?.rank_score}
                          </span>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          }
        </>
        {/* )} */}
      </div>
    </section>
  );
};

export default MainNews;
