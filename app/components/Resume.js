import React, { PropTypes } from 'react'
import Loading from './Loading'
import { uploaded_resume_url } from '../config/Globals'
import { transparentBg, resumeStyle } from '../styles'

function Resume ({ isLoading }) {
  return isLoading ? <Loading /> :
  (
    <div style={ resumeStyle }>
      <embed src={uploaded_resume_url} width="100%" height="100%" />
    </div>
  )
}

Resume.propTypes = {
  isLoading: PropTypes.bool.isRequired
}

export default Resume