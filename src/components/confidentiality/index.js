import React from "react";
import Styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Confidentiality = () => {
  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);

  const { t } = useTranslation();

  return (
    <section
      className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}
    >
      <div className={`${Styles.contentWrap}`}>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.mainTitle}`}>
            {t("Confidentiality-main-head")}
          </div>
          <div className={`${Styles.paragraph}`}>
            {t("Confidentiality-description-1")}
          </div>
          <div className={`${Styles.paragraph}`}>
            {t("Confidentiality-description-2")}
          </div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.title}`}>{t("Confidentiality-head-1")}</div>
          <div className={`${Styles.subTitle}`}>
            {t("Confidentiality-sub-general")}
          </div>
          <div className={`${Styles.paragraph}`}>
            {t("Confidentiality-general-1")}
            <br className={`${Styles.br}`} />
            {t("Confidentiality-general-2")}
          </div>
          <div className={`${Styles.subTitle}`}>
            {t("Confidentiality-sub-personal")}
          </div>
          <div className={`${Styles.paragraph}`}>
            {t("Confidentiality-personal-1")}
            <br className={`${Styles.br}`} />
            {t("Confidentiality-personal-2")}
            <br className={`${Styles.br}`} />
            {t("Confidentiality-personal-3")}
          </div>
          <div className={`${Styles.subTitle}`}>
            {t("Confidentiality-sub-additional")}
          </div>
          <div className={`${Styles.paragraph}`}>
            {t("Confidentiality-additional-1")}
            <br className={`${Styles.br}`} />
            {t("Confidentiality-additional-2")}
          </div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.title}`}>{t("Confidentiality-head-2")}</div>
          <div className={`${Styles.paragraph}`}>
            {t("Confidentiality-2-para")}
          </div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.title}`}>{t("Confidentiality-head-3")}</div>
          <div className={`${Styles.listWrap}`}>
            <div className={`${Styles.listTitle}`}>
              {t("Confidentiality-3-description")}
            </div>
            <div className={`${Styles.listBox}`}>
              <div className={`${Styles.listItem}`}>
                {t("Confidentiality-3-list-1")}
              </div>
              <div className={`${Styles.listItem}`}>
                {t("Confidentiality-3-list-2")}
              </div>
              <div className={`${Styles.listItem}`}>
                {t("Confidentiality-3-list-3")}
              </div>
              <div className={`${Styles.listItem}`}>
                {t("Confidentiality-3-list-4")}
              </div>
            </div>
          </div>
          <div className={`${Styles.paragraph}`}>
            {t("Confidentiality-3-para-1")}
            <br className={`${Styles.br}`} />
            {t("Confidentiality-3-para-2")}
            <br className={`${Styles.br}`} />
            {t("Confidentiality-3-para-3")}
            <br className={`${Styles.br}`} />
            {t("Confidentiality-3-para-4")}
          </div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.title}`}>{t("Confidentiality-head-4")}</div>
          <div className={`${Styles.paragraph}`}>
            {t("Confidentiality-4-para-1")}
            <br className={`${Styles.br}`} />
            {t("Confidentiality-4-para-2")}
            <br className={`${Styles.br}`} />
            {t("Confidentiality-4-para-3")}
            <br className={`${Styles.br}`} />
            {t("Confidentiality-4-para-4")}
          </div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.title}`}>{t("Confidentiality-head-5")}</div>
          <div className={`${Styles.paragraph}`}>
            {t("Confidentiality-5-para-1")}
            <br className={`${Styles.br}`} />
            {t("Confidentiality-5-para-2-1")}{" "}
            <span className={`${Styles.colored}`}>support@magic-rank.com</span>,
            {t("Confidentiality-5-para-2-2")}
            <br className={`${Styles.br}`} />
            {t("Confidentiality-5-para-3")}
            <span className={`${Styles.colored}`}> support@magic-rank.com</span>
            .
          </div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.title}`}>{t("Confidentiality-head-6")}</div>
          <div className={`${Styles.paragraph}`}>
            {t("Confidentiality-6-para-1")}{" "}
            <span className={`${Styles.colored}`}>support@magic-rank.com</span>.
            <br className={`${Styles.br}`} />
            {t("Confidentiality-6-para-2-1")}{" "}
            <span className={`${Styles.colored}`}>support@magic-rank.com</span>.
            {t("Confidentiality-6-para-2-2")}
          </div>
          <div className={`${Styles.paragraph}`}>
            {t("Confidentiality-6-para-3")}
          </div>
          <div className={`${Styles.paragraph}`}>
            {t("Confidentiality-6-para-4")}
          </div>
          <div className={`${Styles.paragraph}`}>
            {t("Confidentiality-6-para-5")}
          </div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.title}`}>{t("Confidentiality-head-7")}</div>
          <div className={`${Styles.paragraph}`}>
            {t("Confidentiality-7-para-1")}
          </div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.title}`}>{t("Confidentiality-head-8")}</div>
          <div className={`${Styles.paragraph}`}>
            {t("Confidentiality-8-para-1")}
          </div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.title}`}>{t("Confidentiality-head-9")}</div>
          <div className={`${Styles.paragraph}`}>
            {t("Confidentiality-9-para-1")}
          </div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.title}`}>
            {t("Confidentiality-head-10")}
          </div>
          <div className={`${Styles.paragraph}`}>
            {t("Confidentiality-10-para-1")}
          </div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.title}`}>
            {t("Confidentiality-head-11")}
          </div>
          <div className={`${Styles.paragraph}`}>
            {t("Confidentiality-11-para-1")}
            <br className={`${Styles.br}`} />
            {t("Confidentiality-11-para-2")}
          </div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.title}`}>
            {t("Confidentiality-head-12")}
          </div>
          <div className={`${Styles.paragraph}`}>
            {t("Confidentiality-12-para-1")}{" "}
            <span className={`${Styles.colored}`}>support@magic-rank.com</span>.
          </div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.title}`}>
            {t("Confidentiality-disclaimer")}
          </div>
          <div className={`${Styles.paragraph}`}>
            {t("Confidentiality-disclaimer-para-1")}
            <br className={`${Styles.br}`} />
            {t("Confidentiality-disclaimer-para-2")}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Confidentiality;
