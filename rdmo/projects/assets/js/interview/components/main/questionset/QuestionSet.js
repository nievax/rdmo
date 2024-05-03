import React from 'react'
import PropTypes from 'prop-types'

import { getChildPrefix } from '../../../utils/set'

import Question from '../question/Question'

import QuestionSetAddSet from './QuestionSetAddSet'
import QuestionSetAddSetHelp from './QuestionSetAddSetHelp'
import QuestionSetHelp from './QuestionSetHelp'
import QuestionSetRemoveSet from './QuestionSetRemoveSet'

const QuestionSet = ({ templates, questionset, sets, values, disabled, isManager, focus,
                       parentSet, createSet, updateSet, deleteSet,
                       createValue, updateValue, deleteValue }) => {

  const setPrefix = getChildPrefix(parentSet)

  const currentSets = sets.filter((set) => (
    set.set_prefix == setPrefix
  ))

  return (
    <div className="interview-questionset col-md-12">
      <strong>{questionset.title}</strong>
      <QuestionSetHelp questionset={questionset} />
      <QuestionSetAddSetHelp templates={templates} questionset={questionset} />
      <div>
        {
          currentSets.map((set, setIndex) => (
            <div key={setIndex} className="interview-block">
              <div className="interview-block-options">
                <QuestionSetRemoveSet questionset={questionset} set={set} deleteSet={deleteSet} />
              </div>
              <div className="row">
                {
                  currentSets && (
                    questionset.elements.map((element, elementIndex) => {
                      if (element.model == 'questions.questionset') {
                        return (
                          <QuestionSet
                            key={elementIndex}
                            templates={templates}
                            questionset={element}
                            sets={sets}
                            values={values.filter((value) => element.attributes.includes(value.attribute))}
                            disabled={disabled}
                            isManager={isManager}
                            focus={focus && (setIndex === 0 && elementIndex === 0)}
                            parentSet={set}
                            createSet={createSet}
                            updateSet={updateSet}
                            deleteSet={deleteSet}
                            createValue={createValue}
                            updateValue={updateValue}
                            deleteValue={deleteValue}
                          />
                        )
                      } else {
                        return (
                          <Question
                            key={elementIndex}
                            templates={templates}
                            question={element}
                            values={values.filter((value) => (
                              value.attribute == element.attribute &&
                              value.set_prefix == set.set_prefix &&
                              value.set_index == set.set_index
                            ))}
                            disabled={disabled}
                            isManager={isManager}
                            focus={focus && (setIndex === 0 && elementIndex === 0)}
                            currentSet={set}
                            createValue={createValue}
                            updateValue={updateValue}
                            deleteValue={deleteValue}
                          />
                        )
                      }
                    })
                  )
                }
              </div>
            </div>
          ))
        }
      </div>

      <QuestionSetAddSet questionset={questionset} sets={currentSets} setPrefix={setPrefix} createSet={createSet} />
    </div>
  )
}

QuestionSet.propTypes = {
  templates: PropTypes.object.isRequired,
  questionset: PropTypes.object.isRequired,
  sets: PropTypes.array.isRequired,
  values: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
  isManager: PropTypes.bool.isRequired,
  focus: PropTypes.bool.isRequired,
  parentSet: PropTypes.object.isRequired,
  createSet: PropTypes.func.isRequired,
  updateSet: PropTypes.func.isRequired,
  deleteSet: PropTypes.func.isRequired,
  createValue: PropTypes.func.isRequired,
  updateValue: PropTypes.func.isRequired,
  deleteValue: PropTypes.func.isRequired
}

export default QuestionSet
