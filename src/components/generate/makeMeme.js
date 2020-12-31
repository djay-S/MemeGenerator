import React, { Component } from "react";
import Textbox from "../textBox/textBox";
import "./makeMeme.scss";

export default class Makememe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memeTexts: [],
      topText: "",
      bottomText: "",
    };
  }

  onDragStart = (ev, text) => {
    // ev.datatransfer.setData("id", text);
  };

  onDragOver = (ev) => {
    ev.preventDefault();
  };

  onDrop = (ev) => {};

  addTextbox = () => {
    console.log("adding textbox");
  };

  addTopText = (text) => {
    this.setState({ topText: text });
  };

  render() {
    return (
      <div className="make-meme">
        <div className="heading">{this.props.name}</div>
        {/* <h2 className="text-1">
          <span
            draggable={true}
            onDragStart={(e) => {
              this.onDragStart(e, "1");
            }}
            className="text "
          >
            Some rando text
          </span>
        </h2> */}
        <button className="add-text" onClick={this.addTextbox}>
          Add Text
        </button>
        <div className="images">
        <h2>{this.state.topText}</h2>
          <img
            src={this.props.imgSrc}
            onDragOver={(e) => {
              this.onDragOver(e);
            }}
            onDrop={(e) => {
              this.onDrop(e);
            }}
          />
        </div>
        <div className="text">
          <Textbox text={this.addTopText}/>
        </div>
      </div>
    );
  }
}
