import React from 'react'
import ContactForm from '../components/ContactForm'

const EditResumeContainer = React.createClass({
   handleSubmit(e) {
    console.log('Submitted.');
  },
  render() {
    return (
      <ContactForm onSubmit={this.handleSubmit} />
    );
  }
})

export default EditResumeContainer