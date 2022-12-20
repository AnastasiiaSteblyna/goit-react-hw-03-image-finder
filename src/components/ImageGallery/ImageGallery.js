import css from '../../styles/Common.module.css';
import React from 'react';

const ImageGallery = () => {
  return (
    <ul className={css.gallery}>
      <ImageGalleryItem />
    </ul>
  );
};

export default ImageGallery;
