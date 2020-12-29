import React, { Component } from "react";
import "./image.scss";

export default class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="image">
        <img src={this.props.url} alt={this.props.name} />
        {this.props.name}
      </div>
    );
  }
}
