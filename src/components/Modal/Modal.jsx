import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css'

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({modalImg, onClose}) {
  useEffect(()=>{
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  })

  const onKeyDown = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  const onBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  const { src, alt } = modalImg;
  
  return createPortal(
    <div onClick={onBackdropClick} className={s.Overlay}>
    <div className={s.Modal}>
      <img src={src} alt={alt} />
    </div>
  </div>,
  modalRoot,
  )
}

Modal.propTypes = {
  modalImg: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};