import { Icon } from "@iconify/react";
import React from "react";
import Moment from "react-moment";
import TopHeader from "../../components/topHeader";

import classes from "./SearchPage.module.scss";

import testImage from "../../theme/assets/other/img16.jpg";
import Paginate from "../../components/_UI/paginate";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { api } from "../../api";
import translite from "../../helpers/urlConverter";
import { useSelector } from "react-redux";

const SearchPage = () => {
  const location = useLocation();

  const params = useParams();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [curPage, setCurPage] = useState(searchParams.get("page"));
  const [searchResults, setSearchResults] = useState(null);

  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);

  useEffect(() => {
    setCurPage(searchParams.get("page"));
  }, [searchParams.get("page")]);

  // console.log(curPage);
  // console.log(params);
  // console.log(searchParams.get("s"));
  // console.log(decodeURIComponent(searchParams.get("s")));

  const getSearchResults = async () => {
    const res = await fetch(
      // api.host +
      //   api.main.idoPaginated +
      //   `?page=${curPage}&lang=${i18next.language}`

      api.host +
        `api/v1/search?string=${decodeURIComponent(
          searchParams.get("s")
        )}&page=${curPage}`
    );

    const data = await res.json();

    // console.log(res);
    // console.log(data);
    // console.log(data.response);
    if (data.response) setSearchResults(data.response);
  };

  useEffect(() => {
    getSearchResults();
  }, [searchParams.get("s"), curPage]);
  // useEffect(() => {
  //   console.log("hahahah");
  //   getSearchResults();
  // }, [searchParams]);

  const postLinkHandler = (title, id) => {
    const correctUrl = translite(title, id);
    navigate(`/${correctUrl}`);
  };

  // console.log(location.pathname);
  // console.log(searchParams);
  // console.log(window.location.pathname);
  // console.log(window.location.search);
  // console.log(location.search);
  // console.log(new URLSearchParams(url.search));
  const root = document.getElementById("root");
  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0 });
    root.scrollTo({
      top: 0,
    });
  }, [location.search]);

  return (
    <div className={`${classes.page} ${themeModeStatus ? classes.dark : ""}`}>
      <div className={classes["page-content"]}>
        <h1 className={classes["page-header"]}>
          Результаты поиска: {decodeURIComponent(searchParams.get("s"))}
        </h1>
        <section className={classes["grid-wrap"]}>
          {searchResults &&
            searchResults.data.map((e) => (
              <div
                className={classes.card}
                key={e.id}
                onClick={() => {
                  postLinkHandler(e.title, e.id);
                }}
              >
                <div className={classes["img-wrap"]}>
                  <img
                    src={e.picture ? e.picture : testImage}
                    alt="picture"
                    className={classes.img}
                  />
                </div>
                <div className={classes["card-bottom"]}>
                  <h2 className={classes["card-title"]}>{e.title}</h2>
                  <div className={classes["date-wrap"]}>
                    <Icon icon="bi-clock" className={classes.icon} />
                    <Moment format="ll">{e.date}</Moment>
                  </div>
                </div>
              </div>
            ))}
          {searchResults && searchResults.data.length === 0 && (
            <div className={classes["no-results"]}>No results found</div>
          )}
        </section>
        {searchResults && searchResults.data.length > 0 && (
          <Paginate
            links={searchResults.links}
            searchPage={true}
            page={curPage}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
