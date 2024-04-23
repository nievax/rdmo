import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useDebouncedCallback } from 'use-debounce'

import AddValue from './common/AddValue'
import RemoveValue from './common/RemoveValue'

const TextareaInput = ({ value, disabled, focus, updateValue }) => {
  const ref = useRef(null)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {setInputValue(value.text)}, [value.id])
  useEffect(() => {
    if (focus) {
      ref.current.focus()
    }
  }, [focus])

  const handleChange = useDebouncedCallback((value, text) => {
    updateValue(value, { text })
  }, 500)

  const classnames = classNames({
    'form-control': true
  })

  return (
    <textarea
      ref={ref}
      rows={6}
      className={classnames}
      disabled={disabled}
      value={inputValue}
      onChange={(event) => {
        setInputValue(event.target.value)
        handleChange(value, event.target.value)
      }}
    />
  )
}

TextareaInput.propTypes = {
  value: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  focus: PropTypes.bool,
  updateValue: PropTypes.func.isRequired
}

const TextareaWidget = ({ question, values, currentSet, disabled, createValue, updateValue, deleteValue }) => {
  return (
    <div className="interview-collection">
      {
        values.map((value, valueIndex) => (
          <div key={valueIndex} className="interview-input">
            <div className="interview-input-options">
              {
                question.is_collection && <RemoveValue value={value} deleteValue={deleteValue} />
              }
            </div>
            <TextareaInput
              value={value}
              disabled={disabled}
              updateValue={updateValue}
              focus={valueIndex == values.length - 1}
            />
          </div>
        ))
      }
      {
        question.is_collection && (
          <AddValue question={question} values={values} currentSet={currentSet} createValue={createValue} />
        )
      }
    </div>
  )
}

TextareaWidget.propTypes = {
  question: PropTypes.object.isRequired,
  values: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  currentSet: PropTypes.object.isRequired,
  createValue: PropTypes.func.isRequired,
  updateValue: PropTypes.func.isRequired,
  deleteValue: PropTypes.func.isRequired
}

export default TextareaWidget