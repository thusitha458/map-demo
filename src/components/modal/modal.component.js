/* global SITE_CONFIG */
import React from 'react';
import Modal from 'react-modal';

const ModalComponent = ({
  isOpen, urlInput, fileInput, close, updateURLInput,
  updateFileInput, loadRasterAndCloseModal
}) => (
  <Modal
    isOpen={isOpen}
    shouldCloseOnOverlayClick={true}
    onRequestClose={close}
    closeTimeoutMS={200}
  >
    <header>
      <i
        className='material-icons'
        onClick={close}
      >
        clear
      </i>
    </header>
    <section className='content'>
      <div className="gt-input">
        <input
          type="file"
          onChange={updateFileInput}
        />
      </div>
      <br />
      <button
        className='gt-button-accent full'
        onClick={loadRasterAndCloseModal}
      >
        GO
      </button>
    </section>
  </Modal>
);

export default ModalComponent;
