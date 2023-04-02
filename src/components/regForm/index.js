import React, { useEffect, useState } from "react";
import Styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { baseReg, baseRegFailure } from "../../store/main/action";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RegForm = () => {
  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);
  const baseRegErr = useSelector((store) => store.main.baseRegErr);
  const magicToken = useSelector((store) => store.main.magicToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [referral_email, setReferral_email] = useState("");

  const [showPswStatus, setShowPswStatus] = useState(false);
  const [showConfPswStatus, setShowConfPswStatus] = useState(false);

  // const [checkStatus, setCheckStatus] = useState(false);
  // const [pushFormStatus, setPushFormStatus] = useState(false);

  const sendFormHandler = () => {
    dispatch(
      baseReg({ email, password, password_confirmation, referral_email })
    );
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
            {/* <div className={`${Styles.formTitle}`}>{t('Sign Up')}</div> */}
            <div className={`${Styles.formBox}`}>
              <div className={`${Styles.inputWrap}`}>
                <div className={`${Styles.inputTitle}`}>
                  {t("Referral Email")}
                </div>
                <input
                  type="text"
                  placeholder={t("Referral Email")}
                  className={`${Styles.input} ${
                    baseRegErr?.referral_email ? Styles.inputWithErr : null
                  }`}
                  onChange={(e) => {
                    setReferral_email(e.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (baseRegErr.referral_email) {
                      delete baseRegErr.referral_email;
                      dispatch(baseRegFailure(baseRegErr));
                    }
                  }}
                />
                {baseRegErr?.referral_email ? (
                  <div className={`${Styles.inputErr}`}>
                    {baseRegErr?.referral_email}
                  </div>
                ) : null}
              </div>
              <div className={`${Styles.inputWrap}`}>
                <div className={`${Styles.inputTitle}`}>
                  {t("Email Address")} *
                </div>
                <input
                  type="text"
                  placeholder={t("Email")}
                  className={`${Styles.input} ${
                    baseRegErr?.email ? Styles.inputWithErr : null
                  }`}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (baseRegErr.email) {
                      delete baseRegErr.email;
                      dispatch(baseRegFailure(baseRegErr));
                    }
                  }}
                />
                {baseRegErr?.email ? (
                  <div className={`${Styles.inputErr}`}>
                    {baseRegErr?.email}
                  </div>
                ) : null}
              </div>
              <div className={`${Styles.inputWrap} ${Styles.inputWrapPsw}`}>
                <div className={`${Styles.inputTitle}`}>{t("Password")} *</div>
                <input
                  type={showPswStatus ? "text" : "password"}
                  placeholder={t("Password")}
                  className={`${Styles.input} ${
                    baseRegErr?.password ? Styles.inputWithErr : null
                  }`}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (baseRegErr.password) {
                      delete baseRegErr.password;
                      dispatch(baseRegFailure(baseRegErr));
                    }
                  }}
                />
                {baseRegErr?.password ? (
                  <div className={`${Styles.inputErr}`}>
                    {baseRegErr.password}
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
              <div className={`${Styles.inputWrap} ${Styles.inputWrapPsw}`}>
                <div className={`${Styles.inputTitle}`}>
                  {t("Confirm password")} *
                </div>
                <input
                  type={showConfPswStatus ? "text" : "password"}
                  placeholder={t("Confirm password")}
                  className={`${Styles.input} ${
                    baseRegErr?.password_confirmation
                      ? Styles.inputWithErr
                      : null
                  }`}
                  onChange={(e) => {
                    setPassword_confirmation(e.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (baseRegErr.password_confirmation) {
                      delete baseRegErr.password_confirmation;
                      dispatch(baseRegFailure(baseRegErr));
                    }
                  }}
                />
                {baseRegErr?.password_confirmation ? (
                  <div className={`${Styles.inputErr}`}>
                    {baseRegErr.password_confirmation}
                  </div>
                ) : null}
                <div
                  className={`${Styles.absPswBtn}`}
                  onClick={() => {
                    setShowConfPswStatus(!showConfPswStatus);
                  }}
                >
                  <Icon
                    icon={showConfPswStatus ? "bi-eye" : "bi-eye-slash"}
                    className={`${Styles.icon}`}
                  />
                </div>
              </div>
            </div>
            {/*<div className={`${Styles.formCheck} ${checkStatus && pushFormStatus ? null : Styles.formCheckErr}`}>*/}
            {/*    <input type="checkbox" className={`${Styles.checkBox}`} onChange={()=>{setCheckStatus(!checkStatus)}}/>*/}
            {/*    Я согласен с правилами сайта и на обработку персональных данных*/}
            {/*</div>*/}
            <div
              className={`${Styles.mainBtn}`}
              onClick={() => {
                sendFormHandler();
              }}
            >
              {t("Sign Up")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegForm;
