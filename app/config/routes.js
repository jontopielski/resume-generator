import React from 'react'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import Main from '../components/Main'
import Home from '../components/Home'
import PromptContainer from '../containers/PromptContainer'
import ResumeContainer from '../containers/ResumeContainer'
import ResumePage from '../components/ResumePage'
import ContactForm from '../components/ContactForm'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { reducer as formReducer } from 'redux-form'

const reducers = {
  form: formReducer
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)

const routes = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={Main}>
        <IndexRoute component={Home} />
        <Route path='startResume' header='Resume Header' component={PromptContainer} />
        <Route path='form' header='Resume Form' component={ContactForm} />
        <Route path='resume' header='Resume' component={ResumeContainer} />
        <Route path='edit' header='Edit' component={ResumePage} />
      </Route>
    </Router>
  </Provider>
);

export default routes