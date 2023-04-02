import React, {useState} from "react";
import Styles from './styles.module.scss'
import {Icon} from "@iconify/react";
import {useSelector} from "react-redux";

const SubscribeItem = (props) => {
    const {icon, color, note, bgStatus, link} = props;
    const [isHover, setHover] = useState(false);
    const themeModeStatus = useSelector(store => store.main.themeModeStatus);

    return (
        <div
            className={`${Styles.container} ${bgStatus ? Styles.withBg : null} ${themeModeStatus ? Styles.dark : null}`}
            style={{background: !themeModeStatus ? isHover ? bgStatus ? `${color}` : '#ffffff' : bgStatus ? '#ffffff' : `${color}` : `${color}`}}
            onMouseOver={()=>{setHover(true)}}
            onMouseOut={()=>{setHover(false)}}
            onClick={()=>{
                window.open(link, '_blank');
                setHover(false);
            }}
        >
            <div className={`${Styles.imgWrap}`}>
                <Icon icon={icon} className={`${Styles.icon}`} style={isHover ? bgStatus ? {color: '#ffffff'} : {color: color} : bgStatus ? {color: color} : null}/>
            </div>
            {/*<div className={`${Styles.subscribe}`} style={isHover ? bgStatus ? {color: '#ffffff'} : {color: color} : bgStatus ? {color: color} : null}>{subscribe}</div>*/}
            <div className={`${Styles.note}`} style={isHover ? bgStatus ? {color: '#ffffff'} : {color: color} : bgStatus ? {color: color} : null}>{note}</div>
        </div>
    );
};

export default SubscribeItem;