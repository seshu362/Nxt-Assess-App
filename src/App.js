import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import AssessmentRoute from './components/AssessmentRoute'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import ResultsRoute from './components/ResultsRoute'

import ScoreContext from './Context/ScoreContext'

import './App.css'

class App extends Component {
  state = {
    scoreList: [],
    timeTaken: null,
  }

  setContextSelectList = data => {
    const filteredList = data.filter(eachItem => eachItem.isCorrect === true)

    this.setState(prevState => ({
      scoreList: [...prevState.scoreList, ...filteredList],
    }))
  }

  timeTakenFunction = time => {
    this.setState({timeTaken: time})
  }

  render() {
    const {scoreList, timeTaken} = this.state
    return (
      <ScoreContext.Provider
        value={{
          scoreList,
          timeTaken,
          setContextSelectList: this.setContextSelectList,
          timeTakenFunction: this.timeTakenFunction,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute
            exact
            path="/assessment"
            component={AssessmentRoute}
          />
          <ProtectedRoute exact path="/results" component={ResultsRoute} />
          <Route component={NotFound} />
        </Switch>
      </ScoreContext.Provider>
    )
  }
}

export default App
