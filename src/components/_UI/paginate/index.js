import React from "react";
import Styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import i18next from "i18next";

const Paginate = (props) => {
  const { links, type, id, page } = props;
  const navigate = useNavigate();
  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);

  const [searchParams, setSearchParams] = useSearchParams();

  // console.log(props);

  const paginateItemContentHandler = (item) => {
    // console.log(item);
    const { label, active, url } = item;
    if (label.indexOf("Previous") !== -1) {
      return (
        <div
          className={`${Styles.iconWrap} ${
            url ? Styles.iconWrapActive : Styles.iconWrapNotActive
          }`}
        >
          {/* <Icon icon="bi-caret-left" className={`${Styles.icon}`} /> */}
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="2x"
            className={`${Styles.icon}`}
          />
        </div>
      );
    } else if (label.indexOf("Next") !== -1) {
      return (
        <div
          className={`${Styles.iconWrap} ${
            url ? Styles.iconWrapActive : Styles.iconWrapNotActive
          }`}
        >
          {/* <Icon icon="bi-caret-right" className={`${Styles.icon}`} /> */}
          <FontAwesomeIcon
            icon={faChevronRight}
            size="2x"
            className={`${Styles.icon}`}
          />
        </div>
      );
    } else {
      return (
        <div
          className={`${Styles.btnWrap} ${
            active ? Styles.btnWrapActive : null
          }`}
        >
          {label}
        </div>
      );
    }
  };

  const paginateItemBtnHandler = (item) => {
    // if (props.idoPage) {

    //  navigate()

    //     return
    // }

    const { label, url } = item;
    if (url) {
      if (label.indexOf("Previous") !== -1) {
        if (type && id) {
          navigate(`/posts/${type}/${id}/page/${Number(page) - 1}`);
        } else {
          if (props.idoPage) navigate(`/ido/page/${Number(page) - 1}`);
          else if (props.searchPage)
            navigate({
              pathname: "/search",
              search: createSearchParams({
                s: decodeURIComponent(searchParams.get("s")),
                lang: i18next.language,
                page: Number(page) - 1,
              }).toString(),
            });
          else navigate(`/posts/page/${Number(page) - 1}`);
        }
      } else if (label.indexOf("Next") !== -1) {
        if (type && id) {
          navigate(`/posts/${type}/${id}/page/${Number(page) + 1}`);
        } else {
          if (props.idoPage) navigate(`/ido/page/${Number(page) + 1}`);
          else if (props.searchPage)
            navigate({
              pathname: "/search",
              search: createSearchParams({
                s: decodeURIComponent(searchParams.get("s")),
                lang: i18next.language,
                page: Number(page) + 1,
              }).toString(),
            });
          else navigate(`/posts/page/${Number(page) + 1}`);
        }
      } else {
        if (type && id) {
          navigate(`/posts/${type}/${id}/page/${item.label}`);
        } else {
          if (props.idoPage) navigate(`/ido/page/${item.label}`);
          else if (props.searchPage)
            navigate({
              pathname: "/search",
              search: createSearchParams({
                s: decodeURIComponent(searchParams.get("s")),
                lang: i18next.language,
                page: item.label,
              }).toString(),
            });
          else navigate(`/posts/page/${item.label}`);
        }
      }
    }
  };

  return (
    <section
      className={`${Styles.container}  ${themeModeStatus ? Styles.dark : null}`}
    >
      <div className={`${Styles.paginateWrap}`}>
        {links?.map((item, index) => {
          return (
            <div
              className={`${Styles.paginateItem}`}
              key={"paginate" + index}
              onClick={() => {
                paginateItemBtnHandler(item);
              }}
            >
              {paginateItemContentHandler(item)}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Paginate;
