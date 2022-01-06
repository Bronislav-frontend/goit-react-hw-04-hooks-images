import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import Searchbar from '../Searchbar/Searchbar';

import s from './App.module.css'
import 'react-toastify/dist/ReactToastify.css';

export default function App () {
  const [imageName, setImageName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState({src: '', alt: ''})

  const onSubmit = imageName => {
    setImageName(imageName);
  };

  const toggleModal = (src, alt) => {
    setShowModal(!showModal);
    setModalImg({src, alt})
  }

  return (
    <div className={s.App}>
    <ToastContainer />
    <Searchbar onSubmit={onSubmit} />
    <ImageGallery imageName={imageName} openModal={toggleModal} />
    {showModal && <Modal onClose={toggleModal} modalImg={modalImg} />}
    
    </div>
  )
}


