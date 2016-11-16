import React from 'react'
import { maxHeight } from '../styles'

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