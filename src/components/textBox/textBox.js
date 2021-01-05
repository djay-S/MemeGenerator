import React, { Component } from "react";
import "./textBox.scss";

export default class Textbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.memeId,
      text: "",
      fontSize: 16,
      isEnabled: true,
    };
  }

  textChange = (e) => {
    this.props.text(e.currentTarget.value);
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value.toUpperCase(),
    });
  };

  handleBoxRemove = () => {
    // console.log("remove");
    this.setState({ isEnabled: !this.state.isEnabled });
    this.props.removeId(this.state.id);
  };

  handleFontSizeChange = (e) => {
    this.setState(
      { fontSize: e.target.value },
      this.props.fontSize(this.state.fontSize)
    );
  };

  render() {
    const enabledShade = this.state.isEnabled ? "enabled" : "disabled";
    return (
      <div className={"textbox " + enabledShade}>
        {/* TextBox */}
        {/* <br /> */}
        <input
          type="text"
          placeholder="Enter meme text"
          name="text"
          onChange={this.textChange}
        />
        <br />
        <div className="slider">
          Font Size: {this.state.fontSize} px
          <input
            type="range"
            min="16"
            max="60"
            value={this.state.fontSize}
            step="1"
            onChange={this.handleFontSizeChange}
          />
        </div>
        <button className="remove-button" onClick={this.handleBoxRemove}>
          {this.state.isEnabled ? "Remove" : "Add"}
        </button>
        {/* //can also be change font properties */}
      </div>
    );
  }
}
