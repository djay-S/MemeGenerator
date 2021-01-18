import React, { Component } from "react";
import "./memeList.scss";
import memesList from "./imageList";
import Image from "../image/image";

const imgPath = "../assets/memes/";

export default class Memelist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memeImages: [],
    };
  }

  componentDidMount() {
    if (memesList) {
      const { memes } = memesList;
      memes.sort();
      this.setState({ memeImages: memes });
    }
  }

  render() {
    const images = this.state.memeImages;
    const n = images.length / 4;
    return (
      <div className="meme-list">
        <br />
        <input type="text" placeholder="Enter meme name" />
        <div className="meme-grid">
          <div className="column">
            {images.slice(0, n).map((meme, id) => (
              <Image url={imgPath + meme} name={meme} key={id} />
            ))}
          </div>
          <div className="column">
            {images.slice(n, 2 * n).map((meme, id) => (
              <Image url={imgPath + meme} name={meme} key={id} />
            ))}
          </div>
          <div className="column">
            {images.slice(2 * n, 3 * n).map((meme, id) => (
              <Image url={imgPath + meme} name={meme} key={id} />
            ))}
          </div>
          <div className="column">
            {images.slice(3 * n, n * 4).map((meme, id) => (
              <Image url={imgPath + meme} name={meme} key={id} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
