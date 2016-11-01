import React, { PropTypes } from 'react'
import Loading from './Loading'
import MainContainer from './MainContainer'
import { uploaded_resume_url } from '../components/Globals'
import { transparentBg } from '../styles'

function Resume ({ isLoading }) {
  return isLoading ? <Loading /> :
  (
    <MainContainer>
      <embed src={uploaded_resume_url} width="900px" height="1200px" />
    </MainContainer>
  )
}

Resume.propTypes = {
  isLoading: PropTypes.bool.isRequired
}

export default Resume