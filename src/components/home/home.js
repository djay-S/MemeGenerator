import React, { Component } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import Memelist from "../memes/memeList";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        HOME
        <Memelist />
        <Footer />
      </div>
    );
  }
}
