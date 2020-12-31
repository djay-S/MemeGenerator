import React, { Component } from "react";
import "./textBox.scss";

export default class Textbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  textChange = (e) => {
    this.props.text(e.currentTarget.value);
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  handleTextAdd = () => {};

  render() {
    return (
      <div className="textbox">
        {/* TextBox */}
        {/* <br /> */}
        <input
          type="text"
          placeholder="Enter meme text"
          name="text"
          onChange={this.textChange}
        />
        <br />
        <button onClick={this.handleTextAdd}>Add Text</button>
        {/* //can also be change font properties */}
      </div>
    );
  }
}
