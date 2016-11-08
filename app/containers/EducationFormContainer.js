import React, { PropTypes } from 'react'
import axios from 'axios'
import EducationForm from '../components/EducationForm'

const EducationFormContainer = React.createClass({
  getInitialState () {
    return {
      school: '',
      graduationDate: '',
      degreeType: '',
      gpa: '',
      maxGpa: '',
      isMajorGpa: false
    }
  },
  handleUpdateInfo (e) {
    this.setState({ [e.target.name]: e.target.value }, () => 
      this.props.handleUpdateContainerData('education', this.state))
  },
  handleUpdateCheckbox(e) {
    const value = e.target.checked;
    // Copy the object so we don't mutate the old state.
    // (This requires an Object.assign polyfill):
    // const checked = Object.assign({}, this.state.checked)
    // console.log('e.target.value: ' + value)
    // console.log('checked[value]: ' + checked[value])
    // console.log('current state of isMajorGpa: ' + this.state.isMajorGpa)
    // if (!this.state.isMajorGpa) {
    //   checked[value] = true;
    // } else {
    //   checked[value] = false;
    // }
    // console.log(this.state)
    this.setState({
      isMajorGpa: value
    }, () => this.props.handleUpdateContainerData('education', this.state));
  },
  render () {
    return (
      <EducationForm
        onUpdateInfo={this.handleUpdateInfo}
        onUpdateCheckbox={this.handleUpdateCheckbox}
        school={this.state.school}
        graduationDate={this.state.graduationDate}
        degreeType={this.state.degreeType}
        gpa={this.state.gpa}
        maxGpa={this.state.maxGpa}
        isMajorGpa={this.state.isMajorGpa} />
    )
  }
});

EducationFormContainer.propTypes = {
  handleUpdateContainerData: PropTypes.func.isRequired
}

export default EducationFormContainer