import React, { PropTypes } from 'react'
import { mediumSpace } from '../styles'

function FormItem ({ onUpdateField, name, value, placeholder }) {
  return (
    <div className="form-group">
      <div className='col-sm-12'>
        <label style={mediumSpace}>{placeholder}</label>
        <input
          className='form-control'
          onChange={onUpdateField}
          placeholder={placeholder ? placeholder : name}
          name={name}
          type='text'
          value={value} />
      </div>
    </div>
  )
}

FormItem.propTypes = {
  onUpdateField: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string
}

export default FormItem