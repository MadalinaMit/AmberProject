import React, {Component} from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: [],
      email: "",
      password: "",
      loginErrors: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    axios.post('/login', {
      email: this.state.email,
      password: this.state.password
    })
    .then(response => {
      if(response.data.success) {
        this.props.handleSuccessfulAuth(response.data);
      } else if (response.data.error) {
        alert(response.data.error);
      }
    })
    .catch(function (error) {
      alert("An error occured, please try again!");
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        Login
        <form onSubmit={this.handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
        <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
