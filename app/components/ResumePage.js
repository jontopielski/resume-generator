import React from 'react'
import axios from 'axios'
import EditResumeContainer from '../containers/EditResumeContainer'
import ResumeContainer from '../containers/ResumeContainer'
import { transparentBg, floatLeft, floatRight, space} from '../styles'
import { server_url } from '../config/Globals'

const ResumePage = React.createClass({
  getInitialState() {
    return {
      resumeData: {},
      updateResume: false
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
      <div className="jumbotron col-sm-12" style={transparentBg}>
        <div style={floatLeft}>
          <EditResumeContainer
            resumeData={this.state.resumeData}
            updateMainResumeData={this.handleUpdateResumeData}
            setUpdateResumeFlag={this.setUpdateResume} />
        </div>
        <div style={floatRight}>
          <ResumeContainer
            shouldUpdateResume={this.state.updateResume} />
        </div>
      </div>
    )
  }
})

export default ResumePage