import './index.css'

const SingleSelectOption = props => {
  const {optionsList, userSingleSelectedOPtionId, isQuestionAttempt} = props

  const onChangeSelectId = event => {
    isQuestionAttempt()
    userSingleSelectedOPtionId(event.target.value)
  }

  return (
    <select className="select-options" onChange={onChangeSelectId}>
      {optionsList.map(eachOption => {
        const {id, text} = eachOption
        return (
          <option key={id} value={id} className="options">
            {text}
          </option>
        )
      })}
    </select>
  )
}

export default SingleSelectOption
