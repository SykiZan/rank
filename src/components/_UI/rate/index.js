import React from "react";
import Styles from './styles.module.scss'
import {Icon} from "@iconify/react";

const Rate = (props) => {
    const {rate, color} = props;

    const rateHandler = (rate) =>{
        const bgHandler = (place) =>{
            if (rate >= place){
                return 'bi-star-fill'
            } else {
                return 'bi-star'
            }
        }
        const data = <div className={`${Styles.rateWrap}`}>
            <Icon icon={bgHandler(1)} className={`${Styles.icon}`} style={{color: color}}/>
            <Icon icon={bgHandler(2)} className={`${Styles.icon}`} style={{color: color}}/>
            <Icon icon={bgHandler(3)} className={`${Styles.icon}`} style={{color: color}}/>
            <Icon icon={bgHandler(4)} className={`${Styles.icon}`} style={{color: color}}/>
            <Icon icon={bgHandler(5)} className={`${Styles.icon}`} style={{color: color}}/>
        </div>
        return data
    }
    return (
        <section className={`${Styles.container}`}>
            <div className={`${Styles.contentWrap}`}>
                {rateHandler(rate)}
            </div>
        </section>
    );
};

export default Rate;