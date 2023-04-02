import React from "react";
import Styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TermsAndConditions = () => {
  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);
  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <section
      className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}
    >
      <div className={`${Styles.contentWrap}`}>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.mainTitle}`}>{t("Terms-head")}</div>
          <div className={`${Styles.paragraph}`}>
            {t("Terms-1-1")}
            <span
              className={`${Styles.link}`}
              onClick={() => {
                navigate("/");
              }}
            >
              {" "}
              https://magic-rank.com/
            </span>
            {t("Terms-1-2")}
          </div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.paragraph}`}>{t("Terms-2")}</div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.paragraph}`}>{t("Terms-3")}</div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.paragraph}`}>{t("Terms-4")}</div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.paragraph}`}>{t("Terms-5")}</div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.paragraph}`}>{t("Terms-6")}</div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.paragraph}`}>{t("Terms-7")}</div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.paragraph}`}>
            {t("Terms-questions")}
            <span className={`${Styles.colored}`}> support@magic-rank.com</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
