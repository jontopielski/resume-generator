import React from 'react'
import {transparentBg} from '../styles'

function MainContainer ({children}) {
  return (
    <div className="jumbotron" style={transparentBg}>
      {children}
    </div>
  )
}

export default MainContainer