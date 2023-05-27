import React from 'react'
import PropTypes from 'prop-types'

import { filterElement } from '../../utils/filter'

import { ElementErrors } from '../common/Errors'
import { EditLink, CopyLink, AddLink, LockedLink, NestedLink,
         ExportLink, CodeLink } from '../common/Links'

const OptionSet = ({ config, optionset, elementActions, display='list', filter=null }) => {

  const verboseName = gettext('option set')
  const showElement = filterElement(filter, optionset)

  const fetchEdit = () => elementActions.fetchElement('optionsets', optionset.id)
  const fetchCopy = () => elementActions.fetchElement('optionsets', optionset.id, 'copy')
  const fetchNested = () => elementActions.fetchElement('optionsets', optionset.id, 'nested')
  const toggleLocked = () => elementActions.storeElement('optionsets', {...optionset, locked: !optionset.locked })

  const createOption = () => elementActions.createElement('options', { optionset })

  const elementNode = (
    <div className="element">
      <div className="pull-right">
        <NestedLink element={optionset} verboseName={verboseName} onClick={fetchNested} />
        <EditLink verboseName={verboseName} onClick={fetchEdit} />
        <CopyLink verboseName={verboseName} onClick={fetchCopy} />
        <AddLink element={optionset} verboseName={gettext('option')} onClick={createOption} />
        <LockedLink element={optionset} verboseName={verboseName} onClick={toggleLocked} />
        <ExportLink element={optionset} elementType="optionsets" verboseName={verboseName}
                    exportFormats={config.settings.export_formats} />
      </div>
      <div>
        <p>
          <strong>{gettext('Option set')}{': '}</strong>
          <CodeLink className="code-options" uri={optionset.uri} onClick={() => fetchEdit()} />
        </p>
        <ElementErrors element={optionset} />
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
    case 'plain':
      return elementNode
  }
}

OptionSet.propTypes = {
  config: PropTypes.object.isRequired,
  optionset: PropTypes.object.isRequired,
  elementActions: PropTypes.object.isRequired,
  display: PropTypes.string,
  filter: PropTypes.object
}

export default OptionSet
