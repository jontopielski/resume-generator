import React from 'react'
import EditResume from './EditResume'
import axios from 'axios'
import ResumeContainer from '../containers/ResumeContainer'
import {transparentBg, floatLeft, floatRight} from '../styles'
import { server_url } from '../components/Globals'

const ResumePage = React.createClass({
  showResults(values) {
    console.log(values)
    axios({
      method: 'post',
      url: `${server_url}/create_test`,
      data: values
    })
    .then((response) => {
      console.log('Successful post!')
    })
    .catch((err) => console.log(err))
    {this.render()}
  },
  render() {
    return (
      <div className="jumbotron col-sm-12" style={transparentBg}>
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