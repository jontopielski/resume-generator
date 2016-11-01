import React from 'react'
import { Link } from 'react-router'
import MainContainer from './MainContainer'
import { sample_resume_url } from './Globals'

const Home = React.createClass({
  render () {
    return (
      <MainContainer>
        <h1 className='lead'>Simple Resume</h1>
        <embed src={sample_resume_url} width="900px" height="500px" />
        <div>
          <Link to='/startResume'>
            <button type='button' className='btn btn-lg btn-success'>Get Started</button>
          </Link>
        </div>
      </MainContainer>
    )
  }
})

export default Home