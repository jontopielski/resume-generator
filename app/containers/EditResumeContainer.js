import React, { PropTypes } from 'react'
import axios from 'axios'
import HeaderFormContainer from './HeaderFormContainer'
import EducationFormContainer from './EducationFormContainer'
import SkillsFormContainer from './SkillsFormContainer'
import MultiFormContainer from './MultiFormContainer'
import SectionHeader from '../components/SectionHeader'
import { space } from '../styles'

const EditResumeContainer = React.createClass({
  getInitialState() {
    return {
      headerData: {},
      educationData: {},
      experienceData: {},
      projectsData: {},
      courseworkData: {},
      skillsData: {}
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
    } else if (section === 'skills') {
      this.setState({
        skillsData: data
      }, () => this.props.updateMainResumeData(section, this.state.skillsData))
    } else {
      console.log('No valid section found for data update.')
    }
  },
  render() {
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
        <SectionHeader sectionName={'Skills'}>
          <SkillsFormContainer
            handleUpdateContainerData={this.handleUpdateContainerData}
            resumeHashId={this.props.resumeHashId} />
        </SectionHeader>
      </div>
    );
  }
})

EditResumeContainer.propTypes = {
  resumeData: PropTypes.object.isRequired,
  resumeHashId: PropTypes.string.isRequired,
  updateMainResumeData: PropTypes.func.isRequired
}

export default EditResumeContainer