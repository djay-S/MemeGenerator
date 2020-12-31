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
      mousePos: { x: 0, y: 0 },
      imgprop: { x: 0, y: 0 },
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

  getMousePosition = (e) => {
    let x = e.clientX;
    let y = e.clientY;
    x = x - 20;
    y = y - 20;
    let pos = { x, y };
    console.log(x, y);
    this.setState({ mousePos: pos });
  };

  ImageLoad = ({ target: img }) => {
    let x = img.offsetHeight;
    let y = img.offsetWidth;
    const pic = { x, y };
    this.setState({ imgprop: pic });
  };

  render() {
    const { x, y } = this.state.mousePos;
    return (
      <div className="make-meme">
        <div className="heading">{this.props.name}</div>
        <button className="add-text" onClick={this.addTextbox}>
          Add Text
        </button>
        <div className="images">
          <span
            style={{ left: x + "px", top: y + "px" }}
            draggable
            // onMouseUp={this.getMousePosition}
            onDragEnd={this.getMousePosition}
          >
            {this.state.topText}
          </span>
          <img
            src={this.props.imgSrc}
            onLoad={this.ImageLoad}
            onDragOver={(e) => {
              this.onDragOver(e);
            }}
            onDrop={(e) => {
              this.onDrop(e);
            }}
          />
        </div>
        <div className="text">
          <Textbox text={this.addTopText} />
        </div>
      </div>
    );
  }
}
