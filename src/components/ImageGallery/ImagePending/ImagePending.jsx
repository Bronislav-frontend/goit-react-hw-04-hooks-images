import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from './ImagePending.module.css'

export default class ImagePending extends Component {
  render() {
    return (
      <div className={s.imagePending}>
      <Loader
        type="Grid"
        color="blue"
        height={100}
        width={100}
        timeout={2000}
        />
      </div>
    );
  }
}