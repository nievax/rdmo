import React from 'react'
import PropTypes from 'prop-types'

import Template from 'rdmo/core/assets/js/components/Template'

import QuestionHelp from './QuestionHelp'
import QuestionManagement from './QuestionManagement'
import QuestionText from './QuestionText'
import QuestionWidget from './QuestionWidget'

const Question = ({ templates, question, values, currentSet, createValue, updateValue, deleteValue }) => {
  return (
    <div className="interview-question">
      <QuestionText question={question} />
      <QuestionHelp question={question} />
      {
        question.is_collection && (
          <Template template={templates.project_interview_add_field_help} />
        )
      }
      {
        <Template template={templates.project_interview_multiple_values_warning} />
      }
      {
        <QuestionManagement question={question} />
      }
      <QuestionWidget
        question={question}
        values={values}
        currentSet={currentSet}
        createValue={createValue}
        updateValue={updateValue}
        deleteValue={deleteValue}
      />
    </div>
  )
}

Question.propTypes = {
  templates: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
  values: PropTypes.array.isRequired,
  currentSet: PropTypes.object.isRequired,
  createValue: PropTypes.func.isRequired,
  updateValue: PropTypes.func.isRequired,
  deleteValue: PropTypes.func.isRequired,
}

export default Question