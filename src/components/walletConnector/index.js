import React from "react";
import Styles from './styles.module.scss'
import {useSelector} from "react-redux";
// import metamaskIcon from '../../theme/assets/svg/metamask.svg';
// import binanceWallet from '../../theme/assets/svg/binanceWallet.svg';
import daoIcon from '../../theme/assets/svg/daoIcon.svg';
// import coinBaseWallet from '../../theme/assets/svg/coinBaseWallet.svg';
// import trustWallet from '../../theme/assets/svg/trustWallet.svg';
// import walletConnect from '../../theme/assets/svg/walletConnect.svg';
// import opera from '../../theme/assets/svg/opera.svg';
import {Icon} from "@iconify/react";
// import walletConnectHandler from "../../helpers/walletConnectHandler";
// import {login} from "../../store/main/action";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const WalletConnector = (props) => {
    const {display, boxEvent} = props;
    const { t } = useTranslation();
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const themeModeStatus = useSelector(store => store.main.themeModeStatus);

    // const walletBtnHandler = (type) =>{
    //     walletConnectHandler(type, dispatch, login, boxEvent);
    // }

    return display ? (
        <section className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}>
            <div className={`${Styles.contentWrap}`}>
                <div className={`${Styles.titleWrap}`}>
                    <div className={`${Styles.titleBox}`}>
                        <div className={`${Styles.title}`}>
                            {t('Authorization')}
                        </div>
                        <div className={`${Styles.closeBtn}`} onClick={()=>{boxEvent(false)}}>
                            <Icon icon='bi-x' className={`${Styles.icon}`}/>
                        </div>
                    </div>
                </div>
                <div className={`${Styles.walletBox}`}>
                    <div
                        className={`${Styles.wallet}`}
                        onClick={()=>{
                            navigate('/sign-up');
                            boxEvent(false);
                        }}
                    >
                        <div className={`${Styles.walletIconWrap} ${Styles.walletIconWrapMagic}`}>
                            <img src={daoIcon} alt="dao register"/>
                        </div>
                        <div className={`${Styles.walletName}`}>{t('Sign Up')}</div>
                    </div>
                    <div
                        className={`${Styles.wallet}`}
                        onClick={()=>{
                            navigate('/sign-in');
                            boxEvent(false);
                        }}
                    >
                        <div className={`${Styles.walletIconWrap} ${Styles.walletIconWrapMagic}`}>
                            <img src={daoIcon} alt="dao login"/>
                        </div>
                        <div className={`${Styles.walletName}`}>{t('Sign In')}</div>
                    </div>
                    {/*<div className={`${Styles.wallet}`} onClick={()=>{walletBtnHandler('metamask')}}>*/}
                    {/*    <div className={`${Styles.walletIconWrap}`}>*/}
                    {/*        <img src={metamaskIcon} alt="Metamask"/>*/}
                    {/*    </div>*/}
                    {/*    <div className={`${Styles.walletName}`}>Metamask</div>*/}
                    {/*</div>*/}
                    {/*<div className={`${Styles.wallet}`} onClick={()=>{walletBtnHandler('binanceWallet')}}>*/}
                    {/*    <div className={`${Styles.walletIconWrap}`}>*/}
                    {/*        <img src={binanceWallet} alt="Binance Wallet"/>*/}
                    {/*    </div>*/}
                    {/*    <div className={`${Styles.walletName}`}>Binance Wallet</div>*/}
                    {/*</div>*/}
                    {/*<div className={`${Styles.wallet}`} onClick={()=>{walletBtnHandler('walletConnect')}}>*/}
                    {/*    <div className={`${Styles.walletIconWrap}`}>*/}
                    {/*        <img src={walletConnect} alt="Wallet Connect"/>*/}
                    {/*    </div>*/}
                    {/*    <div className={`${Styles.walletName}`}>Wallet Connect</div>*/}
                    {/*</div>*/}
                    {/*<div className={`${Styles.wallet}`} onClick={()=>{walletBtnHandler('opera')}}>*/}
                    {/*    <div className={`${Styles.walletIconWrap}`}>*/}
                    {/*        <img src={opera} alt="Opera"/>*/}
                    {/*    </div>*/}
                    {/*    <div className={`${Styles.walletName}`}>Opera</div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </section>
    ) : null;
};

export default WalletConnector;

