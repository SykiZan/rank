import React from "react";
import Styles from './styles.module.scss'
import {useNavigate} from "react-router-dom";
import logoEN from '../../theme/assets/svg/magic_logotype_en.svg';
import logoRU from '../../theme/assets/svg/magic_logotype_ru.svg';
import emailIcon from '../../theme/assets/svg/magic_email.svg';
import starBg from '../../theme/assets/other/news_star_bg_footer.png';
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

const Footer = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const currentLng = useSelector(store => store.main.lang);

    return (
        <section className={`${Styles.container}`} style={{ backgroundImage: `url(${starBg})` }}>
            <div className={`${Styles.contentWrap}`}>
                <div className={`${Styles.logoWrap}`}>
                    <div className={`${Styles.imgWrap}`} onClick={()=>{navigate('/')}}>
                        <img src={currentLng === 'en' ? logoEN : logoRU} alt="logotype"/>
                    </div>
                    <div className={`${Styles.emailWrap}`}>
                        <div className={`${Styles.emailIconWrap}`}>
                            <img src={emailIcon} alt="email icon"/>
                        </div>
                        <div className={`${Styles.email}`}>support@magic-rank.com</div>
                    </div>
                </div>
                <div className={`${Styles.listWrap}`}>
                    <div className={`${Styles.listTitle}`}>Magic DAO</div>
                    <div className={`${Styles.listBox}`}>
                        <div className={`${Styles.listItem}`}>Magic Swap</div>
                        <div className={`${Styles.listItem}`}>Magic Academy</div>
                        <div className={`${Styles.listItem}`}>Magic Wallet</div>
                        <div className={`${Styles.listItem}`}>Fratrum</div>
                    </div>
                </div>
                <div className={`${Styles.listWrap}`}>
                    <div className={`${Styles.listTitle}`}>Magic Rank</div>
                    <div className={`${Styles.listBox}`}>
                        <div className={`${Styles.listItem}`} onClick={()=>{navigate('/terms-and-conditions')}}>{t('Terms and Conditions')}</div>
                        <div className={`${Styles.listItem}`} onClick={()=>{navigate('/editorial-policy')}}>{t('Editorial policy')}</div>
                        <div className={`${Styles.listItem}`} onClick={()=>{navigate('/privacy-policy')}}>{t('Privacy Policy')}</div>
                    </div>
                </div>
                <div className={`${Styles.listWrap}`}>
                    <div className={`${Styles.listTitle}`}>{t('About Us')}</div>
                    <div className={`${Styles.listBox}`}>
                        <div className={`${Styles.listItem}`} onClick={()=>{navigate('/company')}}>{t('Company')}</div>
                        <div className={`${Styles.listItem}`} onClick={()=>{navigate('/ad')}}>{t('Advertising')}</div>
                        <div className={`${Styles.listItem}`}>{t('Jobs')}</div>
                    </div>
                </div>
            </div>
            <div className={`${Styles.copyrightWrap}`}>Copyright@2022 MagicRank Inc.</div>
        </section>
    );
};

export default Footer;