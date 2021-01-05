import React, { Component } from "react";
import Textbox from "../textBox/textBox";
import "./makeMeme.scss";

export default class Makememe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memeTexts: [{ id: 0, value: "", size: 16, position: { x: 0, y: 0 } }],
      topText: "",
      fSize: 16,
      bottomText: "",
      mousePos: { x: 0, y: 0 },
      imageDimensions: { h: 0, w: 0 },
    };
    this.imageRef = React.createRef();
    this.modalReference = React.createRef();
  }

  onDragStart = (ev, text) => {
    // ev.datatransfer.setData("id", text);
  };

  imageLoaded = ({ target: img }) => {
    // debugger
    let imgY = this.imageRef.current.clientHeight;
    let imgX = this.imageRef.current.clientWidth;
    const aspRatio = imgY / imgX;
    console.log(this.imageRef, this.modalReference, this.props.modalRef);
    let imgH = this.props.modalRef.current.clientHeight * 0.9;
    let imgW = this.props.modalRef.current.clientHeight / aspRatio;
    console.log("image dimens:", imgH, imgW);
    const { memeTexts } = this.state;
    // memeTexts.map((meme) => {
    //   m;
    // });
    const { position } = this.getNewPosition();
    memeTexts[0].position = {
      // x: this.imageRef.current.offsetLeft,
      // y: this.imageRef.current.offsetTop,
      position,
    };
    // memeTexts.position = this.imageRef.current.offsetTop;
    this.setState({
      // mousePos: { y: img.offsetHeight, x: img.offsetWidth },
      mousePos: {
        x: this.imageRef.current.offsetLeft,
        y: this.imageRef.current.offsetTop,
      },
      imageDimensions: {
        h: imgH,
        w: imgW,
      },
      memeTexts: memeTexts,
    });
  };

  onDragOver = (ev) => {
    ev.preventDefault();
  };

  onDrop = (ev) => {};

  getNewPosition = () => {
    let x = this.imageRef.current.offsetLeft;
    let y = this.imageRef.current.offsetTop;
    const position = { x: x, y: y };
    console.log("posot", position);
    return position;
  };

  addTextbox = () => {
    const textBox = this.state.memeTexts;
    let newId = textBox.length > 0 ? textBox[textBox.length - 1].id + 1 : 0;
    console.log("adding textbox", textBox, newId);
    const { position } = this.getNewPosition();
    textBox.push({ id: newId, value: "", size: 16, position: { position } });
    this.setState({ memeTexts: textBox });
    console.log("adding textbox", textBox, newId);
  };

  addTopText = (text, id) => {
    // debugger
    let offX = this.imageRef.current.offsetLeft;
    let offY = this.imageRef.current.offsetTop;
    const texts = this.state.memeTexts;
    texts.map((txt) => {
      if (txt.id === id) {
        txt.value = text;
        // txt.size = 16;
        // txt.position = { x: 0, y: 0 };
      }
    });
    console.log("event", id, texts);
    this.setState({ topText: text, memeTexts: texts });
  };

  addFontSize = (size, id) => {
    // console.log("addFontSize", size, id);
    const texts = this.state.memeTexts;
    console.log("texts", texts);
    texts.map((txt) => {
      if (txt.id === id) {
        txt.size = size;
        // txt.position.x = 0;
        // txt.position.y = 0;
      }
    });
    this.setState({ fSize: size, memeTexts: texts });
  };

  handleRemoveMeme = (id) => {
    const { memeTexts } = this.state;
    memeTexts.splice(
      memeTexts.findIndex((meme) => meme.id === id),
      1
    );
    this.setState({ memeTexts: memeTexts });
  };

  renderTextBoxes = () => {
    const textBox = this.state.memeTexts;
    return textBox.map((box) => {
      return (
        // console.log("box", box.id);
        <Textbox
          text={(text) => this.addTopText(text, box.id)}
          removeId={this.handleRemoveMeme}
          key={box.id}
          memeId={box.id}
          fontSize={(size) => {
            this.addFontSize(size, box.id);
          }}
        />
      );
    });
    // return <Textbox text={(e) => this.addTopText(e)} key={0} />;
  };

  getMousePosition = (e, id) => {
    let imgY = this.imageRef.current.offsetTop;
    let imgX = this.imageRef.current.offsetLeft;
    const aspRatio = imgY / imgX;
    let x = e.clientX;
    let y = e.clientY;
    // x = x - 96;
    // y = y - 47;
    x = x - imgY;
    y = y - imgX;
    let pos = { x, y };
    console.log(x, y);
    const { memeTexts } = this.state;
    memeTexts.map((meme) => {
      if (meme.id === id) {
        meme.position = pos;
      }
    });
    this.setState({ memeTexts: memeTexts });
    this.setState({ mousePos: pos });
  };

  renderMemeTexts = () => {
    // debugger;
    const { memeTexts } = this.state;
    console.log("memetext", memeTexts);
    return memeTexts.map((meme) => {
      console.log("meme", meme);
      return (
        <span
          style={{
            left: meme.position.x + "px",
            top: meme.position.y + "px",
            fontSize: meme.size + "px",
          }}
          draggable
          onDragEnd={(e) => {
            this.getMousePosition(e, meme.id);
          }}
          key={meme.id}
        >
          {meme.value}
        </span>
      );
    });
    // const { x, y } = this.state.mousePos;
    // const fontSize = this.state.fSize + "px";
    // // console.log("fontSize", fontSize);
    // return (
    //   <span
    //     style={{ left: x + "px", top: y + "px", fontSize: fontSize }}
    //     draggable
    //     // onMouseUp={this.getMousePosition}
    //     onDragEnd={this.getMousePosition}
    //   >
    //     {this.state.topText}
    //   </span>
    // );
  };

  // componentDidUpdate() {
  //   console.log("update");
  //   this.renderMemeTexts();
  // }

  downLoadMeme = () => {
    console.log("download Meme");
  };

  render() {
    const { x, y } = this.state.mousePos;
    const { h, w } = this.state.imageDimensions;
    return (
      <div className="make-meme" ref={this.modalReference}>
        <div className="heading">{this.props.name}</div>
        <button className="add-text" onClick={this.addTextbox}>
          Add Text
        </button>
        <div className="images">
          {this.renderMemeTexts()}
          <img
            ref={this.imageRef}
            onLoad={this.imageLoaded}
            src={this.props.imgSrc}
            style={{ width: w, height: h }}
            onDragOver={(e) => {
              this.onDragOver(e);
            }}
            onDrop={(e) => {
              this.onDrop(e);
            }}
          />
        </div>
        <div className="text">{this.renderTextBoxes()}</div>
        <div className="download">
          <button onClick={this.downLoadMeme}>Download Meme</button>
        </div>
      </div>
    );
  }
}
