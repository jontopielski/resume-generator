import React, { PropTypes } from 'react'
import axios from 'axios'
import HeaderFormContainer from '../containers/HeaderFormContainer'
import EducationFormContainer from '../containers/EducationFormContainer'
import { server_url } from '../config/Globals'
import { space } from '../styles'

function createDummyData(data) {
  const json_data = {}

  if (data['header']) {
    json_data['sections'] = []
    json_data['sections'][0] = data['header']
    json_data['sections'][0]['sectionName'] = 'header'
  }

  if (data['education']) {
    json_data['sections'][1] = data['education']
    json_data['sections'][1]['sectionName'] = 'education'
  }

  console.log(json_data)
  return json_data
}

const EditResumeContainer = React.createClass({
  getInitialState() {
    return {
      headerData: {},
      educationData: {}
    }
  },
  handleUpdateContainerData(section, data) {
    if (section === 'header') {
      this.setState({
        headerData: data
      }, () => this.props.updateMainResumeData(section, this.state.headerData))
    } else if (section === 'education') {
      this.setState({
        educationData: data
      }, () => this.props.updateMainResumeData(section, this.state.educationData))
    } else {
      console.log('No valid section found for data update.')
    }
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
        <div className='col-sm-12'>
          <HeaderFormContainer
            headerData={this.state.headerData}
            handleUpdateContainerData={this.handleUpdateContainerData} />
        </div>
        <div className='col-sm-12'>
          <EducationFormContainer
            headerData={this.state.educationData}
            handleUpdateContainerData={this.handleUpdateContainerData} />
        </div>
        <div className='col-sm-12'>
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