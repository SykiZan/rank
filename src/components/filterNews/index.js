import React, { useEffect, useState } from "react";
import Styles from "./styles.module.scss";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import Paginate from "../_UI/paginate";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getPaginateCategoriesNews } from "../../store/main/action";
import translite from "../../helpers/urlConverter";
import DOMPurify from "dompurify";
// import Like from "../_UI/like";
import { useTranslation } from "react-i18next";

import views from "../../theme/assets/other/views2.png";
import viewsWhite from "../../theme/assets/other/viewsWhite.png";
import like from "../../theme/assets/other/like2.png";
import likeWhite from "../../theme/assets/other/likeWhite.png";
import comment from "../../theme/assets/other/comment2.png";
import commentWhite from "../../theme/assets/other/commentWhite.png";

import { api as api } from "../../api/index";
import i18next from "i18next";

const FilterNews = () => {
  let { type, id, page } = useParams();
  const { t } = useTranslation();
  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);
  const paginateCategoriesNews = useSelector(
    (store) => store.main.paginateCategoriesNews
  );
  const navigate = useNavigate();

  const location = useLocation();

  const params = useParams();
  const [curPage, setCurPage] = useState(params.page);

  const [isNewsPage, setIsNewsPage] = useState(false);
  const [isIdoPage, setIsIdoPage] = useState(false);
  const [isCategoryPage, setIsCategoryPage] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [dataSource, setDataSource] = useState(null);

  useEffect(() => {
    if (location.pathname.includes("/posts/page")) setIsNewsPage(true);
    else setIsNewsPage(false);
    if (location.pathname.includes("/ido")) setIsIdoPage(true);
    else setIsIdoPage(false);
    if (location.pathname.includes("/posts/category")) setIsCategoryPage(true);
    else setIsCategoryPage(false);
  }, [location.pathname]);

  // const [filterDataStatus, setFilterDataStatus] = useState(false);
  // const [filterLikesStatus, setFilterLikesStatus] = useState(false);

  const postLinkHandler = (title, id) => {
    if (isIdoPage) {
      navigate(`/ido/${id}`);
      return;
    }

    const correctUrl = translite(title, id);
    navigate(`/${correctUrl}`);
  };

  const getNewsData = async () => {
    const res = await fetch(
      api.host +
        api.main.idoPaginated +
        `?page=${curPage}&lang=${i18next.language}`
    );

    const data = await res.json();

    // console.log(res);
    // console.log(data);
    // console.log(data.response);
    if (data.response) setNewsData(data.response);
  };

  useEffect(() => {
    getNewsData();
  }, [curPage]);

  useEffect(() => {
    setCurPage(params.page);
  }, [location.pathname]);

  useEffect(() => {
    if (newsData && paginateCategoriesNews) {
      if (newsData && isIdoPage) setDataSource(newsData.data);
      else
        setDataSource(
          paginateCategoriesNews.data.slice(
            5,
            paginateCategoriesNews.data.length
          )
        );
    }
  }, [newsData, isIdoPage, paginateCategoriesNews]);

  // console.log(paginateCategoriesNews.data);
  // console.log(dataSource);
  // console.log(newsData);
  // console.log(paginateCategoriesNews);

  return (
    <section
      className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}
    >
      {paginateCategoriesNews?.data ? (
        <div
          className={`${Styles.contentWrap} ${
            isIdoPage ? Styles.idoWrapper : ""
          } `}
          style={{
            paddingTop: `${isNewsPage || isCategoryPage ? 0 : ""}`,
          }}
        >
          {!isNewsPage && !isCategoryPage && (
            <div className={`${Styles.titleRow}`}>
              <div className={`${Styles.mainTitle}`}>
                {isIdoPage && <span>IDO</span>}
                {!isIdoPage && (
                  <>
                    <span>{t("Latest")}</span>
                    {t("News")}
                  </>
                )}
              </div>
              <div className={`${Styles.filterWrap}`}>
                <div className={`${Styles.filterItem}`}>{t("All")}</div>
                <div className={`${Styles.filterItem}`}>{t("Upcoming")}</div>
                <div className={`${Styles.filterItem}`}>{t("Active")}</div>
                <div className={`${Styles.filterItem}`}>{t("Past")}</div>
              </div>
            </div>
          )}
          <div
            className={`${Styles.contentBox}`}
            style={{
              marginTop: `${isNewsPage || isCategoryPage ? 0 : ""}`,
            }}
          >
            {/* {paginateCategoriesNews?.data.map((item, index) => { */}
            {
              // paginateCategoriesNews &&
              //   paginateCategoriesNews.data
              //     .slice(5, paginateCategoriesNews.data.lenght)
              dataSource &&
                dataSource.map((item, index) => {
                  return (
                    <div
                      className={`${Styles.contentBoxItem}`}
                      style={{ display: `${isIdoPage ? "block" : ""}` }}
                      key={"latestNews" + index}
                      onClick={() => {
                        postLinkHandler(item.title, item.id);
                      }}
                    >
                      <div className={`${Styles.imgWrap}`}>
                        <div className={Styles.gradient}></div>
                        <img src={item.picture} alt={item.title} />
                        {/* <div className={`${Styles.category}`} style={{background: `${item.category.color}`}}>
                                            {item.category.name}
                                        </div> */}
                        {isIdoPage && (
                          <div
                            className={`${Styles.contentBoxItemNote} ${Styles.contentBoxItemNoteIdo} `}
                          >
                            <div className={`${Styles.title}`}>
                              {item.title}
                            </div>
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
                                  <span> -- </span>
                                </div>
                              </div>
                              {isIdoPage && (
                                <div className={`${Styles.likes}`}>
                                  <div className={`${Styles.iconWrap}`}>
                                    <Icon
                                      icon="bi-hand-thumbs-up"
                                      className={`${Styles.icon}`}
                                    />
                                  </div>
                                  <div className={`${Styles.likesContent}`}>
                                    {item.likes_count}
                                  </div>
                                </div>
                              )}
                            </div>
                            {/* <div
                              className={`${Styles.description}`}
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(item.content),
                              }}
                            /> */}
                          </div>
                        )}
                      </div>
                      {!isIdoPage && (
                        <div
                          className={`${Styles.contentBoxItemNote}`}
                          // style={{ padding: "10px" }}
                        >
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
                            {isIdoPage && (
                              <div className={`${Styles.likes}`}>
                                <div className={`${Styles.iconWrap}`}>
                                  <Icon
                                    icon="bi-hand-thumbs-up"
                                    className={`${Styles.icon}`}
                                  />
                                </div>
                                <div className={`${Styles.likesContent}`}>
                                  {item.likes_count}
                                  {/* <Like data={item.likes_count} /> */}
                                </div>
                              </div>
                            )}
                          </div>
                          <div
                            className={`${Styles.description}`}
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(item.content),
                            }}
                          />
                        </div>
                      )}
                      {(isNewsPage || isCategoryPage) && (
                        <div className={`${Styles.contentBoxFooter}`}>
                          <div className={`${Styles.separator}`}></div>
                          <div className={`${Styles.contentBoxFooterContent}`}>
                            <div className={`${Styles.authorBlock}`}>
                              <div className={`${Styles.authorImage}`}>
                                <img
                                  src={item.author && item.author.image}
                                  alt=""
                                />
                              </div>
                              <div className={`${Styles.authorName}`}>
                                {item.author && item.author.name}
                              </div>
                            </div>
                            <div className={`${Styles.stats}`}>
                              <div className={`${Styles.statsUnit}`}>
                                <img src={views} alt="" />
                                <div className={`${Styles.statsCount}`}>
                                  {" "}
                                  {item.views_count}
                                </div>
                              </div>
                              <div className={`${Styles.statsUnit}`}>
                                {/* <img src={like} alt="" /> */}
                                <Icon
                                  icon="bi-hand-thumbs-up"
                                  className={`${Styles.icon}`}
                                  style={{ marginRight: "8px" }}
                                />
                                <div className={`${Styles.statsCount}`}>
                                  {item.likes_count}
                                </div>
                              </div>
                              <div className={`${Styles.statsUnit}`}>
                                <img src={comment} alt="" />
                                <div className={`${Styles.statsCount}`}>0</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
            }
          </div>
          <div className={`${Styles.paginatePositionWrap}`}>
            {!isIdoPage && (
              <Paginate
                links={paginateCategoriesNews?.links}
                type={type}
                id={id}
                page={page}
                action={getPaginateCategoriesNews}
              />
            )}
            {isIdoPage && (
              <Paginate links={newsData?.links} idoPage={true} page={curPage} />
            )}
          </div>
          {/*<div className={`${Styles.moreBtn}`}>*/}
          {/*    <span>More popular posts</span>*/}
          {/*    <div className={`${Styles.socials}`}>*/}
          {/*        <Icon icon='bi-share-fill' className={`${Styles.icon}`}/>*/}
          {/*        <Icon icon='bi-heart-fill' className={`${Styles.icon}`}/>*/}
          {/*        <Icon icon='bi-twitter' className={`${Styles.icon}`}/>*/}
          {/*    </div>*/}
          {/*</div>*/}
        </div>
      ) : null}
    </section>
  );
};

export default FilterNews;
