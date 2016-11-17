import React, { PropTypes } from 'react'
import Loading from './Loading'
import { uploaded_resume_url, resume_bucket_url } from '../config/Globals'
import { transparentBg, resumeStyle } from '../styles'

function Resume ({ isLoading, resumeHashId }) {
  // console.log('Re-rendering Resume')
  return isLoading ? <Loading /> :
  (
    <div style={ resumeStyle }>
      <embed src={resume_bucket_url + `/${resumeHashId}/resume.pdf`} width="100%" height="100%" />
    </div>
  )
}

Resume.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  resumeHashId: PropTypes.string.isRequired
}

export default Resume