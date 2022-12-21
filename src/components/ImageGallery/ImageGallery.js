import css from '../../styles/Common.module.css';
import React, { Component } from 'react';
import Notiflix from 'notiflix';

class ImageGallery extends Component {
  state = {
    data: null,
    images: [],
    page: 1,
    loading: false,
    error: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.setState({ loading: true });

      fetch(
        `https://pixabay.com/api/?key=30799489-f6e21edc3306eb9c86baf04e6&q=${this.props.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=12`
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
          }
          const images = data.hits.map(
            ({ id, largeImageURL, webformatURL }) => {
              return { id, largeImageURL, webformatURL };
            }
          );
          this.setState(prevState => {
            return { images: [...prevState.images, ...images], data };
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    return (
      <>
        {this.state.loading && <div>Loading...</div>}
        {this.state.data && (
          <ul className={css.gallery}>
            <li className={css.gallery_item}>{this.props.query}</li>
          </ul>
        )}
        {!this.props.query && <div>NAME PLS</div>}
      </>
    );
  }
}

export default ImageGallery;
