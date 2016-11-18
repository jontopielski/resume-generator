import React from 'react'
import { maxHeight } from '../styles'
import LandingPage from './LandingPage'

const Main = React.createClass({
	render() {
    return (
      <div style={maxHeight}>
        {this.props.children}
      </div>
    )
	}
})

export default Main