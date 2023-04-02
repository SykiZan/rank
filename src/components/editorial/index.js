import React from "react";
import Styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Editorial = () => {
  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);

  const { t } = useTranslation();

  return (
    <section
      className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}
    >
      <div className={`${Styles.contentWrap}`}>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.mainTitle}`}>{t("Editorial-head")}</div>
          <div className={`${Styles.paragraph}`}>{t("Editorial-1")}</div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.paragraph}`}>{t("Editorial-2")}</div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.paragraph}`}>{t("Editorial-3")}</div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.paragraph}`}>{t("Editorial-4")}</div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.paragraph}`}>
            {t("Editorial-questions")}{" "}
            <span className={`${Styles.colored}`}> support@magic-rank.com</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Editorial;
