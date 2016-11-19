import React, { PropTypes } from 'react'
import FormItem from './FormItem'
import { transparentBg } from '../styles'

function SectionForm ({index, primaryText, secondaryText, startDate, endDate, location, onUpdateInfo}) {
  return (
    <div style={transparentBg}>
        <FormItem
            onUpdateField={onUpdateInfo}
            name={'primaryText'}
            value={primaryText}
            label={'Primary Text'}
            placeholder={'The title text for this section'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            name={'secondaryText'}
            value={secondaryText}
            label={'Secondary Text'}
            placeholder={'The text that goes below the primary text'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            name={'startDate'}
            value={startDate}
            label={'Start Date'}
            placeholder={'Start Date'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            name={'endDate'}
            value={endDate}
            label={'End Date'}
            placeholder={'End Date'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            name={'location'}
            value={location}
            label={'Location'}
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