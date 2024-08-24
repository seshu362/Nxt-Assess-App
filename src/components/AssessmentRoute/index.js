import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Question from '../Question'
import TimerQuestionDetails from '../TimerQuestionDetails'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const constQuestionProgressList = [
  {id: 0, numberText: 1, status: false},
  {id: 1, numberText: 2, status: false},
  {id: 2, numberText: 3, status: false},
  {id: 3, numberText: 4, status: false},
  {id: 4, numberText: 5, status: false},
  {id: 5, numberText: 6, status: false},
  {id: 6, numberText: 7, status: false},
  {id: 7, numberText: 8, status: false},
  {id: 8, numberText: 9, status: false},
  {id: 9, numberText: 10, status: false},
]

const AssessmentRoute = props => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.inProgress,
    questionsList: null,
    totalQuestions: null,
    errorMssg: null,
  })

  const [activeQuestionNumberIndex, setActiveQuestionNumberIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(600)
  const [questionProgressList, setQuestionProgressList] = useState([])
  const [hasAttemptedAnswer, setHasAttemptedAnswer] = useState(false)
  const [questionAttemptList, setQuestionAttemptList] = useState([])
  const [questionAttemptNumber, setQuestionAttemptNumber] = useState(0)

  const getFetchQuestions = async () => {
    setQuestionProgressList(constQuestionProgressList)
    setApiResponse({
      status: apiStatusConstants.inProgress,
      questionsList: null,
      totalQuestions: null,
      errorMssg: null,
    })
    const response = await fetch('https://apis.ccbp.in/assess/questions')
    const data = await response.json()
    if (response.ok) {
      const formattedData = data.questions.map(eachQuestion => {
        const {options} = eachQuestion
        const optionsType = eachQuestion.options_type
        const updatedOptions = options.map(eachOptions => {
          const isCorrect = eachOptions.is_correct === 'true'
          if (optionsType === 'IMAGE') {
            return {
              id: eachOptions.id,
              text: eachOptions.text,
              imageUrl: eachOptions.image_url,
              isCorrect,
            }
          }
          return {
            id: eachOptions.id,
            text: eachOptions.text,
            isCorrect,
          }
        })
        return {
          id: eachQuestion.id,
          questionText: eachQuestion.question_text,
          optionsType,
          options: updatedOptions,
        }
      })
      setApiResponse({
        status: apiStatusConstants.success,
        questionsList: formattedData,
        totalQuestions: data.total,
        errorMssg: null,
      })
    } else {
      setApiResponse({
        status: apiStatusConstants.failure,
        questionsList: null,
        totalQuestions: null,
        errorMssg: data.error_msg,
      })
    }
  }

  useEffect(() => {
    getFetchQuestions()
  }, [])

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(prevCurrent => prevCurrent - 1)
    }, 1000)
    return () => {
      clearInterval(timerId)
    }
  }, [])

  useEffect(() => {
    const {history} = props
    if (currentTime === 0) {
      history.replace('/results')
    }
  }, [currentTime])

  const setActiveNextQuestionNumber = () => {
    const nextQuestion = activeQuestionNumberIndex + 1
    if (nextQuestion < apiResponse.totalQuestions) {
      setActiveQuestionNumberIndex(nextQuestion)
      setHasAttemptedAnswer(false)
    }
  }

  const updatedHasAnsweredFunction = () => {
    setHasAttemptedAnswer(true)
  }

  const isUserSelect = () => {
    const updateQuestionProgressList = questionProgressList.map(eachItem => {
      if (eachItem.id === activeQuestionNumberIndex) {
        const updateList = {...eachItem, status: true}
        return updateList
      }
      return eachItem
    })
    setQuestionProgressList(updateQuestionProgressList)
  }

  const isQuestionAttempt = value => {
    setQuestionAttemptList(prevList => [...prevList, value])
  }

  const clearOptionsList = () => {
    if (questionAttemptList.length > 0) {
      setQuestionAttemptNumber(prevCount => prevCount + 1)
    }
    setQuestionAttemptList([])
  }

  /* It is mandotory don't delete */
  const questionProgressListIdQuestionFunction = () => {}
  const renderSuccessPage = () => (
    <div className="question-bg-container">
      <Question
        questionData={apiResponse.questionsList[activeQuestionNumberIndex]}
        currentQuestionIndex={activeQuestionNumberIndex}
        nextQuestionNumberFunctionCall={setActiveNextQuestionNumber}
        hasAttemptedAnswer={hasAttemptedAnswer}
        updatedHasAnsweredFunction={updatedHasAnsweredFunction}
        totalquestion={apiResponse.totalQuestions}
        isUserSelect={isUserSelect}
        isQuestionAttempt={isQuestionAttempt}
        clearOptionsList={clearOptionsList}
      />
      <TimerQuestionDetails
        currentTimeDetails={currentTime}
        questionProgressList={questionProgressList}
        questionProgressListIdQuestionFunction={
          questionProgressListIdQuestionFunction
        }
        questionAttemptNumber={questionAttemptNumber}
      />
    </div>
  )

  const renderLoadingView = () => (
    <div className="loading-container" data-testid="loader">
      <Loader type="ThreeDots" color="#263868" height={50} width={50} />
    </div>
  )

  let renderAssessmentPage = null
  switch (apiResponse.status) {
    case apiStatusConstants.inProgress:
      renderAssessmentPage = renderLoadingView()
      break
    case apiStatusConstants.success:
      renderAssessmentPage = renderSuccessPage()
      break
    default:
      renderAssessmentPage = null
      break
  }

  return (
    <>
      <Header />
      <div className="assessment-bg-container">{renderAssessmentPage}</div>
    </>
  )
}
export default AssessmentRoute
