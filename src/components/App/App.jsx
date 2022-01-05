import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import Searchbar from '../Searchbar/Searchbar';

import s from './App.module.css'
import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component {
  state = {
    imageName: '',
    showModal: false,
    modalImg: {
      src: '',
      alt: '',
    },
  };

  onSubmit = imageName => {
    this.setState({ imageName });
  };

  toggleModal = (src, alt) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalImg: {
        src,
        alt,
      },
    }));
  };

  render() {
    const { imageName, showModal, modalImg } = this.state;
    return (
      <div className={s.App}>
        <ToastContainer />
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery imageName={imageName} openModal={this.toggleModal} />
        {showModal && <Modal onClose={this.toggleModal} modalImg={modalImg} />}
         
      </div>
    );
  }
}

