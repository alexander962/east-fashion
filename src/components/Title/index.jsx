import React from 'react';
import cl from 'classnames';

import styles from './index.module.scss';
const Title = ({ children }) => {
  return <h2 className={cl(styles.title)}>{children}</h2>;
};
export default Title;
