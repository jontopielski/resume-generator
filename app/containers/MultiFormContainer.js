import React, { PropTypes } from 'react'
import axios from 'axios'
import SectionForm from '../components/SectionForm'
import SectionFormContainer from './SectionFormContainer'
import { resume_bucket_url } from '../config/Globals'
import { space } from '../styles'

const MultiFormContainer = React.createClass({
  getInitialState () {
    return {
      sectionCount: 0,
      listItems: []
    }
  },
  componentDidMount() {
    axios.get(`${resume_bucket_url}/${this.props.resumeHashId}/resume.json`)
      .then((response) => {
        console.log('resume.json from MultiFormContainer: ')
        console.log(response.data)
        if (response.status === 200) {
          if (response.data['sections']) {
            const filtered_data = response.data['sections'].filter((entry) =>
              entry["sectionName"] == this.props.sectionName.toLowerCase()
            )
            if (filtered_data.length == 1) {
              const data = filtered_data[0]
              this.setState({
                listItems: data['listItems']
              }, () => this.props.handleUpdateContainerData(this.props.sectionName.toLowerCase(), this.state))
            }
          }
        }
      })
      .catch((err) =>
        console.log(err)
      )
  },
  handleAddSection(e) {
    const updatedListItems = this.state.listItems
    updatedListItems[this.state.sectionCount] = {}
    this.setState({
      sectionCount: this.state.sectionCount + 1
    })
  },
  handleUpdateMultiContainerData(index, data) {
    const updatedListItems = this.state.listItems
    updatedListItems[index] = data
    this.setState({
      listItems: updatedListItems
    }, () => this.props.handleUpdateContainerData(this.props.sectionName.toLowerCase(), this.state))
  },
  handleRemoveSection(index) {
    const updatedListItems = this.state.listItems.filter((item, i) =>
      i != index
    )
    this.setState({
      listItems: updatedListItems,
      sectionCount: this.state.sectionCount - 1
    })
  },
  render () {
    return (
      <div className='col-sm-12'>
        <button
          className='btn btn-primary'
          type="submit"
          onClick={this.handleAddSection}>
            Add Section
        </button>
        {
          this.state.listItems.map((item, index) =>
            <div key={index}>
              <SectionFormContainer
                index={index}
                handleUpdateMultiContainerData={this.handleUpdateMultiContainerData} />
              <div className='col-sm-12'>
                <button
                  className='btn btn-danger'
                  style={space}
                  type="submit"
                  onClick={() => this.handleRemoveSection(index)}>
                    Remove Section
                </button>
                <hr/>
              </div>
            </div>
        )}
      </div>
    )
  }
});

MultiFormContainer.propTypes = {
  sectionName: PropTypes.string.isRequired,
  resumeHashId: PropTypes.string.isRequired,
  handleUpdateContainerData: PropTypes.func.isRequired
}

export default MultiFormContainer