import React, { PropTypes } from 'react'
import Resume from '../components/Resume'
import axios from 'axios'
import { uploaded_resume_url, server_url, current_version, resume_bucket_url } from '../config/Globals'
import { space, maxHeight } from '../styles'

const ResumeContainer = React.createClass({
  getInitialState() {
    return {
      isLoading: true,
    }
  },
  componentDidMount() {
    axios.get(uploaded_resume_url)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            isLoading: false
          })
        }
      })
      .catch((err) => console.log(err))
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdateResume) {
      this.setState({
        isLoading: true
      })
    } else {
      this.setState({
        isLoading: false
      })
    }
  },
  // ${resume_bucket_url}/${this.resumeHashId}/resume.pdf
  handleSubmit(e) {
    e.preventDefault()
    this.setState({ // Prompt re-rendering of resume
      isLoading: true
    })
    axios({
      method: 'post',
      url: `${server_url}/generate?hashId=${this.props.resumeHashId}`,
      data: formatJsonData(this.props.resumeData)
    })
    .then((response) => {
      this.setState({ // Prompt re-rendering of resume
        isLoading: false
      })
    })
    .catch((err) => console.log(err))
  },
  render() {
    return (
      <div style={{height: '90%'}}>
        <div className='list-group'>
          <ul className='list-inline' style={{margin: '1.5em 0 0 1.5em'}}>
            <li>
              <button
                className='list-group-item list-group-item-action list-group-item-success'
                type="submit"
                onClick={this.handleSubmit}>
                  <strong>Update Resume</strong>
              </button>
            </li>
            <li style={{marginLeft: '1.5em'}}>
              <a
                className='list-group-item list-group-item-action'
                href={`${resume_bucket_url}/${this.props.resumeHashId}/resume.pdf`}
                download='resume.pdf'>
                  Download .pdf
              </a>
            </li>
          </ul>            
        </div>
        <div style={maxHeight}>
          <Resume
            isLoading={this.state.isLoading}
            resumeHashId={this.props.resumeHashId} />
        </div>
      </div>
    )
  }
})

ResumeContainer.propTypes = {
  shouldUpdateResume: PropTypes.bool.isRequired,
  resumeHashId: PropTypes.string.isRequired,
  resumeData: PropTypes.object.isRequired
}

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

  if (data['skills']) {
    json_data['sections'][index] = data['skills']
    json_data['sections'][index]['sectionName'] = 'skills'
    index++
  }


  return json_data
}

export default ResumeContainer