import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import ImageDataView from './ImageDataView/ImageDataView';
import ImagePending from './ImagePending/ImagePending';
import { fetchImages } from '../../services/serviceAPI';
import Button from '../Button/Button';
import s from './ImageGallery.module.css'

export default function ImageGallery ({imageName, openModal}) {
  const [imagesArray, setImagesArray] = useState([]);
  const [prevImageName, setImagePrevName] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (!imageName) {
      return
    }
    if (imageName !== prevImageName) {
      setPage(1);
      setImagesArray([]);
    }

    const fetchGallery = async () => {
      setStatus('pending');
      const { hits: newImagesArray, totalHits: totalImages } =
      await fetchImages(imageName, page);
      setImagePrevName(imageName)
      if (newImagesArray.length === 0 && totalImages === 0) {
        toast.error('Ничего не найдено =(');
        return;
      }
      if (newImagesArray.length === 0 && totalImages !== 0) {
        toast.warning('Больше картинок по Вашему запросу нет');
        return;
      }
      if (page === 1 && prevImageName !== imageName) {
        toast.success(`!WOW! Мы нашли аж ${totalImages} картинок по Вашему запросу`);
      }
      setImagesArray([...imagesArray, ...newImagesArray]);
      setStatus('resolved');
    };  fetchGallery()
  }, [imageName, prevImageName, page])


  const updatePage = () => {
    setPage(page => page+1)
  }

  return (
    <>
    {status === 'idle' && (
      <h2 className={s.title}>Введите запрос</h2>
    )}

    {status === 'pending' && <ImagePending/>}

    {(status === 'resolved' || status === 'pending') && (
      <>
      <ImageDataView imagesArray={imagesArray} openModal={openModal}/>
      <Button onClick={updatePage} />
      </>
    )}

    {status === 'rejected' && toast.error('Что-то пошло не так')}
  </>
  )
}

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};