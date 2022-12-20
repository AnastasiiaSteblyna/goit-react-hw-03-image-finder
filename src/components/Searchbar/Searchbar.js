import css from '../../styles/Common.module.css';
import React from 'react';

const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.searchbar}>
      <form className={css.searchform} onSubmit={onSubmit}>
        <button type="submit" className={css.searchformButton}>
          <span className={css.searchformButtonLabel}>Search</span>
        </button>

        <input
          className={css.searchformInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
