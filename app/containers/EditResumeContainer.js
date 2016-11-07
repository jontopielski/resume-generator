import React, { PropTypes } from 'react'
import axios from 'axios'
import HeaderFormContainer from '../containers/HeaderFormContainer'
import { server_url } from '../config/Globals'
import { space } from '../styles'

function createDummyData(data) {
  let json_data = {}
  json_data['sections'] = []
  json_data['sections'][0] = {}
  json_data['sections'][0]['email'] = data['header']['email']
  json_data['sections'][0]['name'] = data['header']['name']
  json_data['sections'][0]['phoneNumber'] = data['header']['phoneNumber']
  json_data['sections'][0]['sectionName'] = 'header'
  console.log(json_data)
  return json_data
}

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
    console.log(this.props.resumeData)
    this.props.setUpdateResumeFlag(true)
    axios({
      method: 'post',
      url: `${server_url}/generate`,
      data: createDummyData(this.props.resumeData)
    })
    .then((response) => {
      console.log('Successful post!')
      this.props.setUpdateResumeFlag(false)
    })
    .catch((err) => console.log(err))
  },
  render() {
    return (
      <div className='col-sm-12'>
        <div>
          <HeaderFormContainer
            headerData={this.state.headerData}
            handleUpdateContainerData={this.handleUpdateContainerData} />
        </div>
        <div style={space}>
          <button
            className='btn btn-block btn-success'
            style={space}
            type="submit"
            onClick={this.handleSubmit}>
              Update
          </button>
        </div>
      </div>
    );
  }
})

EditResumeContainer.propTypes = {
  resumeData: PropTypes.object.isRequired,
  updateMainResumeData: PropTypes.func.isRequired,
  setUpdateResumeFlag: PropTypes.func.isRequired
}

export default EditResumeContainer