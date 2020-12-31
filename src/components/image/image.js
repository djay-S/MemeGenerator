import React, { Component } from "react";
import Modal from "react-modal";
import Makememe from "../generate/makeMeme";
import "./image.scss";

export default class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  imageClick = () => {
    console.log(this.props);
    if (!this.state.isModalOpen) this.toggleModalOpen();
  };

  toggleModalOpen = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  render() {
    return (
      <div className="image" onClick={this.imageClick}>
        <img src={this.props.url} alt={this.props.name} />
        {this.props.name}
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.toggleModalOpen}
          ariaHideApp={false}
        >
          <div className="">
            <div className="close" onClick={this.toggleModalOpen}>
              ✕
            </div>
            <Makememe imgSrc={this.props.url} name={this.props.name} />
          </div>
        </Modal>
      </div>
    );
  }
}
