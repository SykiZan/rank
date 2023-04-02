import React, { useState } from "react";
import Styles from "./styles.module.scss";
import Rate from "../_UI/rate";
import { useSelector } from "react-redux";
import translite from "../../helpers/urlConverter";
import { useLocation, useNavigate } from "react-router-dom";
// import Like from "../_UI/like";
import Date from "../_UI/date";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";

const TabNews = (props) => {
  const { withBg } = props;
  const { t } = useTranslation();
  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);
  const mostPopularNews = useSelector((store) => store.main.mostPopularNews);
  const mostViewedNews = useSelector((store) => store.main.mostViewedNews);
  const navigate = useNavigate();

  const location = useLocation();

  const [currentTab, setCurrentTab] = useState(1);

  const postLinkHandler = (title, id) => {
    const correctUrl = translite(title, id);
    navigate(`/${correctUrl}`);
  };

  return (
    <section
      className={`${Styles.container} ${themeModeStatus ? Styles.dark : null} ${
        location.pathname.includes("posts/category/rank/")
          ? Styles.containerRank
          : ""
      }`}
    >
      <div className={`${Styles.contentWrap} ${withBg ? Styles.withBg : null}`}>
        <div className={`${Styles.navigationRow}`}>
          <div
            className={`${Styles.navigationItem} ${
              currentTab === 1 ? Styles.navigationItemActive : null
            }`}
            onClick={() => {
              setCurrentTab(1);
            }}
          >
            {t("Most Viewed")}
          </div>
          <div
            className={`${Styles.navigationItem} ${
              currentTab === 2 ? Styles.navigationItemActive : null
            }`}
            onClick={() => {
              setCurrentTab(2);
            }}
          >
            {t("Popular News")}
          </div>
        </div>
        {mostViewedNews && mostPopularNews ? (
          <div className={`${Styles.contentBox}`}>
            {currentTab === 1 ? (
              <div className={`${Styles.firstContentBox}`}>
                {mostViewedNews.map((item, index) => {
                  return (
                    <div
                      className={`${Styles.firstContentBoxItem}`}
                      key={"first" + index}
                      onClick={() => {
                        postLinkHandler(item.title, item.id);
                      }}
                    >
                      <div className={`${Styles.itemNum}`}>0{index + 1}</div>
                      <div className={`${Styles.title}`}>{item.title}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={`${Styles.secondContentBox}`}>
                {mostPopularNews.map((item, index) => {
                  if (index <= 2) {
                    return (
                      <div
                        className={`${Styles.secondContentBoxItem}`}
                        key={"second" + index}
                        onClick={() => {
                          postLinkHandler(item.title, item.id);
                        }}
                      >
                        <div className={`${Styles.title}`}>{item.title}</div>
                        <div className={`${Styles.statWrap}`}>
                          <div className={`${Styles.date}`}>
                            <Icon
                              icon="bi-clock"
                              className={`${Styles.icon}`}
                            />
                            <Date data={item.date} />
                          </div>
                          <div className={`${Styles.like}`}>
                            <Icon
                              icon="bi-hand-thumbs-up"
                              className={`${Styles.icon}`}
                            />
                            {item.likes_count}
                            {/*<Like data={item.likes_count}/>*/}
                          </div>
                        </div>
                        {/* <Rate rate={item.rate} color="#fae612" /> */}
                      </div>
                    );
                  } else return null;
                })}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default TabNews;
