import React, {Component} from 'react';
import "./properties.css";
import Popup from "reactjs-popup";

export default class Properties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: []
    }
  }
  componentDidMount(event) {
    fetch('/showproperties')
      .then(res => res.json())
      .then(properties => this.setState({properties: properties}, () => console.log("properties fetched... ", properties)));
  }

  render() {
    return (
      <div>
      <h1> Properties </h1>
      <table id="property">
        <tbody>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Sold Price</th>
          <th>Type</th>
          <th>Action</th>
        </tr>
        {this.state.properties.map(property =>
          <tr key={property._id}>
             <td>{property.name}</td>
             <td>{property.description}</td>
             <td>{property.sold_price} {property.currency}</td>
             <td>{property.type}</td>
             <td>
              <Popup trigger={<button> View</button>}>
                <div><div> Location: </div> {property.location.coordinates[0]}, {property.location.coordinates[1]}
                <img src={property.images[0]} alt="Property" width="200px"/></div>
              </Popup>
            </td>
          </tr>)}
        </tbody>
      </table>

      <form action="/addproperty">
        <input type="submit" value="Add Property" />
      </form>
      </div>
    );
  }
}
