import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import PreviewModal from '../../../components/Carousel/PreviewModal';
import styles from './carousel.module.scss';

import { getMoviesGenre } from '../../../api/Movies';

import { CaretLeftIcon, CaretRightIcon } from '../../../assets/icon';
import { CategoryPoster } from '../Poster/CategoryPoster';

export const HomeCarousel = ({ GenreId }) => {
  // 모달 관련 변수
  const [isShow, setIsShow] = useState(false);
  const [moviesGenre, setMoviesGenre] = useState({ data: [] });
  const [movieId, setMovieId] = useState(null);
  const onModalClose = () => setIsShow(false);

  const fetchMoviesGenre = async () => {
    try {
      const response = await getMoviesGenre(1, GenreId);
      console.log('responseAction', response.data);
      setMoviesGenre({ data: response.data });
    } catch (error) {
      console.error(
        '장르별 영화 데이터를 가져오는 중 오류가 발생했습니다:',
        error,
      );
      setMoviesGenre({ data: [] });
    }
  };
  const onModalClick = (id) => {
    const num = moviesGenre.data.findIndex((item) => item.id === id);
    setIsShow(true);
    setMovieId(moviesGenre.data[num]);
  };

  const settings = {
    dot: false,
    arrow: false,
    infinite: false,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 5,
    prevArrow: <CaretLeftIcon />,
    nextArrow: <CaretRightIcon />,
  };

  useEffect(() => {
    fetchMoviesGenre();
  }, [GenreId]);

  return (
    <>
      {isShow && (
        <div className={styles.overlay}>
          <div>
            <PreviewModal
              onModalClose={onModalClose}
              onModalClick={onModalClick}
              movieId={movieId}
            />
          </div>
        </div>
      )}
      <Slider {...settings}>
        {moviesGenre?.data.map((movie) => (
          <CategoryPoster
            key={movie.id}
            movie={movie}
            onModalClick={() => onModalClick(movie.id)}
            movieId={movieId}
            callback={fetchMoviesGenre}
          />
        ))}
      </Slider>
    </>
  );
};
