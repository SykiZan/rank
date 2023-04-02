import React, { useEffect, useState } from "react";

import Styles from "./RankTable.module.scss";

import arrowUp from "../../theme/assets/svg/arrowUp.svg";
import arrowDown from "../../theme/assets/svg/arrowDown.svg";
import expandArrow from "../../theme/assets/svg/expandArrowRank.svg";
import expandArrowWhite from "../../theme/assets/svg/expandArrowRankWhite.svg";

import { api as api } from "../../api/index";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const RankTable = () => {
  //   console.log(api.host + api.main.rank);

  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);

  const [ratingData, setRatingsData] = useState(null);
  const [ratingDataFiltered, setRatingDataFiltered] = useState(null);
  const [expandedIds, setExpandedIds] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const getData = async () => {
    const res = await fetch(api.host + api.main.rank);

    const data = await res.json();

    // console.log(res);
    // console.log(data);
    // console.log(data.response);
    setRatingsData(data.response);
    setRatingDataFiltered(data.response.ratings);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleExpand = (id) => {
    if (expandedIds.includes(id)) {
      setExpandedIds((prev) => {
        const arr = [...prev];
        const pos = arr.indexOf(id);
        arr.splice(pos, 1);
        return arr;
      });
    } else
      setExpandedIds((prev) => {
        const arr = [...prev];
        arr.push(id);
        return arr;
      });
  };

  const handleFilter = (id) => {
    if (id === selectedFilter) {
      setSelectedFilter(null);
      setRatingDataFiltered(ratingData.ratings);
      return;
    } else setSelectedFilter(id);

    const arr = ratingData.ratings.filter((e) => e.category_id === id);

    setRatingDataFiltered(arr);
  };

  // console.log(ratingData);

  return (
    <div className={`${Styles.page} ${themeModeStatus ? Styles.dark : ""}`}>
      {/* <div className={Styles.heading}>
        <div className={Styles.headingName}>Ratings</div>
        <div className={Styles.headingRight}>
          <div
            className={`${Styles.headingItem}`}
            onClick={() => {
              navigate("/");
            }}
          >
            {t("Home")}
          </div>
          <div className={`${Styles.headingItem}`}>{t("Ratings")}</div>
        </div>
      </div> */}
      <div className={Styles.container}>
        <header className={Styles.headerContainer}>
          {/* <div className={Styles.empty}></div> */}
          <div className={Styles.filters}>
            {/* <button className={`${Styles.btnFilter}`}>Крипто-миллионеры</button>
          <button className={`${Styles.btnFilter}`}>NFT</button>
          <button className={`${Styles.btnFilter}`}>Биржи</button>
          <button className={`${Styles.btnFilter}`}>О рейтинге</button> */}
            {ratingData &&
              ratingData.categories.map((e, i) => (
                <button
                  className={`${Styles.btnFilter} ${
                    e.id === selectedFilter ? Styles.btnFilterSelected : ""
                  }`}
                  key={i}
                  onClick={() => {
                    handleFilter(e.id);
                  }}
                >
                  {e.name}
                </button>
              ))}
            <button className={`${Styles.btnFilter}`}>О рейтинге</button>
          </div>
        </header>
        <div className={Styles.tableContainer}>
          {ratingDataFiltered &&
            ratingDataFiltered.map((e, i) => (
              <div
                key={i}
                className={`${Styles.rowExpandedWrap} ${
                  i === 0 ? Styles.firstRow : ""
                } ${
                  i === ratingDataFiltered.length - 1 ? Styles.lastRow : ""
                } `}
              >
                <div
                  className={`${Styles.tableRow} ${
                    i === 0 ? Styles.firstRow : ""
                  } ${
                    i === ratingDataFiltered.length - 1 ? Styles.lastRow : ""
                  }`}
                >
                  <div className={[`${Styles.cell} ${Styles["col-1"]}`]}>
                    {e.rating_change > 0 ? (
                      <img src={arrowUp} alt="" />
                    ) : (
                      <img src={arrowDown} alt="" />
                    )}
                    <span
                      className={`${Styles.ratingChange}   ${
                        e.rating_change > 0
                          ? Styles.changeGreen
                          : Styles.changeRed
                      }`}
                    >
                      {e.rating_change}
                    </span>
                  </div>
                  <div className={[`${Styles.cell} ${Styles["col-2"]}`]}>
                    {e.rating}
                  </div>
                  <div className={[`${Styles.cell} ${Styles["col-3"]}`]}>
                    <img src={e.image} alt="" className={Styles.image} />
                  </div>
                  <div className={[`${Styles.cell} ${Styles["col-4"]}`]}>
                    {e.name}
                  </div>
                  <div className={[`${Styles.cell} ${Styles["col-5"]}`]}>
                    <span>{e.capital}</span>
                  </div>
                  <div className={[`${Styles.cell} ${Styles["col-6"]}`]}>
                    <span>{e.short_description}</span>
                    <img
                      src={themeModeStatus ? expandArrowWhite : expandArrow}
                      alt="arrow"
                      className={Styles.expand}
                      onClick={() => {
                        handleExpand(e.id);
                      }}
                      style={{
                        transform: `${
                          expandedIds.includes(e.id) ? "rotate(180deg)" : ""
                        }`,
                      }}
                    />
                  </div>
                </div>
                {/* {expandedIds.includes(e.id) && (
                  <div className={Styles.description}>{e.description}</div>
                )} */}

                <div
                  className={`${Styles.descriptionInvisible} ${
                    expandedIds.includes(e.id) ? Styles.description : ""
                  }`}
                >
                  <div className={Styles.descriptionWrap}>{e.description}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RankTable;
