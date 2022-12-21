import React, { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
// import Notiflix from 'notiflix';

import Searchbar from './Searchbar/Searchbar';
// import ImageGallery from './ImageGallery/ImageGallery';
// import Loader from './Loader/Loader';
// import Button from './Button/Button';

export default class App extends Component {
  state = {
    query: null,
    totalHits: null,
    page: 1,
    images: [],
    status: 'idle',
    error: '',
  };

  onSubmit = query => {
    console.log(query);
    this.setState({ query });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery query={this.state.query} />
      </>
    );
  }
}
