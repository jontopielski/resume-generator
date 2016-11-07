import React from 'react'
import axios from 'axios'
import EditResumeContainer from '../containers/EditResumeContainer'
import ResumeContainer from '../containers/ResumeContainer'
import {transparentBg, floatLeft, floatRight} from '../styles'
import { server_url } from '../config/Globals'

const ResumePage = React.createClass({
  getInitialState() {
    return {
      resumeData: {}
    }
  },
  handleUpdateResumeData(sectionName, updatedData) {
    // console.log(this.state.resumeData)
    let updatedResumeData = this.state.resumeData
    updatedResumeData[sectionName] = updatedData
    this.setState({
      resumeData: updatedResumeData
    })
  },
  render() {
    return (
      <div className="jumbotron col-sm-12" style={transparentBg}>
        <div style={floatLeft}>
          <EditResumeContainer resumeData={this.state.resumeData} updateMainResumeData={this.handleUpdateResumeData} />
        </div>
        <div style={floatRight}>
          <ResumeContainer resumeData={this.state.resumeData} />
        </div>
      </div>
    )
  }
})

export default ResumePage