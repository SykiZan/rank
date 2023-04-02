import React from "react";
import Styles from "./styles.module.scss";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import translite from "../../helpers/urlConverter";
// import Like from "../_UI/like";
import { useTranslation } from "react-i18next";

const LastNews = (props) => {
  const { content } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);
  const categoriesNews = useSelector((store) => store.main.categoriesNews);
  const mainCategory = useSelector((store) => store.main.mainCategory);

  const moreBtnHandler = (id) => {
    if (id) {
      navigate(`/posts/category/${id}/page/1`);
    } else {
      navigate(`/posts/page/1`);
    }
  };

  const postLinkHandler = (title, id) => {
    const correctUrl = translite(title, id);
    navigate(`/${correctUrl}`);
  };

  return (
    <section
      className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}
    >
      <div className={`${Styles.contentWrap}`}>
        <div className={`${Styles.bgWrap}`}>
          <div className={`${Styles.mainTitle}`}>
            <span>{t("Latest")}</span> {t("News")}
          </div>
          {categoriesNews ? (
            <div className={`${Styles.contentBox}`}>
              {categoriesNews.map((item, index) => {
                if (index > content.start && index <= content.end && item) {
                  return (
                    <div
                      className={`${Styles.contentBoxItem}`}
                      key={"latestNews" + index}
                      onClick={() => {
                        postLinkHandler(item.title, item.id);
                      }}
                    >
                      <div className={`${Styles.imgWrap}`}>
                        <img src={item.picture} alt={item.title} />
                        <div
                          className={`${Styles.category}`}
                          style={{ background: `${item.category.color}` }}
                        >
                          {item.category.name}
                        </div>
                      </div>
                      <div className={`${Styles.contentBoxItemNote}`}>
                        <div className={`${Styles.title}`}>{item.title}</div>
                        <div className={`${Styles.statWrap}`}>
                          <div className={`${Styles.date}`}>
                            <div className={`${Styles.iconWrap}`}>
                              <Icon
                                icon="bi-clock"
                                className={`${Styles.icon}`}
                              />
                            </div>
                            <div className={`${Styles.dateContent}`}>
                              <Moment format="ll">{item.date}</Moment>
                            </div>
                          </div>
                          <div className={`${Styles.likes}`}>
                            <div className={`${Styles.iconWrap}`}>
                              <Icon
                                icon="bi-hand-thumbs-up"
                                className={`${Styles.icon}`}
                              />
                            </div>
                            <div className={`${Styles.likesContent}`}>
                              {item.likes_count}
                              {/*<Like data={item.likes_count}/>*/}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`${Styles.description}`}
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(item.content),
                          }}
                        />
                      </div>
                    </div>
                  );
                } else return null;
              })}
            </div>
          ) : null}

          <div className={`${Styles.moreBtn}`}>
            <span
              onClick={() => {
                moreBtnHandler(mainCategory.id);
              }}
            >
              {t("More popular posts")}
            </span>
            {/*<div className={`${Styles.socials}`}>*/}
            {/*    <Icon icon='bi-share-fill' className={`${Styles.icon}`}/>*/}
            {/*    <Icon icon='bi-heart-fill' className={`${Styles.icon}`}/>*/}
            {/*    <Icon icon='bi-twitter' className={`${Styles.icon}`}/>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LastNews;
