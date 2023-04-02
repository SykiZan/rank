import React from "react";
import Styles from './styles.module.scss';
import DatePicker from 'sassy-datepicker';
import {useSelector} from "react-redux";
// import 'react-calendar/dist/Calendar.css';

const Calendar = () => {
    const themeModeStatus = useSelector(store => store.main.themeModeStatus);

    const onChange = (date) => {
        console.log(date.toString());
    };

    return (
        <section className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}>
            <DatePicker onChange={onChange} minDate={new Date()} maxDate={new Date()}/>
        </section>
    );
};

export default Calendar;