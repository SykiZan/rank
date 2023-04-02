import React, { useEffect, useState } from "react";
import Styles from "./styles.module.scss";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVoteResultSuccess,
  setVote,
  setVoteResultAll,
} from "../../store/main/action";
import { useTranslation } from "react-i18next";

const CheckForm = (props) => {
  const { toastHandler } = props;
  const themeModeStatus = useSelector((store) => store.main.themeModeStatus);
  const questions = useSelector((store) => store.main.vote);
  const voteResult = useSelector((store) => store.main.voteResult);
  const voteResultAll = useSelector((store) => store.main.voteResultAll);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [currentChoice, setCurrentChoice] = useState(false);
  const [voteType, setVoteType] = useState(false);

  //   console.log(voteResult);
  //   console.log(voteResultAll);
  //   console.log(voteType);

  const submitHandler = (id) => {
    // console.log("in submit");
    const oldVotes = JSON.parse(localStorage.getItem("votes"));
    if (oldVotes) {
      if (oldVotes.includes(questions.id)) {
        toastHandler("Вы уже высказались по этому вопросу!");
      } else {
        dispatch(setVote(questions.id, id));
        toastHandler("Ваш ответ принят. Мы ценим ваше мнение!");
      }
    } else {
      dispatch(setVote(questions.id, id));
      toastHandler("Ваш ответ принят. Мы ценим ваше мнение!");
      dispatch(setVoteResultAll(voteResultAll + 1));
      let incIndex = false;
      let newResult = voteResult;
      voteResult.answers.forEach((item, index) => {
        if (item.id === id) {
          incIndex = index;
        }
      });
      newResult.answers[incIndex].votes_amount =
        newResult.answers[incIndex].votes_amount + 1;
      dispatch(getVoteResultSuccess(newResult));
      setVoteType(true);
    }
  };

  useEffect(() => {
    const oldVotes = JSON.parse(localStorage.getItem("votes"));
    if (oldVotes) {
      if (oldVotes.includes(questions.id)) {
        setVoteType(true);
      }
    }
  }, [questions]);

  return (
    <section
      className={`${Styles.container} ${themeModeStatus ? Styles.dark : null}`}
    >
      <div className={`${Styles.marginWrap}`}>
        <div
          className={`${Styles.contentWrap} ${
            voteType ? Styles.resultContentWrap : null
          }`}
        >
          <div className={`${Styles.mainTitle}`}>
            <span>{t("Interview")}</span>
          </div>
          {questions ? (
            <div className={`${Styles.contentBox}`}>
              <div className={`${Styles.title}`}>{questions.question}</div>
              {voteType && (
                <div className={`${Styles.listWrap}`}>
                  {questions.answers?.map((item, index) => {
                    return (
                      <div
                        className={`${Styles.listItem} ${
                          Styles.listItemAfter
                        } ${
                          currentChoice === item.id
                            ? Styles.listItemActive
                            : Styles.listItemPassive
                        }`}
                        key={"Poll" + index}
                        onClick={() => {
                          //   setCurrentChoice(item.id);
                        }}
                      >
                        <div
                          className={`${Styles.fill}`}
                          style={{
                            width: `${
                              voteResultAll
                                ? (
                                    (voteResult?.answers?.[index].votes_amount /
                                      voteResultAll) *
                                    100
                                  ).toFixed(0) + "%"
                                : null
                            }`,
                          }}
                        ></div>
                        <div className={`${Styles.note}`}>{item.text}</div>
                        {voteType ? (
                          voteResult?.answers ? (
                            <div className={`${Styles.result}`}>
                              {voteResultAll
                                ? (
                                    (voteResult?.answers?.[index].votes_amount /
                                      voteResultAll) *
                                    100
                                  ).toFixed(0) + "%"
                                : null}
                            </div>
                          ) : null
                        ) : (
                          <div className={`${Styles.iconWrap}`}>
                            <Icon
                              icon={
                                currentChoice === item.id
                                  ? "bi-record-circle"
                                  : "bi-circle"
                              }
                              className={`${Styles.icon}`}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {!voteType && (
                <div className={`${Styles.listWrap}`}>
                  {questions.answers?.map((item, index) => {
                    return (
                      <div
                        className={`${Styles.listItem} ${
                          currentChoice === item.id
                            ? Styles.listItemActive
                            : Styles.listItemPassive
                        }`}
                        key={"Poll" + index}
                        onClick={() => {
                          //   setCurrentChoice(item.id);
                          submitHandler(item.id);
                        }}
                      >
                        <div className={`${Styles.checkBox}`}></div>
                        <div className={`${Styles.note}`}>{item.text}</div>
                      </div>
                    );
                  })}
                </div>
              )}
              {/* <button
                className={`${Styles.sendBtn}`}
                disabled={!currentChoice}
                onClick={() => {
                  submitHandler();
                }}
              >
                {t("Submit")}
              </button> */}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default CheckForm;
