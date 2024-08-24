import './index.css'

const ImageOption = props => {
  const {
    optionsDetails,
    activeImageOptionsFunction,
    isActive,
    imageOptionId,
    userImageSelectedOPtionId,
    isQuestionAttempt,
  } = props

  const {id, isCorrect, imageUrl, text} = optionsDetails

  const onClickImageOptionButton = () => {
    activeImageOptionsFunction(id)
    userImageSelectedOPtionId(imageOptionId)
    isQuestionAttempt(optionsDetails)
  }

  const activeAnswerImageClassName = isActive
    ? 'active-answer-img'
    : 'answer-img'
  return (
    <li className="image-list">
      <button
        type="button"
        className="button-answer"
        onClick={onClickImageOptionButton}
        value={isCorrect}
      >
        <img
          src={imageUrl}
          value={isCorrect}
          alt={text}
          className={activeAnswerImageClassName}
        />
      </button>
    </li>
  )
}

export default ImageOption
