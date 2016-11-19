import React, { PropTypes } from 'react'
import axios from 'axios'
import SectionForm from '../components/SectionForm'
import DescriptionItemsContainer from './DescriptionItemsContainer'
import { space } from '../styles'

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

const SectionFormContainer = React.createClass({
  getInitialState () {
    return {
      primaryText: '',
      secondaryText: '',
      startDate: '',
      endDate: '',
      location: '',
      descriptionItems: []
    }
  },
  componentDidMount() {
    if (!this.props.initialData && !isEmptyObject(this.props.initialData)) {
      console.log('InitialData:')
      console.log(this.props.initialData)
      this.setState({
        primaryText: this.props.initialData['primaryText'],
        secondaryText: this.props.initialData['secondaryText'],
        startDate: this.props.initialData['startDate'],
        endDate: this.props.initialData['endDate'],
        location: this.props.initialData['location'],
        descriptionItems: this.props.initialData['descriptionItems']
      }, () => (this.props.handleUpdateMultiContainerData(this.props.index, this.state)))
    }
  },
  handleUpdateInfo (e) {
    this.setState(
      { [e.target.name]: e.target.value }, () => (
      this.props.handleUpdateMultiContainerData(this.props.index, this.state))
    )
  },
  handleUpdateListData(listData) {
    console.log('SFC updating MFC with new listData:')
    console.log(listData)
    this.setState({
      descriptionItems: listData
    }, () => (this.props.handleUpdateMultiContainerData(this.props.index, this.state)))
  },
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <SectionForm
            onUpdateInfo={this.handleUpdateInfo}
            primaryText={this.state.primaryText}
            secondaryText={this.state.secondaryText}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            location={this.state.location} />
        </div>
        <div className='row'>
          <DescriptionItemsContainer
            handleUpdateListData={this.handleUpdateListData} />
        </div>
      </div>
    )
  }
});

SectionFormContainer.propTypes = {
  index: PropTypes.number.isRequired,
  handleUpdateMultiContainerData: PropTypes.func.isRequired,
  initialData: PropTypes.object
}

export default SectionFormContainer