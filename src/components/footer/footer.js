import React, { Component } from "react";
import "./footer.scss";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        {/* Links don't work */}
        <div className="contact">
          <ul>
            <li>
              <div className="social">
                <img src="../assets/github.png" />
                Github
              </div>
            </li>
            <li>
              <div className="social">
                <img src="../assets/linkedin.png" />
                LinkedIn
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
