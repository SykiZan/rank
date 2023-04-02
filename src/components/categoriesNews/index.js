import React from "react";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import Styles from "./styles.module.scss";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { setMainCategory } from "../../store/main/action";
import translite from "../../helpers/urlConverter";
import Date from "../_UI/date";
// import Like from "../_UI/like";
import { useTranslation } from "react-i18next";

import banner2 from "../../theme/assets/other/banner2.jpg";

const CategoriesNews = (props) => {
  const { type, content } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);
  const navigationCategories = useSelector(
    (store) => store.main.navigationCategories
  );
  const categoriesNews = useSelector((store) => store.main.categoriesNews);
  const mainCategory = useSelector((store) => store.main.mainCategory);

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

  const navigationCategoriesHandler = (category) => {
    dispatch(setMainCategory(category));
  };

  const navigationCategoriesArrowHandler = (arrow) => {
    let currentIndex = false;

    if (mainCategory.id) {
      navigationCategories.forEach((item, index) => {
        if (item.id === mainCategory.id) {
          currentIndex = index;
        }
      });
    } else {
      currentIndex = -1;
    }

    if (arrow) {
      if (currentIndex === navigationCategories.length - 1) {
        dispatch(setMainCategory({ id: false, name: t("All") }));
      } else {
        navigationCategories.forEach((item, index) => {
          if (index === currentIndex + 1) {
            dispatch(setMainCategory({ id: item.id, name: item.name }));
          }
        });
      }
    } else {
      if (currentIndex === -1) {
        dispatch(
          setMainCategory({
            id: navigationCategories[navigationCategories.length - 1].id,
            name: navigationCategories[navigationCategories.length - 1].name,
          })
        );
      } else if (currentIndex === 0) {
        dispatch(setMainCategory({ id: false, name: t("All") }));
      } else {
        navigationCategories.forEach((item, index) => {
          if (index === currentIndex - 1) {
            dispatch(setMainCategory({ id: item.id, name: item.name }));
          }
        });
      }
    }
  };

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
      className={`${Styles.container} ${themeModeStatus ? Styles.dark : null} ${
        Styles.containerFirst
      }`}
    >
      <div className={`${Styles.contentWrap}`}>
        <div className={`${Styles.bgWrap}`}>
          <div className={`${Styles.navigationRow}`}>
            <div className={`${Styles.mainTitle}`}>
              <span>{t("All")}</span> {t("News")}
            </div>
            <div
              className={`${Styles.navigationWrapMobile}`}
              style={{ color: `${themeModeStatus ? "#f5f5f5" : ""}` }}
            >
              {mainCategory.name}
            </div>
            <div className={`${Styles.navigationWrap}`}>
              <div
                className={`${Styles.navigationItem} ${
                  mainCategory?.id === false
                    ? Styles.navigationItemActive
                    : null
                }`}
                key={"navigationCategories"}
                onClick={() => {
                  navigationCategoriesHandler({ id: false, name: t("All") });
                }}
              >
                {t("All")}
              </div>
              {navigationCategories
                ? navigationCategories.map((item, index) => {
                    return (
                      <div
                        style={{ color: `${themeModeStatus ? "#f5f5f5" : ""}` }}
                        className={`${Styles.navigationItem} ${
                          mainCategory?.id === item.id
                            ? Styles.navigationItemActive
                            : null
                        }`}
                        key={"navigationCategories" + index}
                        onClick={() => {
                          navigationCategoriesHandler({
                            id: item.id,
                            name: item.name,
                          });
                        }}
                      >
                        {item.name}
                      </div>
                    );
                  })
                : null}
            </div>
            <div className={`${Styles.arrowWrap}`}>
              <div
                className={`${Styles.arrowItem}`}
                onClick={() => {
                  navigationCategoriesArrowHandler(false);
                }}
              >
                <Icon icon="bi-caret-left" className={`${Styles.icon}`} />
              </div>
              <div
                className={`${Styles.arrowItem}`}
                onClick={() => {
                  navigationCategoriesArrowHandler(true);
                }}
              >
                <Icon icon="bi-caret-right" className={`${Styles.icon}`} />
              </div>
            </div>
          </div>
          {categoriesNews ? (
            <>
              {categoriesNews[content.start] ? (
                <div
                  className={`${Styles.mainWrap}`}
                  onClick={() => {
                    postLinkHandler(
                      categoriesNews[content.start].title,
                      categoriesNews[content.start].id
                    );
                  }}
                >
                  <div className={`${Styles.imgWrap}`}>
                    <img
                      src={categoriesNews[content.start].picture}
                      alt="img"
                    />
                    {mainCategory.id && (
                      <div
                        className={`${Styles.category}`}
                        style={{
                          background: `${
                            categoriesNews[content.start].category.color
                          }`,
                        }}
                      >
                        {categoriesNews[content.start].category.name}
                      </div>
                    )}
                  </div>
                  <div className={`${Styles.title}`}>
                    {categoriesNews[content.start].title}
                  </div>
                  <div className={`${Styles.statWrap}`}>
                    <div className={`${Styles.date}`}>
                      <div className={`${Styles.iconWrap}`}>
                        <Icon icon="bi-clock" className={`${Styles.icon}`} />
                      </div>
                      <div className={`${Styles.dateContent}`}>
                        <Date data={categoriesNews[content.start].date} />
                        {`     `}
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
                        {categoriesNews[content.start].likes_count}
                        {/*<Like data={categoriesNews[content.start].likes_count}/>*/}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${Styles.description}`}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        categoriesNews[content.start].content
                      ),
                    }}
                  />
                </div>
              ) : null}
              <div
                className={`${Styles.otherWrap} ${
                  type === "box" ? Styles.otherWrapBox : Styles.otherWrapRow
                }`}
              >
                {categoriesNews.map((item, index) => {
                  if (index > content.start && index <= content.end) {
                    return (
                      <div
                        className={`${Styles.otherItem}`}
                        key={`OtherNews${index}`}
                        onClick={() => {
                          postLinkHandler(item.title, item.id);
                        }}
                      >
                        <div className={`${Styles.imgWrap}`}>
                          <img src={item.picture} alt="img" />
                          {iconHandler(item.media)}
                          {mainCategory.id && item?.category ? (
                            <div
                              className={`${Styles.otherCategory}`}
                              style={{ background: `${item.category.color}` }}
                            >
                              {item.category.name}
                            </div>
                          ) : null}
                        </div>
                        <div className={`${Styles.itemContent}`}>
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
                                <Date data={item.date} />
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
                        </div>
                      </div>
                    );
                  } else return null;
                })}
              </div>
            </>
          ) : null}
          <div
            className={`${Styles.moreBtn}`}
            onClick={() => {
              moreBtnHandler(mainCategory.id);
            }}
          >
            <span>{t("More popular posts")}</span>
            {/*<div className={`${Styles.socials}`}>*/}
            {/*    <Icon icon='bi-share-fill' className={`${Styles.icon}`}/>*/}
            {/*    <Icon icon='bi-heart-fill' className={`${Styles.icon}`}/>*/}
            {/*    <Icon icon='bi-twitter' className={`${Styles.icon}`}/>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
      {props.isBanner && (
        <a href="https://education.magic-dao.com" target="_blank">
          <img src={banner2} alt="banner" className={Styles.banner} />
        </a>
      )}
    </section>
  );
};

export default CategoriesNews;
