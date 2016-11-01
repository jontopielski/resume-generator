import React from 'react'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import Main from '../components/Main'
import Home from '../components/Home'
import PromptContainer from '../containers/PromptContainer'
import ResumeContainer from '../containers/ResumeContainer'
import EditResumeContainer from '../containers/EditResumeContainer'

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route path='startResume' header='Resume Header' component={PromptContainer} />
      <Route path='resume' header='Resume' component={ResumeContainer} />
      <Route path='edit' header='Edit' component={EditResumeContainer} />
    </Route>
  </Router>
);

export default routes