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
    this.modalRef = React.createRef();
  }

  imageClick = () => {
    if (!this.state.isModalOpen) this.toggleModalOpen();
  };

  toggleModalOpen = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  render() {
    const modalStyle = { content: { padding: "2%" } };
    return (
      <div className="image" onClick={this.imageClick}>
        <img src={this.props.url} alt={this.props.name} />
        {this.props.name}
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.toggleModalOpen}
          ariaHideApp={false}
          closeTimeoutMS={750}
          style={modalStyle}
        >
          <div className="class-modal" ref={this.modalRef}>
            <div className="close" onClick={this.toggleModalOpen}>
              ✕
            </div>
            <Makememe
              imgSrc={this.props.url}
              name={this.props.name}
              modalRef={this.modalRef}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
