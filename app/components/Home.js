import React from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import MainContainer from './MainContainer'
import { server_url, sample_resume_url } from '../config/Globals'

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
      <MainContainer>
        <h1 className='lead'>Simple Resume</h1>
        <embed src={sample_resume_url} width="900px" height="500px" />
        <div>
          <Link to={`/edit/${this.state.hashId}`}>
            <button type='button' className='btn btn-lg btn-success'>Get Started</button>
          </Link>
        </div>
      </MainContainer>
    )
  }
})

export default Home