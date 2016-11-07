import React, { PropTypes } from 'react'
import Resume from '../components/Resume'
import axios from 'axios'
import { uploaded_resume_url } from '../config/Globals'

const ResumeContainer = React.createClass({
  getInitialState() {
    return {
      isLoading: true,
    }
  },
  componentDidMount() {
    console.log('componentDidMount() called from ResumeContainer')
    axios.get(uploaded_resume_url)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            isLoading: false
          })
        }
      })
      .catch((err) => console.log(err))
  },
  render() {
    return (
      <Resume
        isLoading={this.state.isLoading} />
    )
  }
})

ResumeContainer.propTypes = {
  resumeData: PropTypes.object.isRequired
}

export default ResumeContainer