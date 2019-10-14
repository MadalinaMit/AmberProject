import React, {Component} from 'react';
import axios from 'axios';

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: [],
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    axios.post('/register', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        Registration

        <form onSubmit={this.handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} required />
        <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
        <input type="password" name="password_confirmation" placeholder="Password" value={this.state.password_confirmation} onChange={this.handleChange} required />
        <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}
