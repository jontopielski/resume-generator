import React, { PropTypes } from 'react'
import axios from 'axios'
import HeaderForm from '../components/HeaderForm'

const HeaderFormContainer = React.createClass({
  getInitialState () {
    return {
      name: '',
      email: '',
      phoneNumber: ''
    }
  },
  handleUpdateInfo (e) {
    this.setState({ [e.target.name]: e.target.value })
    this.props.handleUpdateContainerData('header', this.state)
  },
  render () {
    return (
      <HeaderForm
        onUpdateInfo={this.handleUpdateInfo}
        name={this.state.name}
        email={this.state.email}
        phoneNumber={this.state.phoneNumber} />
    )
  }
});

HeaderFormContainer.propTypes = {
  handleUpdateContainerData: PropTypes.func.isRequired
}

export default HeaderFormContainer