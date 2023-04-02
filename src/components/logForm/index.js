import React, { useEffect, useState } from "react";
import Styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { baseLog, baseLogFailure } from "../../store/main/action";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LogForm = () => {
  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);
  const baseLogErr = useSelector((store) => store.main.baseLogErr);
  const magicToken = useSelector((store) => store.main.magicToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPswStatus, setShowPswStatus] = useState(false);

  const sendFormHandler = () => {
    dispatch(baseLog({ email, password }));
  };

  useEffect(() => {
    if (magicToken) {
      navigate("/");
    }
  }, [magicToken, navigate]);

  return (
    <section
      className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}
    >
      <div className={`${Styles.contentWrap}`}>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.formWrap}`}>
            {/* <div className={`${Styles.formTitle}`}>{t('Sign In')}</div> */}
            <div className={`${Styles.formBox}`}>
              <div className={`${Styles.inputWrap}`}>
                <div className={`${Styles.inputTitle}`}>
                  {t("Email Address")} *
                </div>
                <input
                  type="text"
                  placeholder={t("Email")}
                  className={`${Styles.input} ${
                    baseLogErr?.email ? Styles.inputWithErr : null
                  }`}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (baseLogErr.email) {
                      delete baseLogErr.email;
                      dispatch(baseLogFailure(baseLogErr));
                    }
                  }}
                />
                {baseLogErr?.email ? (
                  <div className={`${Styles.inputErr}`}>{baseLogErr.email}</div>
                ) : null}
              </div>
              <div className={`${Styles.inputWrap} ${Styles.inputWrapPsw}`}>
                <div className={`${Styles.inputTitle}`}>{t("Password")} *</div>
                <input
                  type={showPswStatus ? "text" : "password"}
                  placeholder={t("Password")}
                  className={`${Styles.input} ${
                    baseLogErr?.password ? Styles.inputWithErr : null
                  }`}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (baseLogErr.password) {
                      delete baseLogErr.password;
                      dispatch(baseLogFailure(baseLogErr));
                    }
                  }}
                />
                {baseLogErr?.password ? (
                  <div className={`${Styles.inputErr}`}>
                    {baseLogErr.password}
                  </div>
                ) : null}
                <div
                  className={`${Styles.absPswBtn}`}
                  onClick={() => {
                    setShowPswStatus(!showPswStatus);
                  }}
                >
                  <Icon
                    icon={showPswStatus ? "bi-eye" : "bi-eye-slash"}
                    className={`${Styles.icon}`}
                  />
                </div>
              </div>
            </div>
            {/*<div className={`${Styles.formCheck}`}>*/}
            {/*    <input type="checkbox" className={`${Styles.checkBox}`}/>*/}
            {/*    Я согласен с правилами сайта и на обработку персональных данных*/}
            {/*</div>*/}
            <div
              className={`${Styles.mainBtn}`}
              onClick={() => {
                sendFormHandler();
              }}
            >
              {t("Sign In")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogForm;
