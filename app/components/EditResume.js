import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import ValidateEditResume from '../helpers/ValidateEditResume'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group col-sm-4">
    <h3 className='lead'>{label}</h3>
    <div>
      <input className='form-control' {...input} type={type} placeholder={label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderSection = ({ fields, meta: { touched, error } }) => (
  <ul>
    <li className='list-unstyled'>
      <button 
        className='btn btn-primary'
        type="button"
        onClick={() => fields.push({})}>
          Add Section
      </button>
      {touched && error && <span>{error}</span>}
    </li>
    {fields.map((section, index) =>
      <li key={index} className='list-unstyled'>
        <Field
          name={`${section}.sectionName`}
          type="text"
          component={renderField}
          label="Section Name"/>
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
        <FieldArray name={`${section}.listItems`} component={renderListItems}/>
        <button
          className='btn btn-danger'
          type="button"
          title="Remove Section"
          onClick={() => fields.remove(index)}>
            Remove Section
        </button>
      </li>
    )}
  </ul>
)

const renderListItems = ({ fields, meta: { error } }) => (
  <ul>
    <div className="form-group col-sm-4 col-sm-offset-4">
      <li className='list-unstyled'>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => fields.push()}>
            Add Decription Item
        </button>
      </li>
    </div>
    {fields.map((listItem, index) =>
      <div key={index} className=''>
        <li className='list-unstyled'>
          <button
            className='btn btn-danger'
            type="button"
            title="Remove Item"
            onClick={() => fields.remove(index)}>
            Remove Item
          </button>
          <Field
            name={listItem}
            type="text"
            component={renderField}
            label={`Bullet #${index + 1}`}
          />
        </li>
      </div>
    )}
    {error && <li className="error">{error}</li>}
  </ul>
)

const EditResume = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <div className='form-group'>
      <form onSubmit={handleSubmit}>
        <FieldArray name="sections" component={renderSection}/>
        <div className=''>
          <button
            className='btn btn-block btn-success'
            type="submit"
            disabled={submitting}>
              Submit
          </button>
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