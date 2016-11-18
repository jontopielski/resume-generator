import React from 'react'
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router'
import Main from '../components/Main'
import LandingPage from '../components/LandingPage'
import PromptContainer from '../containers/PromptContainer'
import ResumeContainer from '../containers/ResumeContainer'
import ResumePage from '../components/ResumePage'
import ErrorPage from '../components/ErrorPage'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { reducer as formReducer } from 'redux-form'

const reducers = {
  form: formReducer
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={LandingPage} />
      <Route path='startResume' header='Resume Header' component={PromptContainer} />
      <Route path='resume' header='Resume' component={ResumeContainer} />
      <Route path='edit/:hashId' header='Edit' component={ResumePage} />
      <Route path='edit' header='Edit' component={ErrorPage} />
    </Route>
  </Router>
);

export default routes