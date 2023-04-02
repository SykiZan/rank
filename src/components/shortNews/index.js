import React from "react";
import Styles from "./styles.module.scss";
import { Icon } from "@iconify/react";
import Rate from "../_UI/rate";
import { useSelector } from "react-redux";
// import Like from "../_UI/like";
import Date from "../_UI/date";
import { useTranslation } from "react-i18next";
import translite from "../../helpers/urlConverter";
import { useNavigate } from "react-router-dom";

const ShortNews = (props) => {
  const { type } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);
  const shortNews = useSelector((store) => store.main.shortNews);

  const postLinkHandler = (title, id) => {
    const correctUrl = translite(title, id);
    navigate(`/${correctUrl}`);
  };

  const iconHandler = (type) => {
    switch (type) {
      case "video":
        return (
          <div className={`${Styles.type}`}>
            <Icon
              icon="bi-play-fill"
              className={`${Styles.icon}`}
              style={{ fontSize: "2rem" }}
            />
          </div>
        );
      case "photo":
        return (
          <div className={`${Styles.type}`}>
            <Icon icon="bi-camera" className={`${Styles.icon}`} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}
    >
      <div className={`${Styles.contentWrap}`}>
        <div className={`${Styles.bgWrap}`}>
          <div className={`${Styles.navigationRow}`}>
            <div className={`${Styles.mainTitle}`}>
              <span>{t("Latest")}</span> {t("News")}
            </div>
          </div>
          {shortNews.length > 1 ? (
            <>
              <div
                className={`${Styles.mainWrap}`}
                onClick={() => {
                  postLinkHandler(shortNews[0].title, shortNews[0].id);
                }}
              >
                <div className={`${Styles.imgWrap}`}>
                  <img src={shortNews[0].picture} alt="img" />
                </div>
                <div className={`${Styles.contentBox}`}>
                  <div
                    className={`${Styles.category}`}
                    style={{ background: `${shortNews[0].category.color}` }}
                  >
                    {shortNews[0].category.name}
                  </div>
                  <div className={`${Styles.title}`}>{shortNews[0].title}</div>
                  <div className={`${Styles.statWrap}`}>
                    <div className={`${Styles.date}`}>
                      <Icon icon="bi-clock" className={`${Styles.icon}`} />
                      <Date data={shortNews[0].date} />
                    </div>
                    <div className={`${Styles.likes}`}>
                      <Icon
                        icon="bi-hand-thumbs-up"
                        className={`${Styles.icon}`}
                      />
                      {shortNews[0].likes_count}
                      {/*<Like data={shortNews[0].likes_count}/>*/}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${Styles.otherWrap} ${
                  type === "box" ? Styles.otherWrapBox : Styles.otherWrapRow
                }`}
              >
                {shortNews.map((item, index) => {
                  if (index !== 0) {
                    return (
                      <div
                        className={`${Styles.otherItem}`}
                        key={`OtherNews2${index}`}
                        onClick={() => {
                          postLinkHandler(item.title, item.id);
                        }}
                      >
                        <div className={`${Styles.imgWrap}`}>
                          <img src={item.picture} alt="img" />
                          {iconHandler(item.media)}
                        </div>
                        <div className={`${Styles.title}`}>{item.title}</div>
                        {/* <Rate rate={item.rate} color='#fae612'/> */}
                      </div>
                    );
                  } else return null;
                })}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default ShortNews;
