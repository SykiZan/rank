import React, {useState} from "react";
import Moment from 'react-moment';
import Styles from './styles.module.scss';
import {useSelector} from "react-redux";

import {
    AreaSeries,
    XYPlot,
    HorizontalGridLines,
    VerticalGridLines,
    makeWidthFlexible,
    GradientDefs,
    MarkSeries
} from 'react-vis';
import {useTranslation} from "react-i18next";


const Graph = (props) => {
    const {data, rate} = props;
    const themeModeStatus = useSelector(store => store.main.themeModeStatus);
    const { t } = useTranslation();
    const FlexibleXYPlot = makeWidthFlexible(XYPlot);
    const [hint, setHint] = useState(false);



    const correctDataHandler = (data) =>{
        let correctData = [];
        if (data){
            if (rate >= 100){
                data.forEach((item)=>{
                    correctData.push({x: new Date(item.date).getTime(), y: Number(item.rate).toFixed(2) * 1})
                })
            } else {
                data.forEach((item)=>{
                    correctData.push({x: new Date(item.date).getTime(), y: Number(item.rate)})
                })
            }

            return correctData
        }
    }

    const hintDataHandler = (data) =>{
        setHint(data);
    }

    return (
        <section className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}>
            {hint ?
                <div className={`${Styles.customHint}`}>
                    <div className={`${Styles.customHintContentWrap}`}>
                        <div className={`${Styles.customHintBox}`}>
                            <div className={`${Styles.customHintBoxName}`}>{t('Date')}:</div>
                            <div className={`${Styles.customHintBoxValue}`}><Moment format="DD.MM.YYYY HH:mm" locale="ru">{hint.x}</Moment></div>
                        </div>
                        <div className={`${Styles.customHintBox}`}>
                            <div className={`${Styles.customHintBoxName}`}>{t('Price')}:</div>
                            <div className={`${Styles.customHintBoxValue}`}>{hint.y} USD</div>
                        </div>
                    </div>
                </div>
                : null}

            <FlexibleXYPlot xType="time"  height={150} showMarks={true} >
                {hint ? <MarkSeries
                    className="mark-series-example"
                    size="3"
                    color={themeModeStatus ? "#ffffff" : "#2C89FF"}
                    data={[hint]}/> : null}

                <GradientDefs>
                    {themeModeStatus ?
                        <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#29C1DD"/>
                            <stop offset="100%" stopColor="#128DB9"/>
                        </linearGradient>:
                        <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="rgba(41, 193, 221, 0.382567)"/>
                            <stop offset="100%" stopColor="rgba(18, 141, 185, 0.0001)"/>
                        </linearGradient>
                    }
                </GradientDefs>
                <HorizontalGridLines/>
                <VerticalGridLines/>
                <AreaSeries
                    color={'url(#CoolGradient)'}
                    onNearestX={value => {hintDataHandler(value)}}
                    data={correctDataHandler(data)}
                    onMouseLeave={()=>{setHint(false)}}
                />
            </FlexibleXYPlot>
        </section>
    );
};

export default Graph;