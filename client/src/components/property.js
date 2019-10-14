import React, {Component} from 'react';
import axios from 'axios';

export default class AddProperty extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      ptype: "",
      coordinates: "",
      price: "",
      currency: "",
      images: "",
      type: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    axios.post('/saveproperty', {
      name: this.state.name,
      description: this.state.description,
      ptype: this.state.ptype,
      coordinates: this.state.coordinates,
      price: this.state.price,
      currency: this.state.currency,
      images: this.state.images,
      type: this.state.type
    })
    .then(function (response) {
      if(response.data.success) {
        console.log("success");
      }
    })
    .catch(function (error) {
      alert("An error occured, please try again!");
    });
    this.setState({
      name: "",
      description: "",
      ptype: "",
      coordinates: "",
      price: "",
      currency: "",
      images: "",
      type: ""
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
      <h1> Add Property </h1>
      <form name="addFrom" onSubmit={this.handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} required />
      <input type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleChange} required />
      <input type="text" name="ptype" placeholder="Point Type" value={this.state.ptype} onChange={this.handleChange} required />
      <input type="text" name="coordinates" placeholder="Coordinates" value={this.state.coordinates} onChange={this.handleChange} required />
      <input type="text" name="price" placeholder="Sold Price" value={this.state.price} onChange={this.handleChange} required />
      <input type="text" name="currency" placeholder="Currency" value={this.state.currency} onChange={this.handleChange} required />
      <input type="text" name="images" placeholder="Images" value={this.state.images} onChange={this.handleChange} required />
      <input type="text" name="type" placeholder="Property Type" value={this.state.type} onChange={this.handleChange} required />
      <button type="submit">Add Property</button>
      </form>

      <form action="/properties">
        <input type="submit" value="View Properties" />
      </form>
      </div>
    );
  }
}
