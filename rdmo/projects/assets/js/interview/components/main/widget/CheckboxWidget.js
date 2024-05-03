import React from 'react'
import PropTypes from 'prop-types'
import { maxBy } from 'lodash'

import { gatherOptions } from '../../../utils/options'

import QuestionError from '../question/QuestionError'

import CheckboxInput from './CheckboxInput'

const CheckboxWidget = ({ question, values, currentSet, disabled, createValue, updateValue, deleteValue }) => {

  const handleCreateValue = (option, additionalInput) => {
    const lastValue = maxBy(values, (v) => v.collection_index)
    const collectionIndex = lastValue ? lastValue.collection_index + 1 : 0

    const value = {
      attribute: question.attribute,
      set_prefix: currentSet.set_prefix,
      set_index: currentSet.set_index,
      collection_index: collectionIndex,
      set_collection: question.set_collection,
    }

    if (option.has_provider) {
      value.external_id = option.id
      value.text = option.text
    } else {
      value.option = option.id
      value.text = additionalInput
    }

    createValue(value, true)
  }

  return (
    <div className="interview-widgets">
      <div className="interview-widget">
        <div className="checkbox-control">
          {
            gatherOptions(question).map((option, optionIndex) => {
              const value = values.find((value) => (
                option.has_provider ? (value.external_id === option.id) : (value.option === option.id)
              ))

              return (
                <React.Fragment key={optionIndex}>
                  <CheckboxInput
                    value={value}
                    option={option}
                    disabled={disabled}
                    onCreate={handleCreateValue}
                    onUpdate={updateValue}
                    onDelete={deleteValue}
                  />
                  <QuestionError value={value} />
                </React.Fragment>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

CheckboxWidget.propTypes = {
  question: PropTypes.object.isRequired,
  values: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  currentSet: PropTypes.object.isRequired,
  createValue: PropTypes.func.isRequired,
  updateValue: PropTypes.func.isRequired,
  deleteValue: PropTypes.func.isRequired
}

export default CheckboxWidget
