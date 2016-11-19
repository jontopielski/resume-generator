import React, { PropTypes } from 'react'
import axios from 'axios'
import SectionForm from '../components/SectionForm'
import SectionFormContainer from './SectionFormContainer'
import DescriptionItem from '../components/DescriptionItem'
import { resume_bucket_url } from '../config/Globals'
import { space, mediumSpace } from '../styles'

const DescriptionItemsContainer = React.createClass({
  getInitialState () {
    return {
      itemCount: 0,
      descriptionItems: []
    }
  },
  handleAddItem(e) {
    const updatedListItems = this.state.descriptionItems
    updatedListItems[this.state.itemCount] = ''
    this.setState({
      listItems: updatedListItems,
      itemCount: this.state.itemCount + 1
    }, () => this.props.handleUpdateListData(this.state.descriptionItems))
  },
  handleRemoveItem(index) {
    const updatedListItems = this.state.descriptionItems.filter((item, i) =>
      i != index
    )
    this.setState({
      descriptionItems: updatedListItems,
      itemCount: this.state.itemCount - 1
    }, () => this.props.handleUpdateListData(this.state.descriptionItems))
  },
  handleUpdateListContainerData(index, data) {
    const updatedList = this.state.descriptionItems
    updatedList[index] = data
    this.setState({
      descriptionItems: updatedList
    }, () => (this.props.handleUpdateListData(this.state.descriptionItems)))
  },
  render () {
    // console.log('Current state of ' + this.props.sectionName + ' DescriptionItemsContainer:')
    // console.log(this.state.descriptionItems)
    return (
      <div className='col-sm-12'>
        <button
          style={space}
          className='btn btn-primary'
          type="submit"
          onClick={this.handleAddItem}>
            Add Description Item
        </button>
        {
          this.state.descriptionItems.map((item, index) =>
            <div key={index}>
              <DescriptionItem
                index={index}
                value={this.state.descriptionItems[index]}
                name={'Description Item ' + (index+1)}
                initialData={this.state.listItems[index]}
                handleUpdateListContainerData={this.handleUpdateListContainerData} />
              <div className='col-sm-12'>
                <button
                  className='btn btn-danger'
                  style={space}
                  type="submit"
                  onClick={() => this.handleRemoveItem(index)}>
                    Remove Item
                </button>
                <hr/>
              </div>
            </div>
        )}
      </div>
    )
  }
});

DescriptionItemsContainer.propTypes = {
  handleUpdateListData: PropTypes.func.isRequired
}

export default DescriptionItemsContainer