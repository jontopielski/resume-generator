import React from 'react'
import axios from 'axios'
import EditResumeContainer from '../containers/EditResumeContainer'
import ResumeContainer from '../containers/ResumeContainer'
import { transparentBg, floatLeft, floatRight, space, resumePageStyle } from '../styles'
import { server_url, resume_bucket_url } from '../config/Globals'

const ResumePage = React.createClass({
  getInitialState() {
    const resumeHash = this.props.params.hashId
    return {
      resumeData: {},
      updateResume: false,
      hashId: resumeHash
    }
  },
  handleUpdateResumeData(sectionName, updatedData) {
    const updatedResumeData = this.state.resumeData
    updatedResumeData[sectionName] = updatedData
    this.setState({
      resumeData: updatedResumeData
    })
  },
  // shouldUpdate is a boolean
  setUpdateResume(shouldUpdate) {
    this.setState({
      updateResume: shouldUpdate
    })
  },
  render() {
    return (
      <div className="jumbotron col-sm-12" style={resumePageStyle}>
        <div style={floatLeft}>
          <EditResumeContainer
            resumeData={this.state.resumeData}
            updateMainResumeData={this.handleUpdateResumeData}
            setUpdateResumeFlag={this.setUpdateResume}
            resumeHashId={this.state.hashId} />
        </div>
        <div style={floatRight}>
          <ResumeContainer
            shouldUpdateResume={this.state.updateResume}
            resumeHashId={this.state.hashId} />
        </div>
      </div>
    )
  }
})

export default ResumePage