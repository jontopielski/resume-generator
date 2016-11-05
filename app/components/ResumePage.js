import React from 'react'
import EditResume from './EditResume'
import ResumeContainer from '../containers/ResumeContainer'
import {transparentBg, floatLeft, floatRight} from '../styles'

const ResumePage = React.createClass({
  showResults(values) {
    new Promise(resolve => {
      setTimeout(() => {  // simulate server latency
        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
        resolve()
      }, 100)
    })
  },
  render() {
    return (
      <div className="jumbotron col-sm-12 text-center" style={transparentBg}>
        <div style={floatLeft}>
          <EditResume onSubmit={this.showResults}/>
        </div>
        <div style={floatRight}>
          <ResumeContainer />
        </div>
      </div>
    )
  }
})

export default ResumePage