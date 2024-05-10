import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import styles from './carousel.module.scss';

import { useNavigate } from 'react-router-dom';
import { getMovies } from '../../../api/Movies';
import useModal from '../../../hooks/useModal';
import { RankingPoster } from '../Poster/RankingPoster';
import { PreviewModal } from '../Modal/PreviewModal';

export const RankingCarousel = () => {
  const [moviesTop, setMoviesTop] = useState({ data: [] });
  const [movieId, setMovieId] = useState(null);
  const navigate = useNavigate();

  const { isModalOpen, openModal, closeModal } = useModal();

  const fetchMovies = async () => {
    try {
      const response = await getMovies();
      console.log('패치된 데이터', response.data);
      setMoviesTop({ data: response.data });
    } catch (error) {
      console.error(
        '장르별 영화 데이터를 가져오는 중 오류가 발생했습니다:',
        error,
      );
      setMoviesTop({ data: [] });
    }
  };

  const onModalClick = (id) => {
    navigate(`/movies/${id}`);
    openModal();
    setMovieId(id);
  };

  const [slideIndex, setSlideIndex] = useState(0);

  const settings = {
    centerMode: true,
    centerPadding: '0px',
    dot: false,
    arrow: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    beforeChange: (current, next) => setSlideIndex(next),
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <div className={styles.overlay}>
        <div>
          {isModalOpen && (
            <PreviewModal open={isModalOpen} onClose={closeModal} />
          )}
        </div>
      </div>
      <div className={styles.ranking}>
        <div className={styles.slider}>
          <Slider {...settings}>
            {moviesTop?.data.map((movie, idx) => (
              <div
                key={movie.id}
                className={
                  idx === slideIndex ? styles.slideActive : styles.slideBefore
                }
              >
                <p className={styles.rankingNum}>{idx + 1}</p>
                <RankingPoster
                  key={movie.id}
                  title={movie.title}
                  id={movie.id}
                  movieId={movie.id}
                  posterImage={movie.posterPath}
                  average={movie.voteAverage}
                  onModalClick={() => onModalClick(movie.id)}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};
