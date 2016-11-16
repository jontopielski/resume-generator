import React, { PropTypes } from 'react'
import axios from 'axios'
import HeaderFormContainer from './HeaderFormContainer'
import EducationFormContainer from './EducationFormContainer'
import MultiFormContainer from './MultiFormContainer'
import SectionHeader from '../components/SectionHeader'
import { server_url, current_version } from '../config/Globals'
import { space } from '../styles'

function formatJsonData(data) {
  const json_data = {}

  json_data['version'] = current_version
  json_data['sections'] = []

  let index = 0

  if (data['header']) {
    json_data['sections'][index] = data['header']
    json_data['sections'][index]['sectionName'] = 'header'
    index++
  }

  if (data['education']) {
    json_data['sections'][index] = data['education']
    json_data['sections'][index]['sectionName'] = 'education'
    index++
  }

  if (data['experience']) {
    json_data['sections'][index] = data['experience']
    json_data['sections'][index]['sectionName'] = 'experience'
    index++
  }

  if (data['projects']) {
    json_data['sections'][index] = data['projects']
    json_data['sections'][index]['sectionName'] = 'projects'
    index++
  }

  if (data['coursework']) {
    json_data['sections'][index] = data['coursework']
    json_data['sections'][index]['sectionName'] = 'coursework'
    index++
  }

  return json_data
}

const EditResumeContainer = React.createClass({
  getInitialState() {
    return {
      headerData: {},
      educationData: {},
      experienceData: {},
      projectsData: {},
      courseworkData: {}
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
    } else if (section === 'experience') {
      this.setState({
        experienceData: data
      }, () => this.props.updateMainResumeData(section, this.state.experienceData))
    } else if (section === 'projects') {
      this.setState({
        projectsData: data
      }, () => this.props.updateMainResumeData(section, this.state.projectsData))
    } else if (section === 'coursework') {
      this.setState({
        courseworkData: data
      }, () => this.props.updateMainResumeData(section, this.state.courseworkData))
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
      url: `${server_url}/generate?hashId=${this.props.resumeHashId}`,
      data: formatJsonData(this.props.resumeData)
    })
    .then((response) => {
      console.log(response)
      this.props.setUpdateResumeFlag(false)
    })
    .catch((err) => console.log(err))
  },
  render() {
    console.log('EditResumeContainer resumeData:')
    console.log(this.props.resumeData)
    return (
      <div className='col-sm-12'>
        <SectionHeader sectionName={'Header'}>
          <HeaderFormContainer
            handleUpdateContainerData={this.handleUpdateContainerData}
            resumeHashId={this.props.resumeHashId} />
        </SectionHeader>
        <SectionHeader sectionName={'Education'}>
          <EducationFormContainer
            handleUpdateContainerData={this.handleUpdateContainerData}
            resumeHashId={this.props.resumeHashId} />
        </SectionHeader>
        <SectionHeader sectionName={'Experience'}>
          <MultiFormContainer
            sectionName={'Experience'}
            handleUpdateContainerData={this.handleUpdateContainerData}
            resumeHashId={this.props.resumeHashId} />
        </SectionHeader>
        <SectionHeader sectionName={'Projects'}>
          <MultiFormContainer
            sectionName={'Projects'}
            handleUpdateContainerData={this.handleUpdateContainerData}
            resumeHashId={this.props.resumeHashId} />
        </SectionHeader>
        <SectionHeader sectionName={'Coursework'}>
          <MultiFormContainer
            sectionName={'Coursework'}
            handleUpdateContainerData={this.handleUpdateContainerData}
            resumeHashId={this.props.resumeHashId} />
        </SectionHeader>
        <div className='col-sm-12'>
          <button
            className='btn btn-block btn-success'
            style={space}
            type="submit"
            onClick={this.handleSubmit}>
              Update Resume
          </button>
        </div>
      </div>
    );
  }
})

EditResumeContainer.propTypes = {
  resumeData: PropTypes.object.isRequired,
  resumeHashId: PropTypes.string.isRequired,
  updateMainResumeData: PropTypes.func.isRequired,
  setUpdateResumeFlag: PropTypes.func.isRequired
}

export default EditResumeContainer