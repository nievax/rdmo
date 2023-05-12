import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { filterElement } from '../../utils/filter'

import { ElementErrors } from '../common/Errors'
import { EditLink, CopyLink, LockedLink, ExportLink, CodeLink } from '../common/Links'

const Option = ({ config, option, elementActions, display='list', indent=0, filter=null }) => {

  const verboseName = gettext('option')
  const showElement = filterElement(filter, option)

  const fetchEdit = () => elementActions.fetchElement('options', option.id)
  const fetchCopy = () => elementActions.fetchElement('options', option.id, 'copy')
  const toggleLocked = () => elementActions.storeElement('options', {...option, locked: !option.locked })

  const elementNode = (
    <div className="element">
      <div className="pull-right">
        <EditLink element={option} verboseName={verboseName} onClick={fetchEdit} />
        <CopyLink element={option} verboseName={verboseName} onClick={fetchCopy} />
        <LockedLink element={option} verboseName={verboseName} onClick={toggleLocked} />
        <ExportLink element={option} elementType="options" verboseName={verboseName}
                    exportFormats={config.settings.export_formats} />
      </div>
      <div>
        <p>
          <strong>{gettext('Option')}{': '}</strong> {option.text}
        </p>
        {
          config.display.uri.options &&
          <CodeLink className="code-options" uri={option.uri} onClick={() => fetchEdit()} />
        }
        <ElementErrors element={option} />
      </div>
    </div>
  )

  switch (display) {
    case 'list':
      return showElement && (
        <li className="list-group-item">
          { elementNode }
        </li>
      )
    case 'nested':
      return showElement && (
        <div className="panel panel-default panel-nested" style={{ marginLeft: 30 * indent }}>
          <div className="panel-body">
            { elementNode }
          </div>
        </div>
      )
  }
}

Option.propTypes = {
  config: PropTypes.object.isRequired,
  option: PropTypes.object.isRequired,
  elementActions: PropTypes.object.isRequired,
  display: PropTypes.string,
  indent: PropTypes.number,
  filter: PropTypes.object
}

export default Option
