import React, { Component} from 'react'
import PropTypes from 'prop-types'

import { getUriPrefixes } from '../../utils/filter'

import { FilterString, FilterUriPrefix } from '../common/Filter'
import { BackButton, NewButton } from '../common/Buttons'

import OptionSet from '../element/OptionSet'

const OptionSets = ({ config, optionsets, configActions, elementActions}) => {

  const updateFilterString = (value) => configActions.updateConfig('filter.optionsets.string', value)
  const updateFilterUriPrefix = (value) => configActions.updateConfig('filter.optionsets.uriPrefix', value)

  const createOptionSet = () => elementActions.createElement('optionsets')

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <div className="pull-right">
          <BackButton />
          <NewButton onClick={createOptionSet} />
        </div>
        <strong>{gettext('Option sets')}</strong>
      </div>

      <div className="panel-body">
        <div className="row">
          <div className="col-sm-8">
            <FilterString value={config.filter.optionsets.string} onChange={updateFilterString}
                          placeholder={gettext('Filter option sets')} />
          </div>
          <div className="col-sm-4">
            <FilterUriPrefix value={config.filter.optionsets.uriPrefix} onChange={updateFilterUriPrefix}
                             options={getUriPrefixes(optionsets)} />
          </div>
        </div>
      </div>

      <ul className="list-group">
      {
        optionsets.map((optionset, index) => (
          <OptionSet key={index} config={config} optionset={optionset} elementActions={elementActions}
                     filter={config.filter.optionsets} />
        ))
      }
      </ul>
    </div>
  )
}

OptionSets.propTypes = {
  config: PropTypes.object.isRequired,
  optionsets: PropTypes.array.isRequired,
  configActions: PropTypes.object.isRequired,
  elementActions: PropTypes.object.isRequired
}

export default OptionSets
