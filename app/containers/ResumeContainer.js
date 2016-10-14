import React from 'react'
import Resume from '../components/Resume'
import axios from 'axios'
import { uploaded_resume_url } from '../components/Globals'

const ResumeContainer = React.createClass({
  getInitialState() {
    return {
      isLoading: true
    }
  },
  componentDidMount() {
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

export default ResumeContainer