import React, {useState} from "react";
import Styles from './styles.module.scss';
import {useDispatch, useSelector} from "react-redux";
import Graph from "../_UI/graph";
import {sortCrypto} from "../../store/main/action";
import { isSafari } from 'react-device-detect';
import {useTranslation} from "react-i18next";


const CryptoWidget = () => {
    const themeModeStatus = useSelector(store => store.main.themeModeStatus);
    const crypto = useSelector(store => store.main.crypto);

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [currentRow, setCurrentRow] = useState(false);
    const [sortStatus, setSortStatus] = useState('');

    // console.log(crypto);

    const graphBtnHandler = (index) =>{
        if (index === currentRow){
            setCurrentRow(false);
        } else {
            setCurrentRow(index);
        }
    }

    const filter = (status) =>{
        let result;
        if (status){
            setSortStatus('up');
            result = crypto.sort(function(a,b){
                return  b.percent * 1 - a.percent * 1
            })
        } else {
            setSortStatus('down');
            result = crypto.sort(function(a,b){
                return a.percent * 1 - b.percent * 1
            })
        }

        dispatch(sortCrypto(result));
    }

    return (
        <section className={`
            ${Styles.container} 
            ${themeModeStatus ? Styles.dark : null}
            ${isSafari ? Styles.safari : null}
        `}>
            <div className={`${Styles.contentWrap}`}>
                <div className={`${Styles.titleRow}`}>
                    <div className={`${Styles.title}`}>{t('Market')}</div>
                    <div className={`${Styles.sort} ${sortStatus === 'up' ? Styles.sortActive : null}`} onClick={()=>{filter(true)}}>{t('Show growth')}</div>
                    <div className={`${Styles.sort} ${sortStatus === 'down' ? Styles.sortActive : null}`} onClick={()=>{filter(false)}}>{t('Lose value')}</div>
                </div>
                <div className={`${Styles.cryptoBox}`}>
                    <div className={`${Styles.cryptoBoxTitleRow}`}>
                        <div className={`${Styles.cryptoBoxTitle}`}>{t('Trading pair')}</div>
                        <div className={`${Styles.cryptoBoxTitle}`}>{t('Price')}</div>
                        <div className={`${Styles.cryptoBoxTitle}`}>{t('Changes in')} %</div>
                    </div>
                    {crypto ? crypto.map((item, index)=>{
                        return(
                                <div
                                    className={`${Styles.cryptoBoxRow} ${currentRow === index ? Styles.cryptoBoxRowActive : null}`}
                                    key={'cryptoBoxRow' + index}
                                >
                                    <div className={`${Styles.cryptoBoxRowContent}`}>
                                        <div className={`${Styles.nameWrap}`}>
                                            <div className={`${Styles.iconWrap}`}>
                                                <i className={`cf cf-${item.code.toLowerCase()}`}/>
                                                {/*<img src={testIcon} alt={item.name}/>*/}
                                            </div>
                                            <div className={`${Styles.codeWrap}`}>
                                                <div className={`${Styles.code}`}>{item.code}<span className={`${Styles.codeType}`}>USDT</span></div>
                                                <div className={`${Styles.subCode}`}>{item.name}</div>
                                            </div>
                                        </div>
                                        <div className={`${Styles.rate}`}>{Number(item.rate).toFixed(2)}</div>
                                        <div
                                            className={`${Styles.percent} ${Number(item.percent) >= 0 ? Styles.percentUp : Styles.percentDown }`}
                                        >
                                            {Number(item.percent) >= 0 ? '+' : null}{Number(item.percent).toFixed(2)} %
                                        </div>
                                        <div className={`${Styles.graphBtn}`} onClick={()=>{graphBtnHandler(index)}}>
                                            <div className={`${Styles.iconWrap}`}>
                                                <div className={`${Styles.line}`}/>
                                                <div className={`${Styles.line}`}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${Styles.cryptoBoxRowGraph}`}>
                                        <Graph data={item.history} rate={item.rate}/>
                                    </div>
                                </div>
                            )
                    }) : null}
                </div>
            </div>
        </section>
    );
};

export default CryptoWidget;