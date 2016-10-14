import React, { PropTypes } from 'react'

function FormItem ({ onUpdateField, name, value, placeholder }) {
  return (
    <div className="form-group">
      <input
        className='form-control'
        onChange={onUpdateField}
        placeholder={placeholder ? placeholder : name}
        name={name}
        type='text'
        value={value} />
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