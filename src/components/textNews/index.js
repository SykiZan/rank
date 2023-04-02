import React from "react";
import Styles from './styles.module.scss'
import {Icon} from "@iconify/react";
import {useSelector} from "react-redux";
import Moment from "react-moment";
import translite from "../../helpers/urlConverter";
import {useNavigate} from "react-router-dom";
import DOMPurify from "dompurify";
// import Like from "../_UI/like";

const TextNews = (props) => {
    const {content} = props;
    const navigate = useNavigate();

    const themeModeStatus = useSelector(store => store.main.themeModeStatus);
    const categoriesNews = useSelector(store => store.main.categoriesNews);

    const postLinkHandler = (title, id) =>{
        const correctUrl = translite(title, id);
        navigate(`/${correctUrl}`);
    }

    return (
        <section className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}>
            <div className={`${Styles.contentWrap}`}>
                {categoriesNews ?
                    <>
                        {categoriesNews[content.start] ?
                            <div
                                className={`${Styles.mainBox}`}
                                onClick={()=>{postLinkHandler(categoriesNews[content.start].title, categoriesNews[content.start].id)}}
                            >
                                <div className={`${Styles.imgWrap}`}>
                                    <img src={categoriesNews[content.start].picture} alt={categoriesNews[content.start].title}/>
                                    <div
                                        className={`${Styles.mainCategory}`}
                                        style={{background: `${categoriesNews[content.start].category.color}`}}
                                    >
                                        {categoriesNews[content.start].category.name}
                                    </div>
                                </div>
                                <div className={`${Styles.mainTitle}`}>{categoriesNews[content.start].title}</div>
                                <div className={`${Styles.statWrap}`}>
                                    <div className={`${Styles.date}`}>
                                        <div className={`${Styles.iconWrap}`}>
                                            <Icon icon='bi-clock' className={`${Styles.icon}`}/>
                                        </div>
                                        <div className={`${Styles.dateContent}`}>
                                            <Moment format='ll'>
                                                {categoriesNews[content.start].date}
                                            </Moment>
                                        </div>
                                    </div>
                                    <div className={`${Styles.likes}`}>
                                        <div className={`${Styles.iconWrap}`}>
                                            <Icon icon='bi-hand-thumbs-up' className={`${Styles.icon}`}/>
                                        </div>
                                        <div className={`${Styles.likesContent}`}>
                                            {categoriesNews[content.start].likes_count}
                                            {/*<Like data={categoriesNews[content.start].likes_count}/>*/}
                                        </div>
                                    </div>
                                </div>
                                <div className={`${Styles.mainDescription}`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(categoriesNews[content.start].content)}}/>
                                {/*<div className={`${Styles.authorWrap}`}>*/}
                                {/*    <div className={`${Styles.nameWrap}`}>*/}
                                {/*        <div className={`${Styles.authorImgWrap}`}>*/}
                                {/*            <img src={categoriesNews[content.start].picture} alt="author photography"/>*/}
                                {/*        </div>*/}
                                {/*        <div className={`${Styles.authorNameWrap}`}>Naeem Khan</div>*/}
                                {/*    </div>*/}
                                {/*    <div className={`${Styles.statisticWrap}`}>*/}
                                {/*        <div className={`${Styles.statisticWrapItem}`}>*/}
                                {/*            <div className={`${Styles.statisticWrapItemIconWrap}`}>*/}
                                {/*                <Icon icon='bi-eye' className={`${Styles.icon}`}/>*/}
                                {/*            </div>*/}
                                {/*            <div className={`${Styles.statisticWrapItemCount}`}>2369</div>*/}
                                {/*        </div>*/}
                                {/*        <div className={`${Styles.statisticWrapItem}`}>*/}
                                {/*            <div className={`${Styles.statisticWrapItemIconWrap}`}>*/}
                                {/*                <Icon icon='bi-heart' className={`${Styles.icon}`}/>*/}
                                {/*            </div>*/}
                                {/*            <div className={`${Styles.statisticWrapItemCount}`}>530</div>*/}
                                {/*        </div>*/}
                                {/*        <div className={`${Styles.statisticWrapItem}`}>*/}
                                {/*            <div className={`${Styles.statisticWrapItemIconWrap}`}>*/}
                                {/*                <Icon icon='bi-chat-text' className={`${Styles.icon}`}/>*/}
                                {/*            </div>*/}
                                {/*            <div className={`${Styles.statisticWrapItemCount}`}>18</div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div> : null
                        }
                        <div className={`${Styles.otherBox}`}>
                            {categoriesNews.map((item, index)=>{
                                if (index > content.start && index <= content.end){
                                    return (
                                        <div
                                            className={`${Styles.otherBoxItem}`}
                                            key={'otherBox' + index}
                                            onClick={()=>{postLinkHandler(item.title, item.id)}}
                                        >
                                            <div
                                                className={`${Styles.otherCategory}`}
                                                style={{background: `${item.category.color}`}}
                                            >
                                                {item.category.name}
                                            </div>
                                            <div className={`${Styles.otherTitle}`}>{item.title}</div>
                                            <div className={`${Styles.statWrap}`}>
                                                <div className={`${Styles.date}`}>
                                                    <div className={`${Styles.iconWrap}`}>
                                                        <Icon icon='bi-clock' className={`${Styles.icon}`}/>
                                                    </div>
                                                    <div className={`${Styles.dateContent}`}>
                                                        <Moment format='ll'>
                                                            {item.date}
                                                        </Moment>
                                                    </div>
                                                </div>
                                                <div className={`${Styles.likes}`}>
                                                    <div className={`${Styles.iconWrap}`}>
                                                        <Icon icon='bi-hand-thumbs-up' className={`${Styles.icon}`}/>
                                                    </div>
                                                    <div className={`${Styles.likesContent}`}>
                                                        {item.likes_count}
                                                        {/*<Like data={item.likes_count}/>*/}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`${Styles.otherDescription}`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content)}}/>
                                        </div>
                                    )
                                } else return null
                            })}
                        </div>
                    </> : null}
            </div>
        </section>
    );
};

export default TextNews;