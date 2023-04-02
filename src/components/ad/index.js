import React, { useEffect, useRef, useState } from "react";
import Styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import CustomPhoneInput from "../_UI/customPhoneInput";
import { useTranslation } from "react-i18next";
import { ad, adFailure, adSuccess } from "../../store/main/action";
import Checkbox from "../_UI/checkbox/Checkbox";
import { useCaretPosition } from "react-use-caret-position";

const Ad = (props) => {
  const { toastHandler } = props;
  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);
  const adResult = useSelector((store) => store.main.ad);
  const adErr = useSelector((store) => store.main.adErr);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");
  const [site, setSite] = useState("");
  const [product, setProduct] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState(false);
  const [countryData, setCountryData] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // const { ref, start, end, updateCaret } = useCaretPosition();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  const cleanHandler = () => {
    setName("");
    setPhone("");
    setEmail("");
    setCity("");
    setBudget("");
    setSite("");
    setProduct("");
    setComment("");
    setStatus(false);
  };

  const handleCheck = () => {
    setStatus((prev) => !prev);
  };

  const changePhoneHandler = (value) => {
    setPhone(value.phone);
  };

  const phoneRef = useRef();

  const handlePhoneInput = (e) => {
    let code = countryData.country_calling_code;

    const { selectionStart, selectionEnd } = phoneRef.current;
    // console.log(selectionStart, selectionEnd);

    if (phone && selectionStart < 5) return;

    // console.log(e.target.value);

    let removeHyphen = e.target.value.replace(/\-/g, "");
    // console.log(removeHyphen);
    let phoneAfterCode = removeHyphen.replace(code + " ", "");
    // console.log(phoneAfterCode);

    if (!phoneAfterCode) {
      setPhone("");
      return;
    }

    let val = phoneAfterCode.match(/.{1,3}/g);
    let formatted = val.join("-");

    const result = code + " " + formatted;

    // console.log(result);

    // console.log(
    //   result,
    //   result.length,
    //   result[result.length - 1],
    //   result[result.length - 2]
    // );

    // console.log("here ", result[result.length - 2]);
    // console.log(result[result.length - 2] === "-");
    // console.log(result[selectionStart - 1]);
    // console.log(result[selectionStart]);
    // console.log(selectionStart - 1);
    // console.log(result.length - 2);

    if (!phone) {
      setStart(selectionStart + code.length + 1);
      setEnd(selectionEnd + code.length + 1);
    } else {
      if (result[selectionStart - 1] === "-" && phone.length <= result.length) {
        setStart(selectionStart + 1);
        setEnd(selectionEnd + 1);
      } else {
        setStart(selectionStart);
        setEnd(selectionEnd);
      }
    }

    setPhone(result);
  };

  // console.log(phone);

  useEffect(() => {
    if (phoneRef.current) {
      phoneRef.current.setSelectionRange(start, end);
    }
  }, [phone]);

  const sendFormHandler = () => {
    dispatch(
      ad({ name, phone, email, city, budget, site, product, comment, status })
    );
  };

  useEffect(() => {
    if (adResult) {
      cleanHandler();
      toastHandler(
        "Ваша заявка успешно принята! Наш менеджер свяжется с вами в ближайшее время."
      );
      dispatch(adSuccess(false));
    }
  }, [adResult, dispatch, toastHandler]);

  const getCountry = async () => {
    const res = await fetch("https://ipapi.co/json/");

    const data = await res.json();

    console.log(res);
    console.log(data);
    setCountryData(data);
  };
  const getDataByPostal = async () => {
    // a160f052618765a8b03aa05e0120bbaa
    // 58160b20-c7a2-11ed-a2e1-c3f4c0c07271
    const res = await fetch(
      `https://app.zipcodebase.com/api/v1/search?apikey=58160b20-c7a2-11ed-a2e1-c3f4c0c07271&codes=03037&country=UA`
    );

    const data = await res.json();

    console.log(res);
    console.log(data);
    // setCountryData(data);
  };

  useEffect(() => {
    getCountry();
    getDataByPostal();
  }, []);

  return (
    <section
      className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}
    >
      <div className={`${Styles.contentWrap}`}>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.title}`}>{t("Ad-header")}</div>
          <div className={`${Styles.paragraph}`}>{t("Ad-description")}</div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.listTitle}`}>{t("Ad-oportunities")}</div>
          <div className={`${Styles.listWrap}`}>
            <div className={`${Styles.listItem}`}>{t("Ad-list-1")}</div>
            <div className={`${Styles.listItem}`}>{t("Ad-list-2")}</div>
            <div className={`${Styles.listItem}`}>{t("Ad-list-3")}</div>
            <div className={`${Styles.listItem}`}>{t("Ad-list-4")}</div>
            <div className={`${Styles.listItem}`}>{t("Ad-list-5")}</div>
            <div className={`${Styles.listItem}`}>{t("Ad-list-6")}</div>
          </div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.bgNote}`}>
            <div className={`${Styles.bgNoteMain}`}>{t("Ad-note-main")}</div>
            <div className={`${Styles.bgNoteOther}`}>{t("Ad-note-other")}</div>
          </div>
        </div>
        <div className={`${Styles.box}`}>
          <div className={`${Styles.formWrap}`}>
            <div className={`${Styles.formTitle}`}>
              {t("Application for advertising")}
            </div>
            <div className={`${Styles.formBox}`}>
              <div className={`${Styles.inputWrap}`}>
                <div className={`${Styles.inputTitle}`}>
                  {t("Your full name")} *
                </div>
                <input
                  type="text"
                  placeholder={t("Name")}
                  className={`${Styles.input} ${
                    adErr?.name ? Styles.inputWithErr : null
                  }`}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (adErr.name) {
                      delete adErr.name;
                      dispatch(adFailure(adErr));
                    }
                  }}
                  value={name}
                />
                {adErr?.name ? (
                  <div className={`${Styles.inputErr}`}>{adErr.name}</div>
                ) : null}
              </div>
              <div className={`${Styles.inputWrap}`}>
                <div className={`${Styles.inputTitle}`}>
                  {t("What town are you from?")}
                </div>
                <input
                  type="text"
                  placeholder={t("Town")}
                  className={`${Styles.input} ${
                    adErr?.city ? Styles.inputWithErr : null
                  }`}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (adErr.city) {
                      delete adErr.city;
                      dispatch(adFailure(adErr));
                    }
                  }}
                  value={city}
                />
                {adErr?.city ? (
                  <div className={`${Styles.inputErr}`}>{adErr.city}</div>
                ) : null}
              </div>
              <div className={`${Styles.inputWrap}`}>
                <div className={`${Styles.inputTitle}`}>
                  {t("Phone number")} *
                </div>
                {/* <CustomPhoneInput
                  changeHandler={changePhoneHandler}
                  inputErr={adErr}
                  action={adFailure}
                  inputValue={phone}
                /> */}
                {countryData && (
                  <input
                    type="tel"
                    placeholder={`${
                      countryData ? countryData.country_calling_code : ""
                    } (_ _ _) _ _ _ - _ _ - _ _`}
                    onChange={handlePhoneInput}
                    value={phone}
                    ref={phoneRef}
                    className={`${Styles.input} ${
                      adErr?.phone ? Styles.inputWithErr : null
                    }`}
                  />
                )}
                {!countryData && (
                  <input
                    type="tel"
                    placeholder={`${
                      countryData ? countryData.country_calling_code : ""
                    } (_ _ _) _ _ _ - _ _ - _ _`}
                    onChange={changePhoneHandler}
                    className={`${Styles.input} ${
                      adErr?.phone ? Styles.inputWithErr : null
                    }`}
                  />
                )}
                {adErr?.phone ? (
                  <div className={`${Styles.inputErr}`}>{adErr.phone}</div>
                ) : null}
              </div>
              <div className={`${Styles.inputWrap}`}>
                <div className={`${Styles.inputTitle}`}>
                  {t("Monthly Budget Forecast")}
                </div>
                <input
                  type="text"
                  placeholder="$0.00"
                  className={`${Styles.input} ${
                    adErr?.budget ? Styles.inputWithErr : null
                  }`}
                  onChange={(e) => {
                    setBudget(e.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (adErr.budget) {
                      delete adErr.budget;
                      dispatch(adFailure(adErr));
                    }
                  }}
                  value={budget}
                />
                {adErr?.budget ? (
                  <div className={`${Styles.inputErr}`}>{adErr.budget}</div>
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
                    adErr?.email ? Styles.inputWithErr : null
                  }`}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (adErr.email) {
                      delete adErr.email;
                      dispatch(adFailure(adErr));
                    }
                  }}
                  value={email}
                />
                {adErr?.email ? (
                  <div className={`${Styles.inputErr}`}>{adErr.email}</div>
                ) : null}
              </div>
              <div className={`${Styles.inputWrap}`}>
                <div className={`${Styles.inputTitle}`}>
                  {t("The site of the company")}
                </div>
                <input
                  type="text"
                  placeholder="domain.com"
                  className={`${Styles.input} ${
                    adErr?.site ? Styles.inputWithErr : null
                  }`}
                  onChange={(e) => {
                    setSite(e.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (adErr.site) {
                      delete adErr.site;
                      dispatch(adFailure(adErr));
                    }
                  }}
                  value={site}
                />
                {adErr?.site ? (
                  <div className={`${Styles.inputErr}`}>{adErr.site}</div>
                ) : null}
              </div>
              <div className={`${Styles.inputWrap} ${Styles.textareaWrap}`}>
                <div className={`${Styles.inputTitle}`}>
                  {t("What will be advertised?")} *
                </div>
                <textarea
                  placeholder={t(
                    "To pass the initial moderation describe in detail the product or service you want to advertise"
                  )}
                  className={`${Styles.textarea} ${
                    adErr?.product ? Styles.textareaWithErr : null
                  }`}
                  onChange={(e) => {
                    setProduct(e.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (adErr.product) {
                      delete adErr.product;
                      dispatch(adFailure(adErr));
                    }
                  }}
                  value={product}
                />
                {adErr?.product ? (
                  <div className={`${Styles.inputErr}`}>{adErr.product}</div>
                ) : null}
              </div>
              <div className={`${Styles.inputWrap} ${Styles.textareaWrap}`}>
                <div className={`${Styles.inputTitle}`}>{t("Comment")}</div>
                <textarea
                  placeholder={t(
                    "If you have any questions or additional wishes, please indicate them in this field"
                  )}
                  className={`${Styles.textarea} ${
                    adErr?.comment ? Styles.textareaWithErr : null
                  }`}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (adErr.comment) {
                      delete adErr.comment;
                      dispatch(adFailure(adErr));
                    }
                  }}
                  value={comment}
                />
                {adErr?.comment ? (
                  <div className={`${Styles.inputErr}`}>{adErr.comment}</div>
                ) : null}
              </div>
            </div>
            <div className={`${Styles.formCheck}`}>
              {/* <input
                type="checkbox"
                className={`${Styles.checkBox}`}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              /> */}
              <div className={`${Styles.checkboxWrap}`}>
                <Checkbox handleCheck={handleCheck} isChecked={status} />
              </div>
              {t(
                "I agree with the rules of the site and the processing of personal data"
              )}
            </div>
            <div
              className={`${Styles.mainBtn}`}
              onClick={() => {
                sendFormHandler();
                // cleanHandler();
              }}
            >
              {t("Submit an application")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ad;
