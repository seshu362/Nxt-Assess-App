import {Link} from 'react-router-dom'

import ScoreContext from '../../Context/ScoreContext'
import './index.css'

const TimerQuestionDetails = props => {
  const {
    currentTimeDetails,
    questionProgressList,
    questionProgressListIdQuestionFunction,
    questionAttemptNumber,
  } = props

  const unAnswerAttemptNumber = 10 - questionAttemptNumber

  const date = new Date(0)
  date.setSeconds(currentTimeDetails)
  const timeString = date.toISOString().substring(11, 19)

  const onClickQuestion = event => {
    questionProgressListIdQuestionFunction(event.target.value)
  }

  const renderSubmitButton = () => (
    <ScoreContext.Consumer>
      {value => {
        const {timeTakenFunction} = value
        const onClickEndAssingment = () => {
          timeTakenFunction(timeString)
        }
        return (
          <Link to="/results">
            <button
              className="submit-assessment-button"
              onClick={onClickEndAssingment}
              type="button"
            >
              Submit Assessment
            </button>
          </Link>
        )
      }}
    </ScoreContext.Consumer>
  )

  return (
    <div className="timer-question-bg-container">
      <div className="timmer-container">
        <p className="time-left-text">Time Left</p>
        <p className="running-time">{timeString}</p>
      </div>
      <div className="submit-question-bg-container">
        <div className="answered-unanswered-count-container">
          <div className="answered-count-container">
            <div className="answered-count-bg-color">
              <p className="answered-count-number">{questionAttemptNumber}</p>
            </div>
            <p className="answered-questions-text">Answered Questions</p>
          </div>
          <div className="unanswered-count-container">
            <div className="unanswered-count-bg-color">
              <p className="unanswered-count-number">{unAnswerAttemptNumber}</p>
            </div>
            <p className="unanswered-questions-text">Unanswered Questions</p>
          </div>
        </div>
        <div>
          <hr className="line" />
        </div>
        <div className="numbers-question-bg-container-details">
          <h1 className="question-heading">Questions (10)</h1>
          <ul className="question-progress-list-container">
            {questionProgressList.map(eachQuestionProgress => {
              const {id, numberText, status} = eachQuestionProgress
              const attemptedQuestionClassName = status
                ? 'attempted-question-progress-list-button'
                : 'question-progress-list-button'
              return (
                <li key={id} className="li-question-progress-list">
                  <button
                    value={id}
                    className={attemptedQuestionClassName}
                    onClick={onClickQuestion}
                    type="button"
                  >
                    {numberText}
                  </button>
                </li>
              )
            })}
          </ul>
          {renderSubmitButton()}
        </div>
      </div>
    </div>
  )
}

export default TimerQuestionDetails
