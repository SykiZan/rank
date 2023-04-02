import React from "react";
import {useSelector} from "react-redux";

const Like = (props) => {
    const {data} = props;
    const currentLng = useSelector(store => store.main.lang);

    const contentHandler = () =>{
        if (currentLng === 'ru'){
            if (data === 1){
                return data + ' Лайк'
            } else {
                return data + ' Лайков'
            }
        }
        if (currentLng === 'en'){
            if (data === 1){
                return data + ' Like'
            } else {
                return data + ' Likes'
            }
        }
    }

    return (
        <span>
            {contentHandler()}
        </span>
    );
};

export default Like;