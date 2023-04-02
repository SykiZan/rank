import React from "react";
import Styles from "./styles.module.scss";
import SubscribeItem from "../_UI/subscribeItem";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Subscribers = (props) => {
  const { withBg } = props;
  const subscribers = useSelector((store) => store.main.subscribers);

  const location = useLocation();

  return (
    <section
      className={`${Styles.container} ${
        location.pathname.includes("posts/category/rank/")
          ? Styles.containerRank
          : ""
      }`}
    >
      {subscribers ? (
        <div
          className={`${Styles.contentWrap} ${withBg ? Styles.withBg : null}`}
        >
          <SubscribeItem
            icon="bi-telegram"
            color="#2b9ed6"
            subscribe={subscribers.youtube}
            note="Telegram"
            bgStatus={withBg}
            link="https://t.me/magicrank"
          />
          <SubscribeItem
            icon="bi-twitter"
            color="#1da1f2"
            subscribe={subscribers.twitter}
            note="Twitter"
            bgStatus={withBg}
            link="http://twitter.com/magic_rank"
          />
          <SubscribeItem
            icon="bi-reddit"
            color="#ff4500"
            subscribe="941"
            note="Reddit"
            bgStatus={withBg}
            link="https://www.reddit.com/user/magic_rank"
          />
          {/*<SubscribeItem icon='bi-pinterest' color='#cb2028' subscribe='1,310' note='Followers' bgStatus={withBg}/>*/}
        </div>
      ) : null}
    </section>
  );
};

export default Subscribers;
