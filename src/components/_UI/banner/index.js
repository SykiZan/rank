import React from "react";
import Styles from './styles.module.scss'
import {useSelector} from "react-redux";

const Banner = (props) => {
    const {img, pos, max, withBg} = props;
    const themeModeStatus = useSelector(store => store.main.themeModeStatus);

    return (
        <section className={`${Styles.container} ${pos === 'left' ? Styles.left : Styles.right} ${themeModeStatus ? Styles.dark : null}`}>
            <div className={`${Styles.contentWrap} ${withBg ? Styles.withBg : null}`}>
                <img src={img} alt="banner" className={`${max ? Styles.maxImg : null}`}/>
            </div>
        </section>
    );
};

export default Banner;