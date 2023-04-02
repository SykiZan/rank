import React from "react";
import Styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import mail from "../../theme/assets/svg/contacts/mail.svg";
import telegram from "../../theme/assets/svg/contacts/telegram.svg";
import whatsup from "../../theme/assets/svg/contacts/whatsup.svg";

const Contacts = () => {
  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);

  const { t } = useTranslation();

  return (
    <section
      className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}
    >
      <div className={Styles.contacts}>
        <div className={Styles.contactsBlock}>
          <h2 className={Styles.contactsHeading}>{t("email-adress")}</h2>
          <div className={Styles.contactsRow}>
            <img src={mail} alt="" className={Styles.contactsIcon} />
            <div className={Styles.contactsRowData}>support@magic-rank.com</div>
          </div>
          <div className={Styles.contactsRow}>
            <img src={mail} alt="" className={Styles.contactsIcon} />
            <div className={Styles.contactsRowData}>support@magic-rank.com</div>
          </div>
        </div>
        <div className={Styles.contactsBlock}>
          <h2 className={Styles.contactsHeading}>{t("Messenger")}</h2>
          <div className={Styles.contactsRow}>
            <img src={whatsup} alt="" className={Styles.contactsIcon} />
            <div className={Styles.contactsRowData}>+7 (000) 000-00-00</div>
          </div>
          <div className={Styles.contactsRow}>
            <img src={telegram} alt="" className={Styles.contactsIcon} />
            <div className={Styles.contactsRowData}>@magicrank</div>
          </div>
        </div>
      </div>
      <div className={`${Styles.contentWrap}`}>
        <form className={Styles.form}>
          <div className={`${Styles.headingWrap}`}>
            <h1 className={`${Styles.heading}`}>{t("You have a problem?")}</h1>
            <h1 className={`${Styles.heading}`}>
              {t("Let us know via contact form below")}
            </h1>
          </div>
          <div className={Styles["row-1"]}>
            <div className={Styles["input-block"]}>
              <label
                htmlFor=""
                className={`${Styles.label} ${
                  themeModeStatus ? Styles["label-dark"] : ""
                } `}
              >
                {t("FULL NAME")}*
              </label>
              <input
                type="text"
                className={Styles.input}
                placeholder={`${t("Your name")}*`}
              />
            </div>
            <div className={Styles["input-block"]}>
              <label
                htmlFor=""
                className={`${Styles.label} ${
                  themeModeStatus ? Styles["label-dark"] : ""
                } `}
              >
                {t("EMAIL")}*
              </label>
              <input
                type="email"
                className={Styles.input}
                placeholder={`${t("Your email adress here")}*`}
              />
            </div>
          </div>
          <div className={Styles["row-2"]}>
            <div className={Styles["input-block"]}>
              <label
                htmlFor=""
                className={`${Styles.label} ${
                  themeModeStatus ? Styles["label-dark"] : ""
                } `}
              >
                {t("SUBJECT")}
              </label>
              <input
                type="text"
                className={Styles.input}
                placeholder={`${t("Write subject here")}*`}
              />
            </div>
          </div>
          <div className={Styles["row-3"]}>
            <div className={Styles["input-block"]}>
              <label
                htmlFor=""
                className={`${Styles.label} ${
                  themeModeStatus ? Styles["label-dark"] : ""
                } `}
              >
                {t("MESSAGE")}
              </label>
              <textarea
                className={Styles.textarea}
                placeholder={`${t("Your comment")}*`}
              ></textarea>
            </div>
          </div>

          <button
            className={`${Styles["btn-send"]} ${
              themeModeStatus ? Styles["btn-send-dark"] : ""
            }  `}
          >
            {t("Send")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contacts;
