import React from "react";
import Styles from "../../fullNews/styles.module.scss";
import {Icon} from "@iconify/react";
import {useDispatch} from "react-redux";
import {addNewLike} from "../../../store/post/action";

const LikeBtn = (props) => {
    const {id} = props;
    const dispatch = useDispatch();

    const newsLikeHandler = () =>{
        dispatch(addNewLike(id));
    }

    return (
        <div className={`${Styles.absLikeWrap}`} onClick={()=>{newsLikeHandler()}}>
            <Icon icon='bi-hand-thumbs-up' className={`${Styles.icon}`}/>
        </div>
    );
};

export default LikeBtn;