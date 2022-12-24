import css from '../../styles/Common.module.css';
import React, { Component } from 'react';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';

class ImageGallery extends Component {
  state = {
    data: null,
    images: [],
    totalHits: null,
    loading: false,
    error: false,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.query !== this.props.query ||
      prevProps.page !== this.props.page
    ) {
      this.setState({ loading: true });

      fetch(
        `https://pixabay.com/api/?key=30799489-f6e21edc3306eb9c86baf04e6&q=${this.props.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.props.page}&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error('Failed to find any images'));
        })
        .then(data => {
          if (!data.total) {
            Notiflix.Notify.warning('No images found, try another query');
            return;
          }
          const images = data.hits.map(
            ({ id, largeImageURL, webformatURL }) => {
              return { id, largeImageURL, webformatURL };
            }
          );
          if (prevProps.query !== this.props.query) {
            this.setState({
              images: [...images],
              data,
              totalHits: data.totalHits,
            });
          }
          if (prevProps.page !== this.props.page) {
            this.setState({ images: [...prevState.images, ...images] });
          }
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: largeImageURL,
    }));
  };

  render() {
    const { data, images, loading, showModal } = this.state;

    return (
      <div className={css.ImageGallery} onClick={this.toggleModal}>
        {loading && <Loader />}
        {data && (
          <ul className={css.gallery}>
            {images.map(({ id, largeImageURL, webformatURL }) => (
              <ImageGalleryItem
                key={nanoid()}
                largeImageURL={largeImageURL}
                webformatURL={webformatURL}
                id={id}
              />
            ))}
          </ul>
        )}
        {/* {showModal && (
          <Modal onClose={this.toggleModal} largeImageURL={largeImageURL} />
        )} */}
      </div>
    );
  }
}

export default ImageGallery;
