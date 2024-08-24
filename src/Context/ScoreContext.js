import React from 'react'

const ScoreContext = React.createContext({
  scoreList: [],
  setContextSelectList: () => {},
  timeTaken: null,
  timeTakenFunction: () => {},
})

export default ScoreContext
