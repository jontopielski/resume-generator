import React from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { server_url, sample_resume_url } from '../config/Globals'
import { titleTextBox, transparentBg, backgroundImage, landingPageTop, landingPage } from '../styles'

const Home = React.createClass({
  getInitialState() {
    return {
      hashId: ''
    }
  },
  componentDidMount() {
    console.log('Calling BE to create new hash code..')
    axios.get(`${server_url}/hash`)
      .then((response) => {
        console.log('Setting hash to: ' + response.data)
        if (response.status === 200) {
          this.setState({
            hashId: response.data
          })
        }
      })
      .catch((err) =>
        console.log(err)
      )
  },
  render () {
    return (
      <div className='jumbotron' style={landingPage}>
        <div className='top' style={backgroundImage}>
          <div style={landingPageTop}>
            <div style={titleTextBox}>
              <h1 className='lead'>Simple CS Resume</h1>
            </div>
          </div>
        </div>
        <div>
          <embed src={sample_resume_url} width="900px" height="500px" />
        </div>
        <div>
          <Link to={`/edit/${this.state.hashId}`}>
            <button type='button' className='btn btn-lg btn-success'>Get Started</button>
          </Link>
        </div>
      </div>
    )
  }
})

export default Home