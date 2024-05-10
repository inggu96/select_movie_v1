import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import styles from './carousel.module.scss';

import { getMoviesGenre } from '../../../api/Movies';

import { CaretLeftIcon, CaretRightIcon } from '../../../assets/icon';
import { CategoryPoster } from '../Poster/CategoryPoster';
import { useNavigate } from 'react-router-dom';
import useModal from '../../../hooks/useModal';
import { PreviewModal } from '../Modal/PreviewModal';

export const HomeCarousel = ({ GenreId }) => {
  // 모달 관련 변수
  const [isShow, setIsShow] = useState(false);
  const [moviesGenre, setMoviesGenre] = useState({ data: [] });
  const [movieId, setMovieId] = useState(null);
  const navigate = useNavigate();
  const onModalClose = () => setIsShow(false);
  const { isModalOpen, openModal, closeModal } = useModal();

  const fetchMoviesGenre = async () => {
    try {
      const response = await getMoviesGenre(GenreId);
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
    navigate(`/movies/${id}`);
    openModal();
    setMovieId(id);
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
      <div className={styles.overlay}>
        <div>
          {isModalOpen && (
            <PreviewModal open={isModalOpen} onClose={closeModal} />
          )}
        </div>
      </div>
      <Slider {...settings}>
        {moviesGenre?.data.map((movie) => (
          <CategoryPoster
            key={movie.id}
            title={movie.title}
            id={movie.id}
            movieId={movie.id}
            posterImage={movie.posterPath}
            average={movie.voteAverage}
            onModalClick={() => onModalClick(movie.id)}
          />
        ))}
      </Slider>
    </>
  );
};
