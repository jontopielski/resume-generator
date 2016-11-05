import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { transparentBg, mediumSpace } from '../styles'

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

const HeaderForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
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
  )
}

export default reduxForm({
  form: 'header'
})(HeaderForm)