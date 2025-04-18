import {useLazyGetQuestionQuery, useStartQuestionMutation} from "../../api/questionsApi.js";
import {useEffect, useState} from "react";
import QuestionBlock from "../questionblock/QuestionBlock.jsx";
import {useSaveResponseMutation} from "../../api/userApi.js";
import CompleteInquirer from "./CompleteInquirer.jsx";

const ProcessInquirer = ({quizId}) => {
    const [isStartedQuiz, setIsStartedQuiz] = useState(false);
    const [isEndedQuiz, setIsEndedQuiz] = useState(false);
    const [startQuiz, {
        data: startQuizData,
        isSuccess,
    }] = useStartQuestionMutation({quizId: quizId});
    const [saveResponse] = useSaveResponseMutation()
    const [getQuestion, {
        data: questionNonFirstData,
    }] = useLazyGetQuestionQuery()

    useEffect(() => {
        if (!isStartedQuiz) {
            startQuiz({quizId})
        }
    }, [isStartedQuiz, quizId, startQuiz]);

    useEffect(() => {
        if (isSuccess) {
            setIsStartedQuiz(true)
        }
    }, [isSuccess]);


    const onAnswer = (selectedOption, selectedAnswers) => {
        saveResponse({
            responseIds: selectedOption,
            passNum: startQuizData.passNum,
            quizId: quizId,
        }).unwrap().then(response => {
            if (response.isEnded === true) {
                setIsEndedQuiz(true)
            } else {
                console.log(selectedAnswers)
                getQuestion({
                    quizId: quizId,
                    questionId: selectedAnswers[0].nextQuestionId
                })
            }
        })
    }

    if (isEndedQuiz) {
        return <CompleteInquirer/>;
    }

    if (!startQuizData) return null;
    
    return (
        !startQuizData.isMultipleChoice ? (
            <QuestionBlock questionData={questionNonFirstData || startQuizData}
                           onAnswer={onAnswer} />
        ) : (<div>ничего</div>)
    )
}

export default ProcessInquirer;