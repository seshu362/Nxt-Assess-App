import './index.css'

const DefaultOption = props => {
  const {
    optionsDetails,
    activeOPtionsButtonFunction,
    isActive,
    userSelectedOPtionId,
    isQuestionAttempt,
  } = props
  const {id, text} = optionsDetails

  const isActiveClassName = isActive
    ? 'active-default-button-answer'
    : 'default-button-answer'

  const onClickDefaultOptionButton = event => {
    activeOPtionsButtonFunction(id)
    userSelectedOPtionId(event.target.value)
    isQuestionAttempt(optionsDetails)
  }

  return (
    <li className="default-list">
      <button
        type="button"
        className={isActiveClassName}
        onClick={onClickDefaultOptionButton}
        value={id}
      >
        {text}
      </button>
    </li>
  )
}

export default DefaultOption
