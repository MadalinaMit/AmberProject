import React, {Component} from 'react';
import Registration from "./components/auth/registration";
import Login from "./components/auth/login";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.history.push("/properties");
  }

  render() {
    return (
      <div>
      <h1>Home</h1>
      <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
      <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
      </div>
    );
  }
}
