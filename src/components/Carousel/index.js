import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { getBookmarksPage, getUserBookmarksPage } from '../../api/Bookmarks';
import { PosterCategory, PosterRanking } from './PosterHome';
import { PosterUser } from './PosterUser';
import PreviewModal from './PreviewModal';
import styles from './rankingCarousel.module.scss';

import {
  getMovies,
  getMoviesGenre,
  getMoviesMeLike,
  getMoviesUserLike,
} from '../../api/Movies';

import {
  CaretLeftIcon,
  CaretRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SolidBookmarkIcon,
  SolidHeartIcon,
} from '../../assets/icon';

export const RankingCarousel = () => {
  const [isShow, setIsShow] = useState(false);
  const [moviesTop, setMoviesTop] = useState({ data: [] });
  const [movieId, setMovieId] = useState(null);
  const onModalClose = () => setIsShow(false);

  const fetchMovies = async () => {
    try {
      const response = await getMovies();
      console.log('패치된 데이터', response.data);
      setMoviesTop({ data: response.data }); // API 응답을 moviesGenre 상태에 저장
    } catch (error) {
      console.error(
        '장르별 영화 데이터를 가져오는 중 오류가 발생했습니다:',
        error,
      );
      setMoviesTop({ data: [] }); // 오류 발생 시 moviesGenre를 빈 배열로 초기화
    }
  };

  const onModalClick = (id) => {
    const num = moviesTop.data.findIndex((item) => item.id === id);
    setIsShow(true);
    setMovieId(moviesTop.data[num]);
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
      <AnimatePresence>
        {isShow && (
          <div className={styles.overlay}>
            <motion.div
              variants={modalVariants}
              initial="initial"
              animate="visible"
              exit="leaving"
              style={{ zIndex: 999 }}
            >
              <PreviewModal
                onModalClose={onModalClose}
                onModalClick={onModalClick}
                movieId={movieId}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
                <PosterRanking
                  key={movie.id}
                  title={movie.title}
                  id={movie.id}
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
      setMoviesGenre({ data: response.data }); // API 응답을 moviesGenre 상태에 저장
    } catch (error) {
      console.error(
        '장르별 영화 데이터를 가져오는 중 오류가 발생했습니다:',
        error,
      );
      setMoviesGenre({ data: [] }); // 오류 발생 시 moviesGenre를 빈 배열로 초기화
    }
  };
  const onModalClick = (id) => {
    const num = moviesGenre.data.findIndex((item) => item.id === id); // id값 추출
    setIsShow(true);
    setMovieId(moviesGenre.data[num]); //data값에 아이디값 대입
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

  const modalVariants = {
    initial: {
      opacity: 0,
      position: 'fixed',
      top: '-100vh',
      left: '50%',
      transform: 'translate(-50%, 0) scale(0.8)',
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) scale(1)',
      transition: {
        duration: 0.2,
      },
    },
    leaving: {
      opacity: 0,
      position: 'fixed',
      top: '-100vh',
      left: '50%',
      transform: 'translate(-50%, 0) scale(0.8)',
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      <AnimatePresence>
        {isShow && (
          <div className={styles.overlay}>
            <motion.div
              variants={modalVariants}
              initial="initial"
              animate="visible"
              exit="leaving"
              style={{ zIndex: 999 }}
            >
              <PreviewModal
                onModalClose={onModalClose}
                onModalClick={onModalClick}
                movieId={movieId}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <Slider {...settings}>
        {moviesGenre?.data.map((movie) => (
          <PosterCategory
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

export const UserCarousel = ({ name }) => {
  const location = useLocation();
  const isMyPage = location.pathname === '/my';
  const isUserPage = location.pathname.includes('/user');

  const userId = useParams();
  const [myLike, setMyLike] = useState([]);
  const [myMark, setMyMark] = useState();

  const [userLike, setUserLike] = useState([]);
  const [userMark, setUserMark] = useState([]);

  const fetchMoviesLike = async () => {
    const response = await getMoviesMeLike();
    setMyLike(response.data);
  };
  const fetchMoviesMark = async () => {
    const response = await getBookmarksPage(1, 20);
    setMyMark(response.data.data);
  };

  const fetchUserLike = async () => {
    const response = await getMoviesUserLike(userId.id);
    setUserLike(response.data);
  };
  const fetchUserBookmark = async () => {
    const response = await getUserBookmarksPage(userId.id);
    setUserMark(response.data);
  };

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 5,
    prevArrow: <ChevronLeftIcon />,
    nextArrow: <ChevronRightIcon />,
  };

  useEffect(() => {
    isMyPage && fetchMoviesLike();
    isMyPage && fetchMoviesMark();
    isUserPage && fetchUserLike();
    isUserPage && fetchUserBookmark();
  }, []);

  return (
    <>
      {name === 'myLike' && (
        <div name="myLike">
          <Slider {...settings}>
            {myLike.map((index) => (
              <PosterUser
                type="like"
                key={index.id}
                index={index}
                callback={fetchMoviesLike}
              />
            ))}
          </Slider>
        </div>
      )}

      {name === 'myMark' && (
        <div name="myMark">
          <Slider {...settings}>
            {myMark &&
              myMark?.map((index) => (
                <PosterUser
                  type="mark"
                  key={index.movie}
                  index={index.movie}
                  callback={fetchMoviesMark}
                />
              ))}
          </Slider>
        </div>
      )}

      {name === 'userLike' && (
        <div>
          <Slider {...settings}>
            {userLike.map((index) => (
              <PosterUser
                type="like"
                key={index.id}
                index={index}
                children={<SolidHeartIcon />}
              />
            ))}
          </Slider>
        </div>
      )}

      {name === 'userMark' && (
        <div>
          <Slider {...settings}>
            {userMark.map((index) => (
              <PosterUser
                type="mark"
                key={index.movie}
                index={index.movie}
                children={<SolidBookmarkIcon />}
              />
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};
