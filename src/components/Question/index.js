import {useState} from 'react'
import {MdError} from 'react-icons/md'

import DefaultOption from '../DefaultOption'
import ImageOption from '../ImageOption'
import SingleSelectOption from '../SingleSelectOption'

import ScoreContext from '../../Context/ScoreContext'

import './index.css'

const Question = props => {
  const [activeOptionId, setActiveOptionId] = useState(null)
  const [activeImageOptionId, setActiveImageOptionId] = useState(null)
  const [selectList, setSelectList] = useState([])
  const [questionNum, setQuestionNum] = useState(1)

  const {
    questionData,
    currentQuestionIndex,
    nextQuestionNumberFunctionCall,
    totalquestion,
    isUserSelect,
    isQuestionAttempt,
    clearOptionsList,
  } = props

  const isNextQuestionAvailable = currentQuestionIndex < totalquestion

  const {optionsType, options, questionText} = questionData

  const renderDefaultOptionView = () => {
    const activeOPtionsButtonFunction = valueId => {
      setActiveOptionId(valueId)
    }

    const userSelectedOPtionId = id => {
      const filterSelectList = options.find(eachItem => eachItem.id === id)
      setSelectList(prevList => [...prevList, filterSelectList])

      isUserSelect(id)
    }
    return (
      <ul className="options-list-container">
        {options.map(eachOptions => (
          <DefaultOption
            key={eachOptions.id}
            optionsDetails={eachOptions}
            activeOPtionsButtonFunction={activeOPtionsButtonFunction}
            isActive={activeOptionId === eachOptions.id}
            userSelectedOPtionId={userSelectedOPtionId}
            isQuestionAttempt={isQuestionAttempt}
          />
        ))}
      </ul>
    )
  }

  const renderImageOptionView = () => {
    const activeImageOptionsFunction = valueId => {
      setActiveImageOptionId(valueId)
    }
    const userImageSelectedOPtionId = id => {
      const filterImageSelectList = options.find(eachItem => eachItem.id === id)
      setSelectList(prevList => [...prevList, filterImageSelectList])
      isUserSelect(true)
    }
    return (
      <ul className="image-options-list-container">
        {options.map(eachOptions => (
          <ImageOption
            key={eachOptions.id}
            optionsDetails={eachOptions}
            activeImageOptionsFunction={activeImageOptionsFunction}
            isActive={activeImageOptionId === eachOptions.id}
            imageOptionId={eachOptions.id}
            userImageSelectedOPtionId={userImageSelectedOPtionId}
            isQuestionAttempt={isQuestionAttempt}
          />
        ))}
      </ul>
    )
  }

  const renderSingleSelectOptionView = () => {
    const userSingleSelectedOPtionId = id => {
      const filterSingleSelectList = options.find(
        eachItem => eachItem.id === id,
      )
      setSelectList(prevList => [...prevList, filterSingleSelectList])
      isUserSelect(true)
    }
    return (
      <div className="single-option-container">
        <SingleSelectOption
          optionsList={options}
          userSingleSelectedOPtionId={userSingleSelectedOPtionId}
          isQuestionAttempt={isQuestionAttempt}
        />
      </div>
    )
  }

  let renderOptionsAnswerView = null
  switch (optionsType) {
    case 'DEFAULT':
      renderOptionsAnswerView = renderDefaultOptionView()
      break
    case 'IMAGE':
      renderOptionsAnswerView = renderImageOptionView()
      break
    case 'SINGLE_SELECT':
      renderOptionsAnswerView = renderSingleSelectOptionView()
      break
    default:
      renderOptionsAnswerView = null
      break
  }

  const renderDropdownInfoChip = () => (
    <div className="single-note-container">
      <MdError size={20} color="#d97706" />
      <p className="alert-text">First option is selected by default</p>
    </div>
  )

  const renderNextQuestionButton = () => (
    <ScoreContext.Consumer>
      {value => {
        const {setContextSelectList} = value
        const onClickNextQuestion = () => {
          clearOptionsList()
          nextQuestionNumberFunctionCall()
          const updateSelectData = selectList.filter(
            (item, index) => selectList.indexOf(item) === index,
          )
          setContextSelectList(selectList)
          if (questionNum < 10) {
            setQuestionNum(prevNum => prevNum + 1)
          }
        }

        return (
          <button
            type="button"
            className="next-btn"
            onClick={onClickNextQuestion}
          >
            Next Question
          </button>
        )
      }}
    </ScoreContext.Consumer>
  )
  return (
    <div className="question-container">
      <div>
        <p className="question-name">{`${questionNum}. ${questionText}`}</p>
        {renderOptionsAnswerView}
      </div>
      <div className="nxt-btn-container">
        {optionsType === 'SINGLE_SELECT' && renderDropdownInfoChip()}
        {isNextQuestionAvailable && renderNextQuestionButton()}
      </div>
    </div>
  )
}

export default Question
