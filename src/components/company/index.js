import React from "react";
import Styles from './styles.module.scss'
import {useSelector} from "react-redux";

const Company = () => {
    const themeModeStatus = useSelector(store => store.main.themeModeStatus);

    return (
        <section className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}>
            <div className={`${Styles.contentWrap}`}>
                <div className={`${Styles.box}`}>
                    <div className={`${Styles.title}`}>Magic Rank - новостной и рейтинговый проект в составе глобальной экосистемы Magic DAO.</div>
                    <div className={`${Styles.paragraph}`}>
                        MagicDAO - децентрализованная и безопасная Blockchain-экосистема, позволяющая любому пользователю, вне зависимости от опыта,
                        использовать возможности криптотехнологий за счет интуитивно понятных инструментов, охватывающих все потребности на этом
                        рынке. Инфраструктура MagicDAO - комплексное решение, отвечающее самым современным запросам. Взаимодействуя в рамках единого
                        пространства, пользователи получают возможность повысить инвестиционную эффективность своих активов.
                    </div>
                </div>
                <div className={`${Styles.box}`}>
                    <div className={`${Styles.listTitle}`}>В рамках <span className={`${Styles.colored}`}>Magic Rank</span> мы предоставляем самую свежую и объективную информацию о криптосфере:</div>
                    <div className={`${Styles.listWrap}`}>
                        <div className={`${Styles.listItem}`}>
                            экспертные оценки новых проектов – собирая и анализируя данные из самых разных источников, мы формируем по каждому проекту
                            объективную комплексную информацию, позволяющую принимать взвешенные решения;
                        </div>
                        <div className={`${Styles.listItem}`}>
                            собственная аналитика – готовим исследовательские отчеты по рынку, отслеживаем отраслевые тенденции, проводим фундаментальный
                            и технический анализ;
                        </div>
                        <div className={`${Styles.listItem}`}>
                            рейтинги игроков рынка – сопоставляя разрозненную информацию, составляем рейтинги крупнейших криптосостояний, самых крупных
                            держателей NFT, криптопроектов, инфлюенсеров рынка;
                        </div>
                        <div className={`${Styles.listItem}`}>
                            новости – быстро и оперативно разгребаем информационные завалы, фокусируясь на информации, которую действительно ждут наши
                            пользователи.
                        </div>
                    </div>
                </div>
                <div className={`${Styles.box}`}>
                    <div className={`${Styles.listTitle}`}>
                        По мере развития экосистемы <span className={`${Styles.colored}`}>MagicDAO</span> мы будем знакомить пользователей с функционалом и возможностями ее составных частей:
                    </div>
                    <div className={`${Styles.listWrap}`}>
                        <div className={`${Styles.listItem}`}>
                            Magic Academy – образовательный проект в области Blockchain, криптовалют и децентрализованных технологий;
                        </div>
                        <div className={`${Styles.listItem}`}>
                            Magic Swap – децентрализованная биржа (DEX), работающая на основе Blockchain;
                        </div>
                        <div className={`${Styles.listItem}`}>
                            Magic Wallet – некастодиальный (внебиржевой) криптокошелек, который позволяет получать, хранить и отправлять криптовалютные активы;
                        </div>
                        <div className={`${Styles.listItem}`}>
                            Fratrum – централизованная биржа (CEX), осуществляющая контроль над безопасностью средств и обслуживанием пользователей;
                        </div>
                        <div className={`${Styles.listItem}`}>
                            Magic Starter – пусковая платформа для криптостартапов.
                        </div>
                        <div className={`${Styles.listItem}`}>
                            Magic Rank. Крипта – это просто.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Company;