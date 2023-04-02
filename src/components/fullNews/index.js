import React, { useEffect } from "react";
import Styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";
// import Like from "../_UI/like";
import Date from "../_UI/date";
import View from "../_UI/view";
import { Icon } from "@iconify/react";
import LikeBtn from "../_UI/likeBtn";

const FullNews = (props) => {
  const { post } = props;
  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);

  const postUpdateHandler = () => {
    const paragraph = document.getElementById("paragraph");
    const linkList = paragraph.querySelectorAll("a");
    linkList.forEach((item) => {
      item.setAttribute("target", "_blank");
    });
  };

  useEffect(() => {
    if (post) {
      postUpdateHandler(DOMPurify.sanitize(post.content));
    }
  }, [post, post.content]);

  // console.log(post.content);
  // console.log("---------", post.content.indexOf("data"));
  // console.log("---------", post.content.indexOf('\\ " '));

  return (
    <section
      className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}
    >
      {post ? (
        <div className={`${Styles.contentWrap}`}>
          <div className={`${Styles.mainBox}`}>
            <div className={`${Styles.imgWrap}`}>
              <img src={post.picture} alt={post.title} />
              <LikeBtn id={post.id} />
            </div>
            <div className={`${Styles.noteBox}`}>
              <div className={`${Styles.title}`}>{post.title}</div>
              <div className={`${Styles.statWrap}`}>
                <div>
                  <Icon icon="bi-clock" className={`${Styles.icon}`} />
                  <Date data={post.created_at} />
                </div>
                <div>
                  {" "}
                  <Icon icon="bi-hand-thumbs-up" className={`${Styles.icon}`} />
                  {post.likes_count}{" "}
                </div>
                <div>
                  <View data={post.views_count} />
                </div>
              </div>
              <div
                className={`${Styles.paragraph}`}
                id="paragraph"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.content),
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default FullNews;
