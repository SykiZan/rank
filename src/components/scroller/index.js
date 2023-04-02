import React, { useEffect, useState } from "react";

import Styles from "./styles.module.scss";
import { Icon } from "@iconify/react";

const Scroller = () => {
  const [displayStatus, setDisplayStatus] = useState(window.scrollY > 0);
  const root = document.getElementById("root");
  const scrollHandler = () => {
    root.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    root.addEventListener("scroll", (e) => {
      setDisplayStatus(root.scrollTop);
    });
    return () => {
      root.removeEventListener("scroll", (e) => {
        setDisplayStatus(root.scrollTop);
      });
    };
  }, [root]);
  return (
    <section
      className={`${Styles.container}`}
      onClick={() => {
        scrollHandler();
      }}
      style={displayStatus ? { display: "grid" } : { display: "none" }}
    >
      <Icon icon="bi-arrow-up-short" className={`${Styles.icon}`} />
    </section>
  );
};

export default Scroller;
