import React from "react";
import {useSelector} from "react-redux";

const View = (props) => {
    const {data} = props;
    const currentLng = useSelector(store => store.main.lang);

    const contentHandler = () =>{
        if (currentLng === 'ru'){
            if (data === 1){
                return ' Просмотр ' + data
            } else {
                return ' Просмотров ' + data
            }
        }
        if (currentLng === 'en'){
            if (data === 1){
                return ' View ' + data
            } else {
                return ' Views ' + data
            }
        }

        if (data === 1){
            return ' Просмотр ' + data
        } else {
            return ' Просмотров ' + data
        }
    }

    return (
        <span>
            {contentHandler()}
        </span>
    );
};

export default View;