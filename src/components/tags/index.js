import React from "react";
import Styles from './styles.module.scss'
import {useSelector} from "react-redux";

const Tags = () => {
    const tags =  useSelector(store => store.main.tags);
    const themeModeStatus = useSelector(store => store.main.themeModeStatus);

    return (
        <section className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}>
            <div className={`${Styles.contentWrap}`}>
                <div className={`${Styles.mainTitle}`}><span>Tags</span></div>
                <div className={`${Styles.contentBox}`}>
                    {tags ? tags.map((item, index)=>{
                        if (index >= 12){
                            return null
                        } else {
                            return (
                                <div className={`${Styles.contentBoxItem}`} key={'tags' + index}>{item.name}</div>
                            )
                        }
                    }) : null}
                </div>
            </div>
        </section>
    );
};

export default Tags;