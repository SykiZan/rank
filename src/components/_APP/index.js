import React, { useEffect } from "react";
import Styles from "./styles.module.scss";
import { Route, Routes } from "react-router-dom";
import MainPage from "../../pages/mainPage";
import CategoriesPage from "../../pages/categoriesPage";
import TopHeader from "../topHeader";
import Navigation from "../navigation";
import Footer from "../footer";
import Scroller from "../scroller";
import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import { setLoginStatus } from "../../store/main/action";

import NewsPage from "../../pages/newsPage";
import ContactPage from "../../pages/contactPage";
import ConfidentialityPage from "../../pages/confidentialityPage";
import TermsAndConditionsPage from "../../pages/termsAndConditionsPage";
import EditorialPage from "../../pages/editorialPage";
import AdPage from "../../pages/adPage";
import CompanyPage from "../../pages/companyPage";
import RegPage from "../../pages/regPage";
import LogPage from "../../pages/logPage";
import IdoPage from "../../pages/idoPage/IdoPage";
import SearchPage from "../../pages/searchPage/SearchPage";

//lazy
// const IdoPage = lazy(() => import("../../pages/idoPage/IdoPage"));
// const ContactPage = lazy(() => import("../../pages/contactPage"));
// const ConfidentialityPage = lazy(() =>
//   import("../../pages/confidentialityPage")
// );
// const TermsAndConditionsPage = lazy(() =>
//   import("../../pages/termsAndConditionsPage")
// );
// const EditorialPage = lazy(() => import("../../pages/editorialPage"));
// const AdPage = lazy(() => import("../../pages/adPage"));
// const CompanyPage = lazy(() => import("../../pages/companyPage"));
// const RegPage = lazy(() => import("../../pages/regPage"));
// const LogPage = lazy(() => import("../../pages/logPage"));
// const NewsPage = lazy(() => import("../../pages/newsPage"));

// eslint-disable-next-line no-unused-expressions

const App = () => {
  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);
  const mobileNavigateStatus = useSelector(
    (store) => store.main.mobileNavigateStatus
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const web3 = new Web3(window.ethereum);
    web3.eth.getAccounts(function (err, accounts) {
      if (err != null) console.error("An error occurred: " + err);
      else if (accounts.length === 0)
        dispatch(setLoginStatus({ status: false, type: false }));
      else
        dispatch(
          setLoginStatus({
            status: true,
            type: "metamask",
            address: accounts[0],
          })
        );
    });
  }, [dispatch]);

  useEffect(() => {
    if (mobileNavigateStatus) {
      document.getElementById("root").style.overflowY = "hidden";
    } else {
      document.getElementById("root").style.overflowY = "scroll";
    }
  }, [mobileNavigateStatus]);

  // useEffect(()=>{
  //     dispatch(getUserData());
  // },[dispatch])

  return (
    <section
      className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}
    >
      <TopHeader />
      <Navigation />

      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route
          exact
          path="/posts/:type/:id/page/:page"
          element={<CategoriesPage />}
        />
        <Route
          exact
          path="/ido/page/:page"
          element={<CategoriesPage page="ido" />}
        />
        <Route exact path="/posts/page/:page" element={<CategoriesPage />} />
        <Route
          exact
          path="/ratings"
          element={<CategoriesPage page="ratings" />}
        />
        <Route exact path="/:title" element={<NewsPage />} />
        <Route exact path="/contacts" element={<ContactPage />} />
        <Route exact path="/privacy-policy" element={<ConfidentialityPage />} />
        <Route
          exact
          path="/terms-and-conditions"
          element={<TermsAndConditionsPage />}
        />
        <Route exact path="/editorial-policy" element={<EditorialPage />} />
        <Route exact path="/ad" element={<AdPage />} />
        <Route exact path="/company" element={<CompanyPage />} />
        <Route exact path="/sign-up" element={<RegPage />} />
        <Route exact path="/sign-in" element={<LogPage />} />
        <Route exact path="/ido/:id" element={<IdoPage />} />
        <Route exact path="/search" element={<SearchPage />} />
      </Routes>

      <Footer />
      <Scroller />
    </section>
  );
};

export default App;
