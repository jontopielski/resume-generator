import React, { PropTypes } from 'react'
import FormItem from './FormItem'
import { transparentBg } from '../styles'

function HeaderForm ({header, name, email, phoneNumber, onUpdateInfo, onSubmitInfo}) {
  return (
    <div className="jumbotron" style={transparentBg}>
      <h2>Header</h2>
      <hr/>
      <div className="col-sm-12">
        <form>
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
        </form>
      </div>
    </div>
  )
}

HeaderForm.propTypes = {
  onUpdateInfo: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired
}

export default HeaderForm