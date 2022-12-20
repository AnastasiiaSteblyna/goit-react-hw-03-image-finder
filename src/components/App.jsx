import React, { Component } from 'react';
import Notiflix from 'notiflix';
import axios from 'axios';

import css from '../styles/Common.module.css';

import Searchbar from './Searchbar/Searchbar';

export default class App extends Component {
  state = {
    query: '',
    totalHits: null,
    page: 1,
    images: [],
    status: 'idle',
    error: '',
  };

  fetchGallery = () => {
    axios
      .get(
        `https://pixabay.com/api/?key=30799489-f6e21edc3306eb9c86baf04e6&q=${this.state.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.state.page}&per_page=12`
      )
      .then(images => {
        console.log(images);
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  onSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
      </>
    );
  }
}
