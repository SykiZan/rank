import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import Styles from "./styles.module.scss";

// import banner from '../../theme/assets/other/baner.jpg';
import banner1 from "../../theme/assets/other/banner1.jpg";
import banner2 from "../../theme/assets/other/banner2.jpg";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMobileNavigateStatus } from "../../store/main/action";
import logoEN from "../../theme/assets/svg/magic_logotype_en.svg";
import logoRU from "../../theme/assets/svg/magic_logotype_ru.svg";
import starBg from "../../theme/assets/other/news_star_bg_header.png";
import search13 from "../../theme/assets/other/search/search13.png";
import search16 from "../../theme/assets/other/search/search16.png";
import search15 from "../../theme/assets/other/search/search15.png";
import search20 from "../../theme/assets/other/search/search20.png";
import close from "../../theme/assets/other/search/close.png";
import i18next from "i18next";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentLng = useSelector((store) => store.main.lang);

  const location = useLocation();

  const searchInputRef = useRef();

  const [searchParams, setSearchParams] = useSearchParams();

  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);
  const mobileNavigateStatus = useSelector(
    (store) => store.main.mobileNavigateStatus
  );

  // const [searchBoxStatus, setSearchBoxStatus] = useState(false);
  const [mobileNavigationStatus, setMobileNavigationStatus] = useState(false);
  const [daoDropStatus, setDaoDropStatus] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [selectedTab, setSelectedTab] = useState(null);

  useEffect(() => {
    setIsSearch(false);
    if (location.pathname === "/") setSelectedTab(1);
    else if (location.pathname.includes("/ido/page/")) setSelectedTab(2);
    else if (location.pathname.includes("/posts/page/")) setSelectedTab(3);
    else if (location.pathname === "/ratings") setSelectedTab(4);
    else if (location.pathname === "/company") setSelectedTab(6);
    else if (location.pathname === "/contacts") setSelectedTab(7);
    else setSelectedTab(null);
  }, [location.pathname]);

  // const searchBtnHandler = (close) =>{
  //     if (close){
  //         setSearchBoxStatus(false)
  //     } else {
  //         setSearchBoxStatus(!searchBoxStatus);
  //     }
  // }

  const toggleSearchField = () => {
    setIsSearch((prev) => !prev);
  };

  const handleSearch = (e) => {
    setSearchVal(e.target.value);
  };

  // console.log("isSearch", isSearch);

  // console.log(searchVal);
  // console.log(encodeURIComponent(searchVal));

  useEffect(() => {
    const timer = setTimeout(() => {
      searchInputRef.current.focus();
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, [isSearch]);

  useEffect(() => {
    const keyDownHandler = (e) => {
      // console.log("User pressed: ", e.key);

      if (e.key === "Enter") {
        e.preventDefault();
        if (!isSearch) return;
        if (document.activeElement === searchInputRef.current) {
          // console.log("should navigate");

          const encoded = encodeURIComponent(searchVal);

          // navigate(`/?s=${encoded}`);
          // navigate(`/?s=${encoded}`);
          // navigate(`/search`);

          navigate({
            pathname: "/search",
            search: createSearchParams({
              s: encoded,
              lang: i18next.language,
              page: 1,
            }).toString(),
          });

          // setSearchParams({ s: encoded });
        }
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [isSearch, searchVal]);

  const mobileNavigationBtnHandler = (pageStatus) => {
    if (pageStatus) {
      setMobileNavigationStatus(false);
      dispatch(setMobileNavigateStatus(false));
    } else {
      setMobileNavigationStatus(!mobileNavigationStatus);
      dispatch(setMobileNavigateStatus(!mobileNavigateStatus));
    }
  };

  const moreBtnHandler = (id) => {
    if (id === "ratings") {
      navigate("/ratings");
      return;
    }
    if (id === "ido") {
      navigate("/ido/page/1");
      return;
    }

    if (id) {
      navigate(`/posts/category/${id}/page/1`);
    } else {
      navigate(`/posts/page/1`);
    }
  };

  return (
    <section
      className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}
      style={{ backgroundImage: `url(${starBg})` }}
    >
      <div className={`${Styles.desktopBannerWrap}`}>
        <div className={`${Styles.desktopLogoBox}`}>
          <div
            className={`${Styles.logotype}`}
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={currentLng === "en" ? logoEN : logoRU} alt="logotype" />
          </div>
        </div>
        <a href="https://academy.magic-dao.com" target="_blank">
          <div className={`${Styles.desktopBannerBox}`}>
            <div className={`${Styles.banner}`}>
              <img src={banner1} alt="banner" />
            </div>
          </div>
        </a>
      </div>
      {/*<div className={`${Styles.searchWrap} ${searchBoxStatus ? Styles.searchOn : Styles.searchOff}`}>*/}
      {/*    <div className={`${Styles.searchBox}`}>*/}
      {/*        <div className={`${Styles.searchIconWrap}`}>*/}
      {/*            <Icon icon='bi-search' className={`${Styles.icon}`}/>*/}
      {/*        </div>*/}
      {/*        <div className={`${Styles.searchInputWrap}`}>*/}
      {/*            <input type='text' placeholder='Search'/>*/}
      {/*        </div>*/}
      {/*        <div*/}
      {/*            className={`${Styles.closeBtnWrap}`}*/}
      {/*            onClick={()=>{searchBtnHandler(true)}}*/}
      {/*        >*/}
      {/*            <Icon icon='bi-x' className={`${Styles.icon}`}/>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*</div>*/}
      <div
        className={`${Styles.mobileNavigationWrap} ${
          mobileNavigationStatus
            ? Styles.mobileNavigationOn
            : Styles.mobileNavigationOff
        }`}
      >
        <div
          className={`${Styles.mobileNavigationItem}`}
          onClick={() => {
            mobileNavigationBtnHandler(true);
            navigate("/");
          }}
        >
          <div className={`${Styles.mobileNavigationItemNote}`}>
            {t("Home")}
          </div>
        </div>
        <div
          className={`${Styles.mobileNavigationItem}`}
          onClick={() => {
            moreBtnHandler("ido/page/1");
            mobileNavigationBtnHandler(true);
          }}
        >
          <div className={`${Styles.mobileNavigationItemNote}`}>IDO</div>
        </div>
        <div
          className={`${Styles.mobileNavigationItem}`}
          onClick={() => {
            moreBtnHandler(false);
            mobileNavigationBtnHandler(true);
          }}
        >
          <div className={`${Styles.mobileNavigationItemNote}`}>
            {t("News")}
          </div>
        </div>
        <div
          className={`${Styles.mobileNavigationItem}`}
          onClick={() => {
            mobileNavigationBtnHandler(true);
            moreBtnHandler("ratings");
          }}
        >
          <div className={`${Styles.mobileNavigationItemNote}`}>
            {t("Ratings")}
          </div>
        </div>
        <div
          className={`${Styles.mobileNavigationItem} ${
            Styles.mobileNavigationItemWithDrop
          } ${
            daoDropStatus ? Styles.mobileNavigationItemWithDropActive : null
          }`}
          onClick={() => {
            setDaoDropStatus(!daoDropStatus);
          }}
        >
          <div className={`${Styles.mobileNavigationItemNote}`}>
            {t("Projects")}
          </div>
          <div className={`${Styles.mobileNavigationItemIconWrap}`}>
            <Icon icon="bi-caret-right" className={`${Styles.icon}`} />
          </div>
          <div
            className={`${Styles.mobileNavigationItemList} ${
              daoDropStatus ? Styles.mobileNavigationItemListActive : null
            }`}
          >
            <div
              className={`${Styles.mobileNavigationItemListItem}`}
              onClick={() => {
                mobileNavigationBtnHandler(true);
              }}
            >
              Magic Swap
            </div>
            <div
              className={`${Styles.mobileNavigationItemListItem}`}
              onClick={() => {
                mobileNavigationBtnHandler(true);
              }}
            >
              Magic Academy
            </div>
            <div
              className={`${Styles.mobileNavigationItemListItem}`}
              onClick={() => {
                mobileNavigationBtnHandler(true);
              }}
            >
              Magic Wallet
            </div>
            <div
              className={`${Styles.mobileNavigationItemListItem}`}
              onClick={() => {
                mobileNavigationBtnHandler(true);
              }}
            >
              Fratrum
            </div>
          </div>
        </div>
        <div
          className={`${Styles.mobileNavigationItem}`}
          onClick={() => {
            mobileNavigationBtnHandler(true);
            navigate("/company");
          }}
        >
          <div className={`${Styles.mobileNavigationItemNote}`}>
            {t("About Us")}
          </div>
        </div>
        <div
          className={`${Styles.mobileNavigationItem}`}
          onClick={() => {
            navigate("/contacts");
            mobileNavigationBtnHandler(true);
          }}
        >
          <div className={`${Styles.mobileNavigationItemNote}`}>
            {t("Contacts")}
          </div>
        </div>
      </div>
      {/* {isSearch && (
        <AnimateHeight duration={1000} height={40}>
        </AnimateHeight>
        <div className={`${Styles.search} ${Styles.searchExpanded}`}></div>
      )} */}

      {/* <div
        className={`${Styles.search} ${   isSearch ? Styles.search : Styles.searchInvisible}`}
      ></div> */}

      <div
        className={`${Styles.searchInvisible} ${isSearch ? Styles.search : ""}`}
      >
        <div className={Styles.searchInputWrap}>
          <div className={Styles.searchInputWrapInner}>
            <img
              src={search15}
              alt="search"
              className={Styles.searchInputIcon}
            />
            <input
              type="text"
              className={Styles.searchInput}
              ref={searchInputRef}
              onChange={handleSearch}
            />
            <img
              src={close}
              alt="search"
              className={Styles.searchInputIconClose}
              onClick={toggleSearchField}
            />
          </div>
        </div>
      </div>
      <div
        className={`${Styles.contentWrap} ${
          mobileNavigationStatus
            ? Styles.contentWrapCorrect
            : Styles.contentWrapBase
        }`}
        style={{
          borderBottom: `${themeModeStatus ? "1px solid #414653" : ""}`,
          // backgroundColor: "red",
          // backgroundImage: `url(${starBg})`,
        }}
      >
        <div className={`${Styles.desktopNavigationWrap} `}>
          <div
            className={`${Styles.desktopNavigationItem} `}
            onClick={() => {
              navigate("/");
            }}
          >
            <div
              className={`${Styles.desktopNavigationItemNote} ${
                selectedTab === 1 ? Styles.desktopNavigationItemActive : ""
              }`}
            >
              {t("Home")}
            </div>
          </div>
          <div
            className={`${Styles.desktopNavigationItem} `}
            onClick={() => {
              moreBtnHandler("ido");
            }}
          >
            <div
              className={`${Styles.desktopNavigationItemNote} ${
                selectedTab === 2 ? Styles.desktopNavigationItemActive : ""
              }`}
            >
              IDO
            </div>
          </div>
          <div
            className={`${Styles.desktopNavigationItem} `}
            onClick={() => {
              moreBtnHandler(false);
            }}
          >
            <div
              className={`${Styles.desktopNavigationItemNote} ${
                selectedTab === 3 ? Styles.desktopNavigationItemActive : ""
              }`}
            >
              {t("News")}
            </div>
          </div>
          <div
            className={`${Styles.desktopNavigationItem} `}
            onClick={() => {
              moreBtnHandler("ratings");
            }}
          >
            <div
              className={`${Styles.desktopNavigationItemNote} ${
                selectedTab === 4 ? Styles.desktopNavigationItemActive : ""
              }`}
            >
              {t("Ratings")}
            </div>
          </div>
          <div className={`${Styles.desktopNavigationItem} ${Styles.dao}`}>
            <div className={`${Styles.desktopNavigationItemNote}`}>
              {t("Projects")}
            </div>
            <div className={`${Styles.desktopNavigationItemIconWrap}`}>
              <Icon icon="bi-caret-down" className={`${Styles.icon}`} />
            </div>
            <div className={`${Styles.daoAbsDropdown}`}>
              <div className={`${Styles.daoAbsDropdownBox}`}>
                <div className={`${Styles.daoAbsDropdownItem}`}>Magic Swap</div>
                <div className={`${Styles.daoAbsDropdownItem}`}>
                  Magic Academy
                </div>
                <div className={`${Styles.daoAbsDropdownItem}`}>
                  Magic Wallet
                </div>
                <div className={`${Styles.daoAbsDropdownItem}`}>Fratrum</div>
              </div>
            </div>
          </div>
          <div
            className={`${Styles.desktopNavigationItem} `}
            onClick={() => {
              navigate("/company");
            }}
          >
            <div
              className={`${Styles.desktopNavigationItemNote} ${
                selectedTab === 6 ? Styles.desktopNavigationItemActive : ""
              }`}
            >
              {t("About Us")}
            </div>
          </div>
          <div
            className={`${Styles.desktopNavigationItem} `}
            onClick={() => {
              navigate("/contacts");
            }}
          >
            <div
              className={`${Styles.desktopNavigationItemNote} ${
                selectedTab === 7 ? Styles.desktopNavigationItemActive : ""
              }`}
            >
              {t("Contact Us")}
            </div>
          </div>
        </div>
        <div className={`${Styles.navBtnWrap}`}>
          <div
            className={`${Styles.navBtn} ${
              mobileNavigationStatus ? Styles.navBtnCorrect : Styles.navBtnBase
            }`}
            onClick={() => {
              mobileNavigationBtnHandler();
            }}
          >
            <div className={`${Styles.navBtnItem}`} />
            <div className={`${Styles.navBtnItem}`} />
            <div className={`${Styles.navBtnItem}`} />
          </div>
        </div>
        <div
          className={`${Styles.logotypeWrap}`}
          onClick={() => {
            navigate("/");
          }}
        >
          <div className={`${Styles.logotype}`}>
            <img src={currentLng === "en" ? logoEN : logoRU} alt="logotype" />
          </div>
        </div>
        {/*<div className={`${Styles.searchBtnWrap}`}>*/}
        {/*    <div*/}
        {/*        className={`${Styles.searchBtn}`}*/}
        {/*        onClick={()=>{searchBtnHandler()}}*/}
        {/*    >*/}
        {/*        <Icon icon='bi-search' className={`${Styles.icon}`}/>*/}
        {/*    </div>*/}
        {/*</div>*/}
        <div className={Styles.searchBarBtnWrap}>
          <img
            src={search20}
            className={Styles.searchBarBtn}
            onClick={toggleSearchField}
          />
        </div>
      </div>
    </section>
  );
};

export default Navigation;
