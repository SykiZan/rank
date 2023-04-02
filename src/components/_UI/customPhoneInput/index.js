import React, { useState } from "react";
import Styles from "./styles.module.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { adFailure } from "../../../store/main/action";

const CustomPhoneInput = (props) => {
  const { changeHandler, inputErr, inputValue } = props;
  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);

  const [code, setCode] = useState("");

  const dispatch = useDispatch();

  const [userCountry, setUserCountry] = useState(false);
  const getCountry = async () => {
    const request = await fetch("https://ipinfo.io/json?token=18e39379c11ce7");
    const json = await request.json();
    let correctCountry = json.country.toLowerCase();
    setUserCountry(correctCountry);
  };
  getCountry();

  return (
    <section
      className={`${Styles.container} ${themeModeStatus ? Styles.dark : null} ${
        inputErr?.phone ? Styles.containerErr : null
      }`}
    >
      <PhoneInput
        country={userCountry ? userCountry : "default"}
        containerClass={"inputWrap"}
        inputClass={"inputWrapInput"}
        // alwaysDefaultMask={true}

        masks={"(....)- ...-...."}
        countryCodeEditable={false}
        value={inputValue === "" ? code : inputValue}
        onChange={(phone, data) => {
          changeHandler({ phone });
          setCode(data.dialCode);
        }}
        onKeyDown={() => {
          if (inputErr.phone) {
            delete inputErr.phone;
            dispatch(adFailure(inputErr));
          }
        }}
      />
    </section>
  );
};

export default CustomPhoneInput;
