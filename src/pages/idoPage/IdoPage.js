import React, { useEffect, useState } from "react";

import classes from "./IdoPage.module.scss";

import box1 from "../../theme/assets/svg/idoPage/box-1.svg";
import box2 from "../../theme/assets/svg/idoPage/box-2.svg";
import box3 from "../../theme/assets/svg/idoPage/box-3.svg";
import box4 from "../../theme/assets/svg/idoPage/box-4.svg";
import box5 from "../../theme/assets/svg/idoPage/box-5.svg";
import arrowUp from "../../theme/assets/svg/idoPage/arrowUp.svg";
import arrowDown from "../../theme/assets/svg/idoPage/arrowDown.svg";
import hat from "../../theme/assets/svg/idoPage/hat.svg";

import { api as api } from "../../api/index";
import i18next from "i18next";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";

const IdoPage = () => {
  const [post, setPost] = useState(null);

  const params = useParams();

  // const postUpdateHandler = () => {
  //   const paragraph = document.getElementById("paragraph");
  //   const linkList = paragraph.querySelectorAll("a");
  //   linkList.forEach((item) => {
  //     item.setAttribute("target", "_blank");
  //   });
  // };

  // useEffect(() => {
  //   if (post) {
  //     postUpdateHandler(DOMPurify.sanitize(post.content));
  //   }
  // }, [post, post.content]);

  const getData = async (id) => {
    const res = await fetch(
      `${api.host}${api.main.idoId}/${id}?lang=${i18next.language}`
    );

    const data = await res.json();

    // console.log(res);
    // console.log(data);
    // console.log(data.response);
    setPost(data.response);
  };

  useEffect(() => {
    getData(params.id);
  }, []);

  const getDate = (date) => {
    const myDate = new Date(date);

    const yyyy = myDate.getFullYear();
    let mm = myDate.getMonth() + 1;
    let dd = myDate.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formatted = dd + "." + mm + "." + yyyy;
    return formatted;
  };

  return (
    <div className={classes.page}>
      <div style={{ height: "50px" }}></div>
      <div
        className={classes["header-wrap"]}
        // style={{ background: `${post ? `url(${post.picture})` : ""}` }}
      >
        {post && (
          <header className={classes.header}>
            <div className={classes.top}>
              <div className={classes["boxes-top"]}>
                <div className={classes["box-top"]}>
                  <div>Старт</div>
                  <div>{getDate(post.date)}</div>
                </div>
                <div className={classes["box-top"]}>
                  {" "}
                  <div>Старт</div>
                  <div>{getDate(post.date)}</div>
                </div>
              </div>
            </div>
            <div className={classes.bottom}>
              <h2 className={classes["bottom-header"]}>Sweat Economy</h2>
              <div className={classes["boxes-bottom"]}>
                <div className={classes["box-bottom-separate"]}>
                  <div className={classes.backdrop}></div>
                  <div className={classes["box-separate-content"]}>
                    <img
                      src={hat}
                      alt="icon"
                      className={classes["box-separate-icon"]}
                    />
                    <div className={classes["box-separate-info"]}>
                      <div className={classes["separate-info-row-1"]}>
                        Magic Rank score
                      </div>

                      <div className={classes["separate-info-row-2"]}>
                        {post.rank_score} / 10
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes["boxes-bottom-long"]}>
                  <div className={classes["box-long-unit"]}>
                    <div className={classes["box-long-unit-content"]}>
                      <img
                        src={box1}
                        alt="icon"
                        className={classes["box-long-unit-icon"]}
                      />
                      <div className={classes["box-long-unit-info"]}>
                        <div className={classes["info-row-1"]}>IDO Price</div>
                        <div className={classes["info-row-2"]}>
                          ${post.private_price}
                        </div>
                        {post.private_price_change && (
                          <div
                            className={`${classes["info-row-3"]} ${
                              post.private_price_change > 0
                                ? classes.green
                                : classes.red
                            }`}
                          >
                            <img
                              src={
                                post.private_price_change > 0
                                  ? arrowUp
                                  : arrowDown
                              }
                              alt=""
                              className={classes.arrow}
                            />
                            <span>{post.private_price_change}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={classes["box-long-unit"]}>
                    <div className={classes["box-long-unit-content"]}>
                      <img
                        src={box2}
                        alt="icon"
                        className={classes["box-long-unit-icon"]}
                      />
                      <div className={classes["box-long-unit-info"]}>
                        <div className={classes["info-row-1"]}>
                          Current Price
                        </div>
                        <div className={classes["info-row-2"]}>
                          ${post.current_price}
                        </div>
                        {post.current_price_change && (
                          <div
                            className={`${classes["info-row-3"]} ${
                              post.current_price_change > 0
                                ? classes.green
                                : classes.red
                            }`}
                          >
                            <img
                              src={
                                post.current_price_change > 0
                                  ? arrowUp
                                  : arrowDown
                              }
                              alt=""
                              className={classes.arrow}
                            />
                            <span>{post.current_price_change}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={classes["box-long-unit"]}>
                    <div className={classes["box-long-unit-content"]}>
                      <img
                        src={box3}
                        alt="icon"
                        className={classes["box-long-unit-icon"]}
                      />
                      <div className={classes["box-long-unit-info"]}>
                        <div className={classes["info-row-1"]}>
                          Public Price
                        </div>
                        <div className={classes["info-row-2"]}>
                          ${post.public_price}
                        </div>
                        {post.public_price_change && (
                          <div
                            className={`${classes["info-row-3"]} ${
                              post.public_price_change > 0
                                ? classes.green
                                : classes.red
                            }`}
                          >
                            <img
                              src={
                                post.public_price_change > 0
                                  ? arrowUp
                                  : arrowDown
                              }
                              alt=""
                              className={classes.arrow}
                            />
                            <span>{post.public_price_change}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={classes["box-long-unit"]}>
                    <div className={classes["box-long-unit-content"]}>
                      <img
                        src={box4}
                        alt="icon"
                        className={classes["box-long-unit-icon"]}
                      />
                      <div className={classes["box-long-unit-info"]}>
                        <div className={classes["info-row-1"]}>ATH Price</div>
                        <div className={classes["info-row-2"]}>
                          ${post.ath_price}
                        </div>
                        {post.ath_price_change && (
                          <div
                            className={`${classes["info-row-3"]} ${
                              post.ath_price_change > 0
                                ? classes.green
                                : classes.red
                            }`}
                          >
                            <img
                              src={
                                post.ath_price_change > 0 ? arrowUp : arrowDown
                              }
                              alt=""
                              className={classes.arrow}
                            />
                            <span>{post.ath_price_change}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={classes["box-long-unit"]}>
                    <div className={classes["box-long-unit-content"]}>
                      <img
                        src={box5}
                        alt="icon"
                        className={classes["box-long-unit-icon"]}
                      />
                      <div className={classes["box-long-unit-info"]}>
                        <div className={classes["info-row-1"]}>ATL Price</div>
                        <div className={classes["info-row-2"]}>
                          ${post.atl_price}
                        </div>
                        {post.atl_price_change && (
                          <div
                            className={`${classes["info-row-3"]} ${
                              post.atl_price_change > 0
                                ? classes.green
                                : classes.red
                            }`}
                          >
                            <img
                              src={
                                post.atl_price_change > 0 ? arrowUp : arrowDown
                              }
                              alt=""
                              className={classes.arrow}
                            />
                            <span>{post.atl_price_change}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        )}
      </div>
      <div className={classes["para-wrap"]}>
        {post && (
          <div
            className={`${classes.paragraph}`}
            id="paragraph"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }}
          />
        )}
      </div>
    </div>
  );
};

export default IdoPage;
