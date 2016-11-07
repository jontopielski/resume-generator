import React, { PropTypes } from 'react'
import axios from 'axios'
import HeaderFormContainer from '../containers/HeaderFormContainer'
import { server_url } from '../config/Globals'
import { } from '../styles'

const EditResumeContainer = React.createClass({
  getInitialState() {
    return {
      headerData: {}
    }
  },
  handleUpdateContainerData(data) {
    this.setState({
      headerData: data
    })
    this.props.updateMainResumeData('header', this.state.headerData)
  },
  handleSubmit(e) {
    e.preventDefault()
    console.log(`Attempting to submit ${this.props.resumeData}`)
    axios({
      method: 'post',
      url: `${server_url}/generate`,
      data: this.state.resumeData
    })
    .then((response) => {
      console.log('Successful post!')
    })
    .catch((err) => console.log(err))
  },
  render() {
    return (
      <div>
        <div>
          <HeaderFormContainer
            headerData={this.state.headerData}
            handleUpdateContainerData={this.handleUpdateContainerData} />
        </div>
        <div>
          <button
            className='btn btn-block btn-success'
            type="submit"
            onClick={this.handleSubmit}>
              Submit
          </button>
        </div>
      </div>
    );
  }
})

EditResumeContainer.propTypes = {
  resumeData: PropTypes.object.isRequired,
  updateMainResumeData: PropTypes.func.isRequired
}

export default EditResumeContainer