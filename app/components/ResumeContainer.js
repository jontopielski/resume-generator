import React from 'react'
import MainContainer from './MainContainer'
import { uploaded_resume_url } from './Globals'

const ResumeContainer = React.createClass({
  // getInitialState() {
  //   return {
  //     isLoading: true
  //   }
  // },
  // componentDidMount() {

  // }
  render() {
    return (
      <MainContainer>
        <embed src={uploaded_resume_url} width="900px" height="500px" />
      </MainContainer>
    )
  }
})

export default ResumeContainer