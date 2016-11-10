import React, { PropTypes } from 'react'
import FormItem from './FormItem'
import { transparentBg } from '../styles'

function SectionForm ({index, primaryText, secondaryText, startDate, endDate, location, onUpdateInfo}) {
  return (
    <div style={transparentBg}>
        <FormItem
            onUpdateField={onUpdateInfo}
            value={primaryText}
            name={'primaryText'}
            placeholder={'Primary Text'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            value={secondaryText}
            name={'secondaryText'}
            placeholder={'Secondary Text'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            value={startDate}
            name={'startDate'}
            placeholder={'Start Date'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            value={endDate}
            name={'endDate'}
            placeholder={'End Date'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            value={location}
            name={'location'}
            placeholder={'Location'} />
      <hr/>
    </div>
  )
}

SectionForm.propTypes = {
  onUpdateInfo: PropTypes.func.isRequired,
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
}

export default SectionForm