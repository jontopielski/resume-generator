import React from 'react'
import Prompt from '../components/Prompt'

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
  },
  handleUpdateInfo (e) {
    this.setState({ [e.target.name]: e.target.value });
  },
  render: function () {
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