import React, { Component } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import Memelist from "../memes/memeList";
import "./home.scss";

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <Header />
        {/* HOME */}
        <Memelist />
        <Footer />
      </div>
    );
  }
}
