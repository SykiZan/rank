import React from "react";
import Styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Breadcrumbs = (props) => {
  const { page } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);
  const pathname = window.location.pathname;

  const itemHandler = () => {
    if (pathname.indexOf("posts/page") !== -1) {
      return (
        <div className={`${Styles.contentWrap}`}>
          <div className={`${Styles.title}`}>{t("News")}</div>
          <div className={`${Styles.itemWrap}`}>
            <div
              className={`${Styles.item}`}
              onClick={() => {
                navigate("/");
              }}
            >
              {t("Home")}
            </div>
            <div className={`${Styles.item}`}>{t("News")}</div>
          </div>
        </div>
      );
    }
    if (pathname.indexOf("posts/category/1") !== -1) {
      return (
        <div className={`${Styles.contentWrap}`}>
          <div className={`${Styles.title}`}>IDO</div>
          <div className={`${Styles.itemWrap}`}>
            <div
              className={`${Styles.item}`}
              onClick={() => {
                navigate("/");
              }}
            >
              {t("Home")}
            </div>
            <div className={`${Styles.item}`}>IDO</div>
          </div>
        </div>
      );
    }
    if (page === "news") {
      return (
        <div className={`${Styles.contentWrap}`}>
          <div className={`${Styles.title}`}>{t("News")}</div>
          <div className={`${Styles.itemWrap}`}>
            <div
              className={`${Styles.item}`}
              onClick={() => {
                navigate("/");
              }}
            >
              {t("Home")}
            </div>
            <div className={`${Styles.item}`}>{t("News")}</div>
          </div>
        </div>
      );
    }
    if (page === "contacts") {
      return (
        <div className={`${Styles.contentWrap}`}>
          <div className={`${Styles.title}`}>{t("Contacts")}</div>
          <div className={`${Styles.itemWrap}`}>
            <div
              className={`${Styles.item}`}
              onClick={() => {
                navigate("/");
              }}
            >
              {t("Home")}
            </div>
            <div className={`${Styles.item}`}>{t("Contacts")}</div>
          </div>
        </div>
      );
    }
    if (page === "confidentiality") {
      return (
        <div className={`${Styles.contentWrap}`}>
          <div className={`${Styles.title}`}>{t("Privacy Policy")}</div>
          <div className={`${Styles.itemWrap}`}>
            <div
              className={`${Styles.item}`}
              onClick={() => {
                navigate("/");
              }}
            >
              {t("Home")}
            </div>
            <div className={`${Styles.item}`}>{t("Privacy Policy")}</div>
          </div>
        </div>
      );
    }
    if (page === "termsAndConditions") {
      return (
        <div className={`${Styles.contentWrap}`}>
          <div className={`${Styles.title}`}>{t("Terms and Conditions")}</div>
          <div className={`${Styles.itemWrap}`}>
            <div
              className={`${Styles.item}`}
              onClick={() => {
                navigate("/");
              }}
            >
              {t("Home")}
            </div>
            <div className={`${Styles.item}`}>{t("Terms and Conditions")}</div>
          </div>
        </div>
      );
    }
    if (page === "editorial") {
      return (
        <div className={`${Styles.contentWrap}`}>
          <div className={`${Styles.title}`}>{t("Editorial policy")}</div>
          <div className={`${Styles.itemWrap}`}>
            <div
              className={`${Styles.item}`}
              onClick={() => {
                navigate("/");
              }}
            >
              {t("Home")}
            </div>
            <div className={`${Styles.item}`}>{t("Editorial policy")}</div>
          </div>
        </div>
      );
    }
    if (page === "ad") {
      return (
        <div className={`${Styles.contentWrap}`}>
          <div className={`${Styles.title}`}>{t("Advertising")}</div>
          <div className={`${Styles.itemWrap}`}>
            <div
              className={`${Styles.item}`}
              onClick={() => {
                navigate("/");
              }}
            >
              {t("Home")}
            </div>
            <div className={`${Styles.item}`}>{t("Advertising")}</div>
          </div>
        </div>
      );
    }
    if (page === "company") {
      return (
        <div className={`${Styles.contentWrap}`}>
          <div className={`${Styles.title}`}>{t("Company")}</div>
          <div className={`${Styles.itemWrap}`}>
            <div
              className={`${Styles.item}`}
              onClick={() => {
                navigate("/");
              }}
            >
              {t("Home")}
            </div>
            <div className={`${Styles.item}`}>{t("Company")}</div>
          </div>
        </div>
      );
    }
    if (page === "reg") {
      return (
        <div className={`${Styles.contentWrap}`}>
          <div className={`${Styles.title}`}>{t("Sign Up")}</div>
          <div className={`${Styles.itemWrap}`}>
            <div
              className={`${Styles.item}`}
              onClick={() => {
                navigate("/");
              }}
            >
              {t("Home")}
            </div>
            <div className={`${Styles.item}`}>{t("Sign Up")}</div>
          </div>
        </div>
      );
    }
    if (page === "log") {
      return (
        <div className={`${Styles.contentWrap}`}>
          <div className={`${Styles.title}`}>{t("Sign In")}</div>
          <div className={`${Styles.itemWrap}`}>
            <div
              className={`${Styles.item}`}
              onClick={() => {
                navigate("/");
              }}
            >
              {t("Home")}
            </div>
            <div className={`${Styles.item}`}>{t("Sign In")}</div>
          </div>
        </div>
      );
    }
    if (page === "ratings") {
      return (
        <div
          className={`${Styles.contentWrap}`}
          style={{ paddingRight: "19px", marginBottom: "3rem" }}
        >
          <div className={`${Styles.title}`}>{t("Ratings")}</div>
          <div className={`${Styles.itemWrap}`}>
            <div
              className={`${Styles.item}`}
              onClick={() => {
                navigate("/");
              }}
            >
              {t("Home")}
            </div>
            <div className={`${Styles.item}`}>{t("Ratings")}</div>
          </div>
        </div>
      );
    }

    if (pathname.indexOf("rank") !== -1) {
      return (
        <div className={`${Styles.contentWrap}`}>
          <div className={`${Styles.title}`}>{t("Ratings")}</div>
          <div className={`${Styles.itemWrap}`}>
            <div
              className={`${Styles.item}`}
              onClick={() => {
                navigate("/");
              }}
            >
              {t("Home")}
            </div>
            <div className={`${Styles.item}`}>{t("Ratings")}</div>
          </div>
        </div>
      );
    }
  };

  return (
    <section
      className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}
    >
      {itemHandler()}
    </section>
  );
};

export default Breadcrumbs;
