import React from 'react';
import styles from './posterHome.module.scss';

import { SolidStarIcon } from '../../../assets/icon';

export const RankingPoster = ({
  title,
  posterImage,
  onModalClick,
  id,
  average,
  movie,
}) => {
  return (
    <div className={styles.wrapperR} onClick={() => onModalClick(id)}>
      <div className={styles.screenR}>
        <article className={styles.layerUpR}>
          <div className={styles.titleR}>{title}</div>
          <div className={styles.bottomR}>
            <div className={styles.ratingR}>
              <SolidStarIcon className={styles.starR} />
              <p className={styles.starNumR}>{average?.toFixed(1)}</p>
            </div>
          </div>
        </article>
        <article className={styles.layerDownR}>
          <img className={styles.postImageR} src={posterImage} alt={title} />
        </article>
      </div>
    </div>
  );
};
