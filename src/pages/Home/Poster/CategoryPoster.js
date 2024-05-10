import React, { useState, useEffect } from 'react';
import styles from './posterHome.module.scss';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../../../state';
import Button from '../../../components/Common/Button';

import { getMovie, postMovieLike, deleteMovieLike } from '../../../api/Movies';
import { SolidStarIcon, HeartIcon, SolidHeartIcon } from '../../../assets/icon';

export const CategoryPoster = ({
  title,
  posterImage,
  onModalClick,
  id,
  average,
  movie,
}) => {
  const isLogin = useRecoilValue(isLoginAtom);
  const [isLiked, setIsLiked] = useState(false);

  // const fetchMovieData = async () => {
  //   const response = await getMovie(movie.id);
  //   if (isLogin) {
  //     setIsLiked(response.data.isLiked);
  //   } else {
  //     setIsLiked(false);
  //   }
  // };

  // const onClickLike = async (e) => {
  //   if (!isLogin) {
  //     return alert('로그인 후 이용 가능합니다!');
  //   }
  //   isLiked ? await deleteMovieLike(movie.id) : await postMovieLike(movie.id);
  //   setIsLiked((cur) => !cur);
  // };

  // const onClick = () => onModalClick(movie?.id);

  // useEffect(() => {
  //   fetchMovieData();
  // }, [movie.id]);
  return (
    <article className={styles.wrapperH}>
      <div className={styles.screenH}>
        <article className={styles.layerUpH}>
          <div className={styles.titleH} onClick={() => onModalClick(id)}>
            {title}
          </div>
          <div className={styles.bodyContentsH}>
            <div className={styles.ratingH}>
              <SolidStarIcon
                className={styles.starH}
                height={'30px'}
                fill="yellow"
              />
              <p className={styles.starNumH}>{average?.toFixed(1)}</p>
            </div>
            {/* <Button
              option="third"
              name="isLiked"
              className={styles.iconH}
              onClick={onClickLike}
            >
              {isLiked ? <SolidHeartIcon /> : <HeartIcon />}
            </Button> */}
          </div>
        </article>
        <article className={styles.layerDownH}>
          <img className={styles.postImageH} src={posterImage} alt={title} />
        </article>
      </div>
    </article>
  );
};
