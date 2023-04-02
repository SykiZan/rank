import React, {useState} from "react";
import Styles from './styles.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setComments} from "../../store/post/action";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

const CommentsForm = (props) => {
    const {toastHandler} = props;
    let {title} = useParams();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const themeModeStatus = useSelector(store => store.main.themeModeStatus);
    // const loginStatus =  useSelector(store => store.main.loginStatus);
    const magicToken =  useSelector(store => store.main.magicToken);
    const magicName =  useSelector(store => store.main.magicName);

    const [comment, setComment] = useState('');

    const sendCommentHandler = () =>{
        dispatch(setComments(comment, title.slice(title.lastIndexOf('n') + 1, title.length)));
        toastHandler('Ваш комментарий успешно добавлен и будет доступен на сайте после модерации.');
        setComment('');
    }

    return (
        <section className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}>
            <div className={`${Styles.contentWrap}`}>
                <div className={`${Styles.title}`}><span>{t('Leave')}</span> {t('Comment')}</div>
                <div className={`${Styles.inputBox}`}>
                    {/*<div className={`${Styles.inputWrap}`}>*/}
                    {/*    <div className={`${Styles.inputTitle}`}>full name*</div>*/}
                    {/*    <input type="text" placeholder='Your name*'/>*/}
                    {/*</div>*/}
                    {/*<div className={`${Styles.inputWrap}`}>*/}
                    {/*    <div className={`${Styles.inputTitle}`}>Email*</div>*/}
                    {/*    <input type="text" placeholder='Your email address here*'/>*/}
                    {/*</div>*/}
                    {/*<div className={`${Styles.inputWrap}`}>*/}
                    {/*    <div className={`${Styles.inputTitle}`}>website</div>*/}
                    {/*    <input type="text" placeholder='Your website url'/>*/}
                    {/*</div>*/}
                    {/*<div className={`${Styles.inputWrap}`}>*/}
                    {/*    <div className={`${Styles.inputTitle}`}>Subject</div>*/}
                    {/*    <input type="text" placeholder='Write subject here'/>*/}
                    {/*</div>*/}
                    {magicToken && magicName ?
                        <div className={`${Styles.inputWrap}`}>
                            <div className={`${Styles.inputTitle}`}>{t('Message')} *</div>
                            <textarea maxLength={255} value={comment} placeholder={t('Your Comment')} onChange={(e)=>{setComment(e.target.value)}}/>
                        </div>
                        : null}
                </div>
                {magicToken && magicName ?
                    <div className={`${Styles.sendFormBtn}`} onClick={()=>{sendCommentHandler()}}>{t('Submit')}</div> :
                    <div className={`${Styles.loginNote}`}>{t('Sign in to leave a comment')}</div>
                }
            </div>
        </section>
    );
};

export default CommentsForm;