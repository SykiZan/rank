import React from "react";
import Styles from './styles.module.scss'
import {useDispatch, useSelector} from "react-redux";

const Toast = () => {
    const dispatch = useDispatch();
    const themeModeStatus = useSelector(store => store.main.themeModeStatus);


    return (
        <section className={`${Styles.container}`}>
            <div className={`${Styles.contentWrap}`}>
                Toast
            </div>
        </section>
    );
};

export default Toast;