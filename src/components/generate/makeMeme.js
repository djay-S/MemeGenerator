import React, { Component } from "react";
import Textbox from "../textBox/textBox";
import "./makeMeme.scss";

export default class Makememe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memeTexts: [
        {
          id: 0,
          value: "",
          size: 20,
          isDragging: false,
          position: { x: -1, y: -1 },
        },
      ],
      imageBase64: "",
      isDragActive: false,
    };
    this.divRef = React.createRef();
    this.imageRef = React.createRef();
    this.modalReference = React.createRef();
    this.svgRef = React.createRef();
  }

  componentDidMount() {
    this.loadImage();
    const { memeTexts } = this.state;
    memeTexts.map((meme) => {
      if (meme.position.x === -1 && meme.position.y === -1) {
        meme.position.x = this.divRef.current.clientWidth / 2;
        meme.position.y = this.divRef.current.clientHeight / 2;
      }
    });
    this.setState({
      svgHeight: this.divRef.current.clientHeight,
      svgWidth: this.divRef.current.clientWidth,
      memeTexts: memeTexts,
    });
  }

  loadImage = () => {
    const image = new Image();
    image.src = this.props.imgSrc;
    image.onload = () => {
      const base64String = this.convertToBase64Image(image);
      let height = image.height;
      let width = image.width;
      this.setState({
        imageBase64: base64String,
        height: height,
        width: width,
      });
    };
  };

  convertToBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var context = canvas.getContext("2d");
    context.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
  }

  addTextbox = () => {
    const textBox = this.state.memeTexts;
    let newId = textBox.length > 0 ? textBox[textBox.length - 1].id + 1 : 0;
    let x = this.divRef.current.clientWidth / 2;
    let y = this.divRef.current.clientHeight / 2;
    textBox.push({ id: newId, value: "", size: 20, position: { x, y } });
    this.setState({ memeTexts: textBox });
  };

  addMemeText = (text, id) => {
    const { memeTexts } = this.state;
    memeTexts.map((txt) => {
      if (txt.id === id) {
        txt.value = text;
      }
    });
    this.setState({ memeTexts: memeTexts });
  };

  addFontSize = (size, id) => {
    const { memeTexts } = this.state;
    memeTexts.map((txt) => {
      if (txt.id === id) {
        txt.size = size;
      }
    });
    this.setState({ memeTexts: memeTexts });
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
        <Textbox
          text={(text) => this.addMemeText(text, box.id)}
          removeId={this.handleRemoveMeme}
          key={box.id}
          memeId={box.id}
          fontSize={(size) => {
            this.addFontSize(size, box.id);
          }}
        />
      );
    });
  };

  handleTouchDown = (e, id) => {
    const memeObject = this.getMemeTouchPosition(e);
    document.addEventListener("touchmove", (e) => this.handleTouchMove(e, id));
    const { memeTexts } = this.state;
    memeTexts.map((meme) => {
      if (meme.id === id) {
        meme.isDragging = memeObject.isDragging;
        meme.position.y = memeObject.y;
        meme.position.x = memeObject.x;
      }
    });
    this.setState({
      memeTexts: memeTexts,
      isDragActive: true,
    });
  };

  handleTouchMove = (e, id) => {
    if (this.state.isDragActive) {
      const { memeTexts } = this.state;
      let memeObject = {};
      memeTexts.map((meme) => {
        if (meme.id === id && meme.isDragging) {
          memeObject = this.getMemeTouchPosition(e);
          meme.isDragging = memeObject.isDragging;
          meme.position.y = memeObject.y;
          meme.position.x = memeObject.x;
        }
      });
      this.setState({
        memeTexts: memeTexts,
      });
    }
  };

  handleTouchUp = (id) => {
    document.removeEventListener("touchmove", this.handleMouseMove);
    const { memeTexts } = this.state;
    memeTexts.map((meme) => {
      if (meme.id === id) {
        meme.isDragging = false;
      }
    });
    this.setState({
      memeTexts: memeTexts,
      isDragActive: false,
    });
  };

  getMemeTouchPosition = (e) => {
    let rect = this.imageRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    let memeObject = {};
    memeObject = {
      isDragging: true,
      x: x,
      y: y,
    };
    return memeObject;
  };

  getMemePosition = (e) => {
    let rect = this.imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    let memeObject = {};
    memeObject = {
      isDragging: true,
      x: x,
      y: y,
    };
    return memeObject;
  };

  handleMouseDown = (e, id) => {
    const memeObject = this.getMemePosition(e);
    document.addEventListener("mousemove", (e) => this.handleMouseMove(e, id));
    const { memeTexts } = this.state;
    memeTexts.map((meme) => {
      if (meme.id === id) {
        meme.isDragging = memeObject.isDragging;
        meme.position.y = memeObject.y;
        meme.position.x = memeObject.x;
      }
    });
    this.setState({
      memeTexts: memeTexts,
      isDragActive: true,
    });
  };

  handleMouseMove = (e, id) => {
    if (this.state.isDragActive) {
      const { memeTexts } = this.state;
      let memeObject = {};
      memeTexts.map((meme) => {
        if (meme.id === id && meme.isDragging) {
          memeObject = this.getMemePosition(e);
          meme.isDragging = memeObject.isDragging;
          meme.position.y = memeObject.y;
          meme.position.x = memeObject.x;
        }
      });
      this.setState({
        memeTexts: memeTexts,
      });
    }
  };

  handleMouseUp = (id) => {
    document.removeEventListener("mousemove", this.handleMouseMove);
    const { memeTexts } = this.state;
    memeTexts.map((meme) => {
      if (meme.id === id) {
        meme.isDragging = false;
      }
    });
    this.setState({
      memeTexts: memeTexts,
      isDragActive: false,
    });
  };

  renderMemeTexts = () => {
    const memeStyle = {
      fontFamily: "impact",
      textTransform: "uppercase",
      color: "white",
      letterSpacing: "1px",
      stroke: "black",
      strokeWidth: "1.5px",
      textShadow: "0px 0px 0.01em black",
      cursor: "default",
    };
    const { memeTexts } = this.state;
    return memeTexts.map((meme) => {
      return (
        <text
          draggable
          key={meme.id}
          fill="white"
          x={meme.position.x + "px"}
          y={meme.position.y + "px"}
          dominantBaseline="middle"
          textAnchor="middle"
          onTouchStart={(e) => {
            this.handleTouchDown(e, meme.id);
          }}
          onTouchEnd={(e) => {
            this.handleTouchUp(meme.id);
          }}
          onMouseDown={(e) => {
            this.handleMouseDown(e, meme.id);
          }}
          onMouseUp={() => {
            this.handleMouseUp(meme.id);
          }}
          style={{
            ...memeStyle,
            fontSize: meme.size + "px",
            zIndex: meme.isDragging ? 10 : 1,
          }}
        >
          {meme.value}
        </text>
      );
    });
  };

  downLoadMeme = () => {
    const svg = this.svgRef.current;
    let svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    const svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)))
    );
    img.onload = function () {
      canvas.getContext("2d").drawImage(img, 0, 0);
      const canvasdata = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.download = "meme.png";
      a.href = canvasdata;
      document.body.appendChild(a);
      a.click();
    };
  };

  render() {
    return (
      <div className="make-meme" ref={this.modalReference}>
        <div className="heading">{this.props.name}</div>
        <button className="add-text" onClick={this.addTextbox}>
          Add Text
        </button>
        <div className="images" ref={this.divRef}>
          <svg
            ref={this.svgRef}
            height={this.state.svgHeight}
            width={this.state.svgWidth}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <image
              ref={this.imageRef}
              href={this.state.imageBase64}
              height={this.state.svgHeight}
              width={this.state.svgWidth}
            ></image>
            {this.renderMemeTexts()}
          </svg>
        </div>
        <div className="text">{this.renderTextBoxes()}</div>
        <div className="download">
          <button onClick={this.downLoadMeme}>Download Meme</button>
        </div>
      </div>
    );
  }
}
