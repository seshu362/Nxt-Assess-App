import {Link} from 'react-router-dom'

import ScoreContext from '../../Context/ScoreContext'

import Header from '../Header'

import './index.css'

const ResultsRoute = () => (
  <ScoreContext.Consumer>
    {value => {
      const {scoreList, timeTaken} = value
      const updatedScoreList = scoreList.filter(
        (item, index) => scoreList.indexOf(item) === index,
      )
      const Score = updatedScoreList.length
      const isTimeUp = timeTaken === null
      return (
        <>
          <Header />
          {isTimeUp ? (
            <div className="results-container">
              <div className="results-card-container">
                <img
                  src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1724266076/calender_1_1cal_kbske7.png"
                  alt="time up"
                  className="img"
                />
                <h1 className="result-heading">Time is up</h1>
                <p className="timeup-para">
                  You did not complete the assessment within the time.
                </p>
                <div className="score-container">
                  <p className="your-score-text">Your Score: </p>
                  <p className="score-number">{Score}</p>
                </div>
                <Link to="/">
                  <button className="reattempt-button" type="button">
                    Reattempt
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="results-container">
              <div className="results-card-container">
                <img
                  src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1724264347/Layer_2res_jt2yk1.png"
                  alt="submit"
                  className="img"
                />
                <h1 className="result-heading">
                  Congrats! You completed the assessment.
                </h1>
                <div className="time-container">
                  <p className="time-taken-text">Time Taken: </p>
                  <p className="time-number">{timeTaken}</p>
                </div>
                <div className="score-container">
                  <p className="your-score-text">Your Score: </p>
                  <p className="score-number">{Score}</p>
                </div>
                <Link to="/">
                  <button className="reattempt-button" type="button">
                    Reattempt
                  </button>
                </Link>
              </div>
            </div>
          )}
        </>
      )
    }}
  </ScoreContext.Consumer>
)

export default ResultsRoute
