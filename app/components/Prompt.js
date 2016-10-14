import React, { PropTypes } from 'react'
import FormItem from './FormItem'
import { transparentBg } from '../styles'

function Prompt ({header, name, email, phoneNumber, onUpdateInfo, onSubmitInfo}) {
  return (
    <div className="jumbotron col-sm-6 col-sm-offset-3 text-center" style={transparentBg}>
      <h1>{header}</h1>
      <div className="col-sm-12">
        <form onSubmit={onSubmitInfo}>
          <FormItem
            onUpdateField={onUpdateInfo}
            value={name}
            name={'name'}
            placeholder={'Name'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            value={email}
            name={'email'}
            placeholder={'Email'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            value={phoneNumber}
            name={'phoneNumber'}
            placeholder={'Phone Number'} />
          <div className="form-group col-sm-4 col-sm-offset-4">
            <button
              className="btn btn-block btn-success"
              type="submit">
                Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

Prompt.propTypes = {
  onSubmitInfo: PropTypes.func.isRequired,
  onUpdateInfo: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired
}

export default Prompt