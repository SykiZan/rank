import React from "react";
import Moment from "react-moment";
import 'moment/locale/ru';
import 'moment/locale/en-gb';
import {useSelector} from "react-redux";

const Date = (props) => {
    const {data} = props;
    const currentLng = useSelector(store => store.main.lang);

    return (
        <Moment format={'ll'} locale={currentLng}>
            {data}
        </Moment>
    );
};

export default Date;