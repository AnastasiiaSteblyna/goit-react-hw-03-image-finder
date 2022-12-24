import React, { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
// import Notiflix from 'notiflix';

import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';

// import Loader from './Loader/Loader';
import Button from './Button/Button';

import css from '../styles/Common.module.css';

export default class App extends Component {
  state = {
    query: null,
    page: 1,
    images: [],
    status: 'idle',
    error: '',
    showModal: false,
    modalImage: null,
    totalHits: null,
  };

  onSubmit = query => {
    console.log(query);
    this.setState({ query, page: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = modalImage => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalImage: modalImage,
    }));
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          query={this.state.query}
          page={this.state.page}
          modalImage={this.state.modalImage}
        />
        {this.state.showModal && (
          <Modal
            largeImageURL={this.state.modalImage}
            onClose={this.toggleModal}
          />
        )}
        <Button onClick={this.onLoadMore} />
      </div>
    );
  }
}
