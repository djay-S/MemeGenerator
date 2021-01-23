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
      filteredImages: [],
    };
  }

  componentDidMount() {
    if (memesList) {
      const { memes } = memesList;
      memes.sort();
      this.setState({ memeImages: memes, filteredImages: memes });
    }
  }

  searchMeme = (e) => {
    const search = e.target.value;
    const { memeImages } = this.state;
    let res = memeImages;
    if (search.length > 2) {
      res = memeImages.filter((meme) => {
        return meme.toLowerCase().includes(search.toLowerCase());
      });
    }
    this.setState({ filteredImages: res });
  };

  renderMemeList = () => {
    const images = this.state.filteredImages;
    const n = images.length / 4;
    let columnArr = [];
    if (n >= 1) {
      for (let i = 0; i < 4; i++) {
        columnArr.push(
          <div className="column">
            {images.slice(n * i, n * (i + 1)).map((meme, id) => (
              <Image url={imgPath + meme} name={meme.split(".")[0]} key={id} />
            ))}
          </div>
        );
      }
      return <div className="meme-grid">{columnArr}</div>;
    } else {
      for (let i = 0; i < n; i++) {
        columnArr.push(
          <div className="search-grid">
            {images.map((meme, id) => (
              <Image url={imgPath + meme} name={meme.split(".")[0]} key={id} />
            ))}
          </div>
        );
      }
      return columnArr;
    }
  };

  render() {
    return (
      <div className="meme-list">
        <br />
        <div className="meme-filter">
          <input
            type="text"
            name="filter"
            placeholder="Search meme "
            onChange={this.searchMeme}
          />
          {/* <button className="upload">Upload your own image</button> */}
        </div>
        {this.renderMemeList()}
      </div>
    );
  }
}
