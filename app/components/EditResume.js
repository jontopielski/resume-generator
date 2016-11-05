import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import ValidateEditResume from '../helpers/ValidateEditResume'
import {smallSpace, mediumSpace, space} from '../styles'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className='row row-condensed'>
    <div className='col-sm-12'>
      <label style={mediumSpace}>{label}</label>
      <div>
        <input className='form-control required' {...input} type={type} placeholder={label}/>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  </div>
)

const renderFieldPlain = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label style={mediumSpace}>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)
const renderHeader = ({ fields, meta: { touched, error } }) => (
  <div>
    <Field
      name={`${section}.name`}
      type="text"
      component={renderField}
      label="Full Name"/>
    <Field
      name={`${section}.phoneNumber`}
      type="text"
      component={renderField}
      label="Phone Number"/>
    <Field
      name={`${section}.email`}
      type="text"
      component={renderField}
      label="Email"/>
  </div>
)

const renderExperienceSection = ({ fields, meta: { touched, error } }) => (
  <div>
    <button
      className='btn btn-primary'
      style={smallSpace}
      type="button"
      onClick={() => fields.push({})}>
        Add Experience Section
    </button>
      {touched && error && <span>{error}</span>}
    <ul>
      {fields.map((section, index) =>
        <li key={index} className='list-unstyled'>
          <Field
            name={`${section}.primaryText`}
            type="text"
            component={renderField}
            label="Company Name"/>
          <Field
            name={`${section}.secondaryText`}
            type="text"
            component={renderField}
            label="Position"/>
          <Field
            name={`${section}.startDate`}
            type="text"
            component={renderField}
            label="Start Date"/>
          <Field
            name={`${section}.endDate`}
            type="text"
            component={renderField}
            label="End Date"/>
          <Field
            name={`${section}.location`}
            type="text"
            component={renderField}
            label="Location"/>
          <FieldArray name={`${section}.listItems`} component={renderExperienceListItems}/>
          <button
            className='btn btn-danger'
            style={mediumSpace}
            type="button"
            title="Remove Subsection"
            onClick={() => fields.remove(index)}>
              Remove Subsection
          </button>
        </li>
      )}
    </ul>
  </div>
)

const renderProjectsSection = ({ fields, meta: { touched, error } }) => (
  <div>
    <button
      className='btn btn-primary'
      style={smallSpace}
      type="button"
      onClick={() => fields.push({})}>
        Add Projects Section
    </button>
      {touched && error && <span>{error}</span>}
    <ul>
      {fields.map((section, index) =>
        <li key={index} className='list-unstyled'>
          <Field
            name={`${section}.primaryText`}
            type="text"
            component={renderField}
            label="Primary Text"/>
          <Field
            name={`${section}.secondaryText`}
            type="text"
            component={renderField}
            label="Secondary Text"/>
          <Field
            name={`${section}.startDate`}
            type="text"
            component={renderField}
            label="Start Date"/>
          <Field
            name={`${section}.endDate`}
            type="text"
            component={renderField}
            label="End Date"/>
          <Field
            name={`${section}.location`}
            type="text"
            component={renderField}
            label="Location"/>
          <FieldArray name={`${section}.listItems`} component={renderExperienceListItems}/>
          <button
            className='btn btn-danger'
            style={mediumSpace}
            type="button"
            title="Remove Subsection"
            onClick={() => fields.remove(index)}>
              Remove Subsection
          </button>
        </li>
      )}
    </ul>
  </div>
)

const renderCourseworkSection = ({ fields, meta: { touched, error } }) => (
  <div>
    <button
      className='btn btn-primary'
      style={smallSpace}
      type="button"
      onClick={() => fields.push({})}>
        Add Coursework Section
    </button>
      {touched && error && <span>{error}</span>}
    <ul>
      {fields.map((section, index) =>
        <li key={index} className='list-unstyled'>
          <Field
            name={`${section}.primaryText`}
            type="text"
            component={renderField}
            label="Primary Text"/>
          <Field
            name={`${section}.secondaryText`}
            type="text"
            component={renderField}
            label="Secondary Text"/>
          <Field
            name={`${section}.startDate`}
            type="text"
            component={renderField}
            label="Start Date"/>
          <Field
            name={`${section}.endDate`}
            type="text"
            component={renderField}
            label="End Date"/>
          <Field
            name={`${section}.location`}
            type="text"
            component={renderField}
            label="Location"/>
          <FieldArray name={`${section}.listItems`} component={renderExperienceListItems}/>
          <button
            className='btn btn-danger'
            style={mediumSpace}
            type="button"
            title="Remove Subsection"
            onClick={() => fields.remove(index)}>
              Remove Subsection
          </button>
        </li>
      )}
    </ul>
  </div>
)

const renderSection = ({ fields, meta: { touched, error } }) => (
  <div>
    <button
      className='btn btn-primary'
      style={smallSpace}
      type="button"
      onClick={() => fields.push({})}>
        Add Subsection
    </button>
      {touched && error && <span>{error}</span>}
    <ul>
      {fields.map((section, index) =>
        <li key={index} className='list-unstyled'>
          <Field
            name={`${section}.primaryText`}
            type="text"
            component={renderField}
            label="Primary Text"/>
          <Field
            name={`${section}.secondaryText`}
            type="text"
            component={renderField}
            label="Secondary Text"/>
          <Field
            name={`${section}.startDate`}
            type="text"
            component={renderField}
            label="Start Date"/>
          <Field
            name={`${section}.endDate`}
            type="text"
            component={renderField}
            label="End Date"/>
          <Field
            name={`${section}.location`}
            type="text"
            component={renderField}
            label="Location"/>
          <FieldArray name={`${section}.listItems`} component={renderListItems}/>
          <button
            className='btn btn-danger'
            style={mediumSpace}
            type="button"
            title="Remove Subsection"
            onClick={() => fields.remove(index)}>
              Remove Subsection
          </button>
        </li>
      )}
    </ul>
  </div>
)

const renderSkills = ({ fields, meta: { touched, error } }) => (
  <div>
    <button
      className='btn btn-primary'
      style={smallSpace}
      type="button"
      onClick={() => fields.push({})}>
        Add Skill Section
    </button>
      {touched && error && <span>{error}</span>}
    <ul>
      {fields.map((section, index) =>
        <li key={index} className='list-unstyled'>
          <Field
            name={`${section}.listName`}
            type="text"
            component={renderField}
            label="Skill Section"/>
          <FieldArray name={`${section}.listItems`} component={renderListItems}/>
          <button
            className='btn btn-danger'
            style={mediumSpace}
            type="button"
            title="Remove Skill Section"
            onClick={() => fields.remove(index)}>
              Remove Skill Section
          </button>
        </li>
      )}
    </ul>
  </div>
)

const renderListItems = ({ fields, meta: { error } }) => (
  <div>
    <button
      className="btn btn-block btn-primary"
      style={mediumSpace}
      type="button"
      onClick={() => fields.push()}>
        Add Item
    </button>
    <ul>
      {fields.map((listItem, index) =>
        <div key={index} className=''>
          <li className='list-unstyled'>
            <Field
              name={listItem}
              type="text"
              component={renderField}
              label={`Item #${index + 1}`}
            />
            <button
              className='btn btn-danger'
              style={smallSpace}
              type="button"
              title="Remove Item"
              onClick={() => fields.remove(index)}>
              Remove Item
            </button>
          </li>
        </div>
      )}
      {error && <li className="error">{error}</li>}
    </ul>
  </div>
)

const renderExperienceListItems = ({ fields, meta: { error } }) => (
  <div>
    <button
      className="btn btn-block btn-primary"
      style={mediumSpace}
      type="button"
      onClick={() => fields.push()}>
        Add Description Item
    </button>
    <ul>
      {fields.map((listItem, index) =>
        <div key={index} className=''>
          <li className='list-unstyled'>
            <Field
              name={listItem}
              type="text"
              component={renderField}
              label={`Description Item #${index + 1}`}
            />
            <button
              className='btn btn-danger'
              style={smallSpace}
              type="button"
              title="Remove Item"
              onClick={() => fields.remove(index)}>
              Remove Item
            </button>
          </li>
        </div>
      )}
      {error && <li className="error">{error}</li>}
    </ul>
  </div>
)

const EditResume = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <div className='form-group'>
      <form onSubmit={handleSubmit}>
        <div className='header-section'>
          <h2>Header</h2>
          <hr/>
          <div>
            <Field
              name={`header.name`}
              type="text"
              component={renderField}
              label="Full Name"/>
            <Field
              name={`header.phoneNumber`}
              type="text"
              component={renderField}
              label="Phone Number"/>
            <Field
              name={`header.email`}
              type="text"
              component={renderField}
              label="Email"/>
          </div>
        </div>
        <div className='education-section'>
          <h2>Education</h2>
          <hr/>
          <div>
            <Field
              name={`education.college`}
              type="text"
              component={renderField}
              label="School Attended"/>
            <Field
              name={`education.graduationDate`}
              type="text"
              component={renderField}
              label="Graduation Date (if applicable)"/>
            <Field
              name={`education.degreeType`}
              type="text"
              component={renderField}
              label="Degree Type (ex: B.S. in Economics)"/>
            <Field
              name={`education.gpa`}
              type="text"
              component={renderField}
              label="Current GPA"/>
            <Field
              name={`education.maxGpa`}
              type="text"
              component={renderField}
              label="Max GPA"/>
            <Field
              name={`education.isMajorGpa`}
              type="checkbox"
              component={renderFieldPlain}
              label="Major GPA?"/>
          </div>
        </div>
        <div className='experience-section'>
          <h2 style={space}>Experience</h2>
          <hr/>
          <FieldArray name="experience" component={renderExperienceSection}/>
        </div>
        {
        /* <div className='additional-sections'>
            <h2 style={space}>Additional Sections</h2>
            <hr/>
            <Field name="sectionName" type="text" component={renderField} label="Section Name"/>
            <FieldArray name="additionalSections" component={renderSection}/>
          </div>
        */
        }
        <div className='projects-section'>
          <h2 style={space}>Projects</h2>
          <hr/>
          <FieldArray name="projects" component={renderProjectsSection}/>
        </div>
        <div className='relevant-coursework-section'>
          <h2 style={space}>Relevant Coursework</h2>
          <hr/>
          <FieldArray name="relevant-coursework" component={renderCourseworkSection}/>
        </div>
        <div className='skills-sections'>
          <h2 style={space}>Skills</h2>
          <hr/>
          <FieldArray name="skills" component={renderSkills}/>
        </div>
        <div className='col-sm-6'>
          <button
            className='btn btn-block btn-success'
            type="submit"
            disabled={submitting}>
              Submit
          </button>
        </div>
        <div className='col-sm-6'>
          <button
            className='btn btn-block btn-danger'
            type="button"
            disabled={pristine || submitting}
            onClick={reset}>
              Clear Values
          </button>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'editResume'
})(EditResume)