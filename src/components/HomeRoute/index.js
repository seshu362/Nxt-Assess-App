import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const HomeRoute = () => (
  <div className="global-bg-container">
    <Header />
    <div className="home-bg-container">
      <img
        className="home-image"
        src="https://raw.githubusercontent.com/rajmanish23/nxt-assess/master/src/assets/home-image.png"
        alt="assessment"
      />
      <div className="home-instructions-card">
        <h1 className="home-instructions-heading">Instructions</h1>
        <ol className="home-instructions-list-container">
          <li className="home-instructions-list-item">
            <span className="home-instructions-list-item-main-text">
              Total Questions
            </span>
            : 10
          </li>
          <li className="home-instructions-list-item">
            <span className="home-instructions-list-item-main-text">
              Types of Questions
            </span>
            : MCQs
          </li>
          <li className="home-instructions-list-item">
            <span className="home-instructions-list-item-main-text">
              Duration
            </span>
            : 10 Mins
          </li>
          <li className="home-instructions-list-item">
            <span className="home-instructions-list-item-main-text">
              Marking Scheme
            </span>
            : Every Correct response, get 1 mark
          </li>
          <li className="home-instructions-list-item">
            All the progress will be lost, if you reload during the assessment
          </li>
          <li className="home-instructions-list-item">
            Please click Next question for submitting your previous question
            <span className="home-instructions-list-item-main-text">
              ----ALL THE BEST!
            </span>
          </li>
        </ol>
        <Link to="/assessment" className="assess-button-link">
          <button type="button" className="home-instructions-button">
            Start Assessment
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default HomeRoute
