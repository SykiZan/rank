import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import ThemeSwitcher from "../_UI/themeSwitcher";
import WalletConnector from "../walletConnector";
import { getCabinetLink } from "../../store/main/action";
// import metamaskIcon from '../../theme/assets/svg/metamask.svg';
// import binanceWalletIcon from '../../theme/assets/svg/binanceWallet.svg';
import LangSwitcher from "../langSwitcher";
import { useTranslation } from "react-i18next";

const TopHeader = () => {
  // const loginStatus =  useSelector(store => store.main.loginStatus);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);
  const magicToken = useSelector((store) => store.main.magicToken);
  const magicName = useSelector((store) => store.main.magicName);
  const cabinetLink = useSelector((store) => store.main.cabinetLink);

  const [logBoxStatus, setLogBoxStatus] = useState(false);
  // const [checkBoxStatus, setCheckBoxStatus] = useState(themeModeStatus);
  // const iconHandler = (type) =>{
  //     switch (type){
  //         case 'metamask':
  //             return metamaskIcon
  //         case 'binanceWallet':
  //             return binanceWalletIcon
  //         default:
  //             return null
  //     }
  // }

  const cabinetHandler = () => dispatch(getCabinetLink());

  useEffect(() => {
    if (cabinetLink) {
      window.open(cabinetLink, "_blank");
    }
  }, [cabinetLink]);

  return (
    <section
      className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}
    >
      <div className={`${Styles.contentWrap}`}>
        <div className={`${Styles.socialWrap}`}>
          <div
            className={`${Styles.socialBtn}`}
            onClick={() => {
              window.open("https://t.me/magicrank", "_blank");
            }}
          >
            <Icon icon="bi-telegram" className={`${Styles.icon}`} />
          </div>
          <div
            className={`${Styles.socialBtn}`}
            onClick={() => {
              window.open("http://twitter.com/magic_rank", "_blank");
            }}
          >
            <Icon icon="bi-twitter" className={`${Styles.icon}`} />
          </div>
          <div
            className={`${Styles.socialBtn}`}
            onClick={() => {
              window.open("https://www.reddit.com/user/magic_rank", "_blank");
            }}
          >
            <Icon icon="bi-reddit" className={`${Styles.icon}`} />
          </div>
          <div
            className={`${Styles.socialBtn}`}
            onClick={() => {
              window.open(
                "https://www.youtube.com/channel/UCimWmf1VH3xhH1ql1X2yhqw?sub_confirmation=1",
                "_blank"
              );
            }}
          >
            <Icon icon="bi-youtube" className={`${Styles.icon}`} />
          </div>
          {/*<div className={`${Styles.socialBtn}`}>*/}
          {/*    <Icon icon='bi-youtube' className={`${Styles.icon}`}/>*/}
          {/*</div>*/}
          {/*<div className={`${Styles.socialBtn} ${Styles.socialBtnDesc}`}>*/}
          {/*    <Icon icon='bi-pinterest' className={`${Styles.icon}`}/>*/}
          {/*</div>*/}
          {/*<div className={`${Styles.socialBtn} ${Styles.socialBtnDesc}`}>*/}
          {/*    <Icon icon='bi-vimeo' className={`${Styles.icon}`}/>*/}
          {/*</div>*/}
        </div>
        <div className={`${Styles.subNavWrap}`}>
          {/*<div className={`${Styles.subNavBtn}`}>*/}
          {/*    Contact*/}
          {/*</div>*/}
          {/*<div className={`${Styles.subNavBtn}`}>*/}
          {/*    Donation*/}
          {/*</div>*/}
          <LangSwitcher />
        </div>
        <div className={`${Styles.optionWrap}`}>
          {/*<div className={`${Styles.optionBtn}`}>*/}
          {/*    Currency: USD*/}
          {/*</div>*/}
          {/*<div className={`${Styles.optionBtn}`}>*/}
          {/*    Wishlist: 12*/}
          {/*</div>*/}
        </div>
        <ThemeSwitcher />
        <div className={`${Styles.authorizationWrap}`}>
          <div
            className={`${Styles.authorizationBtn}`}
            onClick={() => {
              if (magicToken && magicName) {
                setLogBoxStatus(false);
              } else {
                setLogBoxStatus(!logBoxStatus);
              }
            }}
          >
            {magicToken && magicName ? null : (
              <Icon icon="bi-lock-fill" className={`${Styles.icon}`} />
            )}
            {magicToken && magicName ? (
              <div
                className={`${Styles.authorizationNote}`}
                onClick={() => {
                  cabinetHandler();
                }}
              >
                <div className={`${Styles.authorizationNoteSuccess}`}>
                  <div className={`${Styles.authorizationNoteSuccessIconWrap}`}>
                    <Icon icon="bi-person" className={`${Styles.icon}`} />
                  </div>
                  <div className={`${Styles.authorizationNoteSuccessWallet}`}>
                    {magicName}
                  </div>
                </div>
              </div>
            ) : (
              <div className={`${Styles.authorizationNote}`}>
                {t("Authorization")}
              </div>
            )}
          </div>
          <WalletConnector display={logBoxStatus} boxEvent={setLogBoxStatus} />
          {/*<MetaMask display={logBoxStatus} boxEvent={setLogBoxStatus}/>*/}
        </div>
      </div>
    </section>
  );
};

export default TopHeader;
