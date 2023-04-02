import React, {useState} from "react";
import Styles from './styles.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getComments, setComments} from "../../store/post/action";
import {Icon} from "@iconify/react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Comments = (props) => {
    const {toastHandler} = props;
    const dispatch = useDispatch();
    let {title} = useParams();
    const { t } = useTranslation();
    const comments =  useSelector(store => store.post.comments);
    const commentsData =  useSelector(store => store.post.commentsData);
    const themeModeStatus = useSelector(store => store.main.themeModeStatus);
    const loginStatus =  useSelector(store => store.main.loginStatus);
    const {total} = comments;

    const [comment, setComment] = useState('');
    const [replyStatus, setReplyStatus] = useState(false);

    const sendCommentHandler = (parentId) =>{
        dispatch(setComments(comment, title.slice(title.lastIndexOf('n') + 1, title.length), parentId));
        setReplyStatus(false);
        toastHandler('Ваш комментарий успешно добавлен и будет доступен на сайте после модерации.');
        setComment('');
    }

    return (
        <section className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}>
            <div className={`${Styles.contentWrap}`}>
                {comments ? <div className={`${Styles.commentsTitle}`}>{t('Comments')} ({total})</div> : null}
                <div className={`${Styles.commentsMainWrap}`}>
                    {commentsData?.length > 0 ? commentsData.map((item, index)=>{
                        return (
                            <div className={`${Styles.commentsMainBox}`} key={'commentsMain' + index}>
                                <div className={`${Styles.commentsMainImgWrap}`}>
                                    <Icon icon='bi-person-fill' className={`${Styles.icon}`}/>
                                </div>
                                <div className={`${Styles.commentsMainNoteBox}`}>
                                    <div className={`${Styles.commentsMainNoteTitleWrap}`}>
                                        <div className={`${Styles.commentsMainNoteUsername}`}>- {item.username}</div>
                                        <div className={`${Styles.commentsMainNoteDate}`}>{item.created_at}</div>
                                    </div>
                                    <div className={`${Styles.commentsMainNoteComment}`}>{item.message}</div>
                                    {loginStatus.status && replyStatus !== item.id ?
                                        <div className={`${Styles.replyBtn}`} onClick={()=>{setReplyStatus(item.id)}}>{t('Reply')}</div>
                                        : null}
                                    {replyStatus === item.id ? <div className={`${Styles.inputWrap}`}>
                                        <div className={`${Styles.inputTitle}`}>{t('Message')} *</div>
                                        <textarea maxLength={255} placeholder={t('Your Comment')} onChange={(e)=>{setComment(e.target.value)}}/>
                                        <div className={`${Styles.sendFormBtn}`} onClick={()=>{sendCommentHandler(item.id)}}>{t('Submit')}</div>
                                        <div className={`${Styles.iconWrap}`} onClick={()=>{setReplyStatus(false)}}>
                                            <Icon icon='bi-x' className={`${Styles.icon}`}/>
                                        </div>
                                    </div> : null}

                                </div>
                                {item.comments.length > 0 ? <div className={`${Styles.commentsOtherWrap}`}>
                                    {item.comments.map((item, index)=>{
                                        return (
                                            <div className={`${Styles.commentsMainBox}`} key={'commentsOther' + index}>
                                                <div className={`${Styles.commentsOtherImgWrap}`}>
                                                    <Icon icon='bi-person-fill' className={`${Styles.icon}`}/>
                                                </div>
                                                <div className={`${Styles.commentsMainNoteBox}`}>
                                                    <div className={`${Styles.commentsMainNoteTitleWrap}`}>
                                                        <div className={`${Styles.commentsMainNoteUsername}`}>- {item.username}</div>
                                                        <div className={`${Styles.commentsMainNoteDate}`}>{item.created_at}</div>
                                                    </div>
                                                    <div className={`${Styles.commentsMainNoteComment}`}>{item.message}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div> : null}
                            </div>
                        )
                    }) : <div className={`${Styles.withoutLogNoteWrap}`}>{t('There are no comments yet, be the first!')}</div>}
                </div>
                {comments?.next_page_url ?
                    <div className={`${Styles.moreCommentsBtn}`} onClick={()=>{dispatch(getComments(false, comments.next_page_url))}}>{t('More Comments')}</div>
                    : null
                }
            </div>
        </section>
    );
};

export default Comments;