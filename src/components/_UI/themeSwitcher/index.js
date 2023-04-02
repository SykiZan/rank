import React from "react";
import Styles from './styles.module.scss'
import {setThemeModeStatus} from "../../../store/main/action";
import {useDispatch, useSelector} from "react-redux";
import {Icon} from "@iconify/react";

const ThemeSwitcher = () => {
    const dispatch = useDispatch();
    const themeModeStatus = useSelector(store => store.main.themeModeStatus);


    const themeHandler = (status) =>{
        dispatch(setThemeModeStatus(status));
        localStorage.setItem('mode', JSON.stringify(status));
    }

    return (
        <section className={`${Styles.container}`}>
            <div className={`${Styles.contentWrap}`}>
                <Icon icon='bi-brightness-high-fill' className={`${Styles.icon}`} onClick={()=>{themeHandler(false)}}/>
                <div className={`${Styles.themeSwitcher}`}>
                    <label className={`${Styles.switch}`}>
                        <input
                            className={`${Styles.input}`}
                            type="checkbox"
                            onChange={(e)=>{
                                themeHandler(e.target.checked);
                            }}
                            checked={themeModeStatus ? 'checked' : false}
                        />
                        <span className={`${Styles.slider} ${Styles.round}`} style={{backgroundColor: themeModeStatus ? '#161C2E' : '#2C89FF'}}/>
                    </label>
                </div>
                <Icon icon='bi-moon-stars-fill' className={`${Styles.icon}`} onClick={()=>{themeHandler(true)}}/>
            </div>
        </section>
    );
};

export default ThemeSwitcher;