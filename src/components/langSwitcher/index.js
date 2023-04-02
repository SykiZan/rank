import React from "react";
import i18n from "i18next";
import Styles from './styles.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentLang} from "../../store/main/action";
import {useLocation} from "react-router-dom";


const LangSwitcher = () => {
    const location = useLocation();
    // const [currentLng, setCurrentLng] = useState(i18n.language);
    const dispatch = useDispatch();
    const currentLng = useSelector(store => store.main.lang);
    const themeModeStatus = useSelector(store => store.main.themeModeStatus);

    const languages = ['ru', 'en'];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        dispatch(setCurrentLang(lng))
    }


    return (
        <section
            className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}
            style={new URLSearchParams(location.search).get('enable') ? {display: 'initial'} : {display: 'none'}}
        >
            <div className={`${Styles.contentWrap}`}>
                {languages.map((item, index)=>{
                    if (index === languages.length - 1){
                        return (
                            <div
                                className={`${Styles.contentItem} ${currentLng === item ? Styles.contentItemActive : null}`}
                                onClick={()=>{changeLanguage(item)}}
                                key={'langSwitcher' + index}
                            >
                                {item}
                            </div>
                        )
                    } else {
                        return (
                            <span key={'langSwitcher' + index}>
                                <div
                                    className={`${Styles.contentItem} ${currentLng === item ? Styles.contentItemActive : null}`}
                                    onClick={()=>{changeLanguage(item)}}
                                >
                                    {item}
                                </div>
                                <div className={`${Styles.sep}`}/>
                            </span>
                        )
                    }
                })}
                {/*<div*/}
                {/*    className={`${Styles.contentItem} ${currentLng === 'ru' ? Styles.contentItemActive : null}`}*/}
                {/*    onClick={()=>{changeLanguage('ru');}}*/}
                {/*>*/}
                {/*    RU*/}
                {/*</div>*/}
                {/*<div*/}
                {/*    className={`${Styles.contentItem} ${currentLng === 'en' ? Styles.contentItemActive : null}`}*/}
                {/*    onClick={()=>{changeLanguage('en');}}*/}
                {/*>*/}
                {/*    EN*/}
                {/*</div>*/}
            </div>
        </section>
    );
};

export default LangSwitcher;