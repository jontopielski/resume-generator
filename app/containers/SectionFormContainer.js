import React, { PropTypes } from 'react'
import axios from 'axios'
import SectionForm from '../components/SectionForm'

const SectionFormContainer = React.createClass({
  getInitialState () {
    return {
      primaryText: '',
      secondaryText: '',
      startDate: '',
      endDate: '',
      location: '',
      descriptionItems: [
        'item1',
        'item2',
        'item3'
      ]
    }
  },
  handleUpdateInfo (e) {
    this.setState(
      { [e.target.name]: e.target.value }, () => (
      this.props.handleUpdateMultiContainerData(this.props.index, this.state))
    )
  },
  render () {
    return (
      <SectionForm
        onUpdateInfo={this.handleUpdateInfo}
        primaryText={this.state.primaryText}
        secondaryText={this.state.secondaryText}
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        location={this.state.location} />
    )
  }
});

SectionFormContainer.propTypes = {
  index: PropTypes.number.isRequired,
  handleUpdateMultiContainerData: PropTypes.func.isRequired
}

export default SectionFormContainer