import React, { Component } from "react";
import "./memeList.scss";
import Image from "../image/image";

export default class Memelist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memeImgs: [],
    };
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        memes.sort(
          (a, b) =>
            // a.box_count - b.box_count ||
            a.name.localeCompare(b.name)
          //||
          // a.height - b.height ||
          // a.height / a.width - b.height / b.width ||
          // a.height * a.width - b.height * b.width
        );
        console.log("sorted", memes);
        this.setState({ memeImgs: memes });
      });
  }
  render() {
    const images = this.state.memeImgs;
    const n = images.length / 4;
    return (
      <div className="meme-list">
        <br />
        <input type="text" placeholder="Enter meme name" />
        <div className="meme-grid">
          <div className="column">
            {images.slice(0, n).map((meme, id) => (
              <Image url={meme.url} name={meme.name} key={id} />
            ))}
          </div>
          <div className="column">
            {images.slice(n, 2 * n).map((meme, id) => (
              <Image url={meme.url} name={meme.name} key={id} />
            ))}
          </div>
          <div className="column">
            {images.slice(2 * n, 3 * n).map((meme, id) => (
              <Image url={meme.url} name={meme.name} key={id} />
            ))}
          </div>
          <div className="column">
            {images.slice(3 * n, n * 4).map((meme, id) => (
              <Image url={meme.url} name={meme.name} key={id} />
            ))}
          </div>
          {/* {images.map((meme, id) => (
          <Image url={meme.url} name={meme.name} key={id} />
        ))} */}
        </div>
      </div>
    );
  }
}
