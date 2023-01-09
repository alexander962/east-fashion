import React from 'react'
import cl from 'classnames'

import close from 'src/assets/images/close.svg';
import styles from './index.module.scss'
const ModalMenu = ({ modalVisible, setModalVisible }) => {
  return (
    <div className={cl(styles.modal, modalVisible && styles.modalActive)}>
      <div>
        Menu
      </div>
      <div>
        <img src={close.src} onClick={() => setModalVisible(false)}  />
      </div>
    </div>
  )
}

export default ModalMenu;
