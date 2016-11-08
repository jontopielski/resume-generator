import React, { PropTypes } from 'react'
import FormItem from './FormItem'
import { transparentBg, space } from '../styles'

function EducationForm ({school, graduationDate, degreeType, gpa, maxGpa, isMajorGpa, onUpdateInfo, onUpdateCheckbox}) {
    return (
    <div className="jumbotron" style={transparentBg}>
      <h2>Education</h2>
      <hr/>
      <div className="col-sm-12">
        <form>
          <FormItem
            onUpdateField={onUpdateInfo}
            value={school}
            name={'school'}
            placeholder={'School'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            value={graduationDate}
            name={'graduationDate'}
            placeholder={'Graduation Date'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            value={degreeType}
            name={'degreeType'}
            placeholder={'Degree Type (ex: "B.S. in Economics")'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            value={gpa}
            name={'gpa'}
            placeholder={'Gpa'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            value={maxGpa}
            name={'maxGpa'}
            placeholder={'Max Gpa (What is your GPA out of?)'} />
          <FormItem
            onUpdateField={onUpdateCheckbox}
            value={isMajorGpa}
            name={'isMajorGpa'}
            type={'checkbox'}
            placeholder={'Major Gpa?'} />
        </form>
      </div>
    </div>
  )
}

EducationForm.propTypes = {
  onUpdateInfo: PropTypes.func.isRequired,
  onUpdateCheckbox: PropTypes.func.isRequired,
  school: PropTypes.string.isRequired,
  graduationDate: PropTypes.string.isRequired,
  degreeType: PropTypes.string.isRequired,
  gpa: PropTypes.string.isRequired,
  maxGpa: PropTypes.string.isRequired,
  isMajorGpa: PropTypes.bool.isRequired
}

export default EducationForm