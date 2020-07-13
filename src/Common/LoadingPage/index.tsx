import React from 'react';
import styles from './style.module.scss';

interface Props {

}

export const LoadingPage: React.FC<Props> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loadingbar}>
        <div className={styles.progressbar}></div>
      </div>
    </div>
  )
}
