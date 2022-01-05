import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageDataView.module.css'


export default function ImageDataView({ imagesArray, openModal}) {
  return (
    <>
      <ul className={s.ImageDataView}>
        {imagesArray.map(({ id, webformatURL, largeImageURL, tags }) => (
          <li key={id} className={s.ImageGalleryItem}>
            <ImageGalleryItem
              smallImg={webformatURL}
              largeImg={largeImageURL}
              alt={tags}
              openModal={openModal}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

ImageDataView.propTypes = {
  imagesArray: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};