import css from '../../styles/Common.module.css';
import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.currentTarget === event.target || event.code === 'Escape') {
      this.props.onClose();
      event.preventDefault();
    }
  };

  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.handleKeyDown}>
        <div className={css.modal}>
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}
export default Modal;
