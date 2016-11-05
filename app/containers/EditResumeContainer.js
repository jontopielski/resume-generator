import React from 'react'
import HeaderForm from '../components/HeaderForm'

const EditResumeContainer = React.createClass({
   handleSubmit(e) {
    console.log('Submitted.');
  },
  render() {
    return (
      <HeaderForm onSubmit={this.handleSubmit} />
    );
  }
})

export default EditResumeContainer