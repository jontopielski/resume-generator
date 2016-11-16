import React, { PropTypes } from 'react'
import FormItem from './FormItem'
import { transparentBg } from '../styles'

function HeaderForm ({name, email, phoneNumber, address, website, onUpdateInfo}) {
  return (
    <div style={transparentBg}>
      <div className="col-sm-12">
        <form>
          <FormItem
            onUpdateField={onUpdateInfo}
            value={name}
            name={'name'}
            placeholder={'Name*'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            value={email}
            name={'email'}
            placeholder={'Email*'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            value={phoneNumber}
            name={'phoneNumber'}
            placeholder={'Phone Number*'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            value={address}
            name={'address'}
            placeholder={'Address'} />
          <FormItem
            onUpdateField={onUpdateInfo}
            value={website}
            name={'website'}
            placeholder={'Website'} />
        </form>
      </div>
    </div>
  )
}

HeaderForm.propTypes = {
  onUpdateInfo: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired
}

export default HeaderForm