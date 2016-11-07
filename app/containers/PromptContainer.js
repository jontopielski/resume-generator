import React from 'react'
import Prompt from '../components/Prompt'
import axios from 'axios'
import { server_url } from '../config/Globals'

const PromptContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState () {
    return {
      name: '',
      email: '',
      phoneNumber: ''
    }
  },
  handleSubmitInfo (e) {
    e.preventDefault();
    const { name, email, phoneNumber } = this.state;
    console.log('Submit button pressed!')
    axios.post(`${server_url}/generate?name=${name}&email=${email}&phoneNumber=${phoneNumber}`)
    .then((response) => {
      console.log('Successful post!')
      this.context.router.push({
        pathname: '/resume',
      })
    })
    .catch((err) => console.log(err))
  },
  handleUpdateInfo (e) {
    this.setState({ [e.target.name]: e.target.value });
  },
  render () {
    return (
      <Prompt
        onSubmitInfo={this.handleSubmitInfo}
        onUpdateInfo={this.handleUpdateInfo}
        header={this.props.route.header}
        name={this.state.name}
        email={this.state.email}
        phoneNumber={this.state.phoneNumber} />
    )
  }
});

export default PromptContainer