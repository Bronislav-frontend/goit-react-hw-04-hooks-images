import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import ImageDataView from './ImageDataView/ImageDataView';
import ImagePending from './ImagePending/ImagePending';
import { fetchImages } from '../../services/serviceAPI';
import Button from '../Button/Button';
import s from './ImageGallery.module.css'

export default class ImageGallery extends Component {
  state = {
    imagesArray: [],
    page: 1,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName) {
      this.setState({ imagesArray: [] });
    }

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      const { hits: newImagesArray, totalHits: totalImages } =
        await fetchImages(nextName, nextPage)
      
       if (newImagesArray.length === 0 && totalImages === 0) {
            toast.error('Ничего не найдено =(');
            return;
          }
          if (newImagesArray.length === 0 && totalImages !== 0) {
            toast.warning('Больше картинок по Вашему запросу нет');
            return;
          }
          if (nextPage === 1) {
            toast.success(`!WOW! Мы нашли аж ${totalImages} картинок по Вашему запросу`);
          }

          this.setState(({ imagesArray }) => ({
            imagesArray: [...imagesArray, ...newImagesArray],
            status: 'resolved',
          }));
    }
  }

  updatePage = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { imagesArray, status } = this.state;
    const { openModal } = this.props;

    return (
      <>
        {status === 'idle' && (
          <h2 className={s.title}>Введите запрос</h2>
        )}

        {status === 'pending' && <ImagePending/>}

        {(status === 'resolved' || status === 'pending') && (
          <>
          <ImageDataView imagesArray={imagesArray} openModal={openModal}/>
          <Button onClick={this.updatePage} />
          </>
        )}

        {status === 'rejected' && toast.error('Что-то пошло не так')}
      </>
    );
  }
}

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};