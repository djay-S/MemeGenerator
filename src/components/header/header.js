import React, { Component } from "react";
import "./header.scss";

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <img src="../assets/trollFace.png" alt="trollFace" />
        Memegenerator
      </div>
    );
  }
}
