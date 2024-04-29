import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useDebouncedCallback } from 'use-debounce'

import useFocusEffect from '../../../../hooks/useFocusEffect'

const TextareaInput = ({ value, disabled, isDefault, focus, updateValue }) => {
  const ref = useRef(null)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {setInputValue(value.text)}, [value.id])
  useFocusEffect(ref, [value.text], focus)

  const handleChange = useDebouncedCallback((value, text) => {
    updateValue(value, { text })
  }, 500)

  const classnames = classNames({
    'form-control': true,
    'default': isDefault
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
  isDefault: PropTypes.bool,
  focus: PropTypes.bool,
  updateValue: PropTypes.func.isRequired
}

export default TextareaInput
