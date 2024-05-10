import Modal from '@mui/material/Modal';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  deleteBookmark,
  getMyBookmarks,
  postBookmark,
} from '../../../api/Bookmarks';
import { deleteMovieLike, getMovie, postMovieLike } from '../../../api/Movies';
import { getReviewsMovie } from '../../../api/Reviews';
import {
  BookmarkIcon,
  Close,
  DoubleChevronRightIcon,
  HeartIcon,
  SolidBookmarkIcon,
  SolidHeartIcon,
  SolidStarIcon,
} from '../../../assets/icon';
import { isLoginAtom } from '../../../state';
// import { Preview } from '../../Comment';
// import Button from '../../Common/Button';
import styles from './previewModal.module.scss';

//   const {
//     title,
//     posterPath,
//     runtime,
//     releasedAt,
//     overview,
//     actors,
//     genres,
//     staffs,
//     company,
//   } = movieId;

export const PreviewModal = ({ open, onClose, movieId }) => {
  //   const navigate = useNavigate();
  //   const isLogin = useRecoilValue(isLoginAtom);

  //   const [reviews, setReviews] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [movie, setMovie] = useState();
  const navigate = useNavigate();

  const {
    voteAverage,
    posterPath,
    releaseDate,
    title,
    tmdbId,
    overview,
    movieGenres,
    movieActors,
    movieStaffs,
  } = movie || {};
  let { id } = useParams();

  const goHome = () => {
    onClose();
    navigate('/');
  };

  const fetchMovie = async () => {
    try {
      const response = await getMovie(id);
      setMovie(response.data);
      console.log('response', response.data);
    } catch (error) {
      console.error('영화 정보를 가져오는 중 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    fetchMovie();
    console.log('id', id);
    console.log('movie', movie);
  }, [open, movieId]);

  //   const setUserName = (user) => {
  //     return user.nickName ?? user.name ?? '닉네임없음';
  //   };

  //   const fetchReviews = async () => {
  //     const response = await getReviewsMovie(movieId.id);
  //     setReviews(response.data);
  //   };

  //   const fetchMovieData = async () => {
  //     const response = await getMovie(movieId.id);

  //     if (isLogin) {
  //       setIsLiked(response.data.isLiked);
  //     } else {
  //       setIsLiked(false);
  //     }
  //   };

  //   const fetchBookmarks = async () => {
  //     const response = await getMyBookmarks();
  //     const bookmarkIdArr = response.data.map((dataArr) => {
  //       return dataArr.movie.id;
  //     });

  //     if (isLogin && bookmarkIdArr.includes(movieId.id)) {
  //       setIsBookmarked(true);
  //     } else {
  //       setIsBookmarked(false);
  //     }
  //   };

  //   const onClickButton = async (e) => {
  //     if (!isLogin) {
  //       return alert('로그인 후 이용 가능합니다!');
  //     }
  //     const { name } = e.currentTarget;

  //     if (name === 'isLiked') {
  //       isLiked
  //         ? await deleteMovieLike(movieId.id)
  //         : await postMovieLike(movieId.id);
  //       setIsLiked((cur) => !cur);
  //     }

  //     if (name === 'isBookmarked') {
  //       isBookmarked
  //         ? await deleteBookmark(movieId.id)
  //         : await postBookmark(movieId.id);
  //       setIsBookmarked((cur) => !cur);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchMovieData();
  //     fetchBookmarks();
  //     fetchReviews();
  //   }, [movieId.id]);

  return (
    <Modal open={open}>
      <div className={styles.modal}>
        <div className={styles.popup}>
          <img className={styles.popupBackground} src={posterPath} />
          <div>
            <div className={styles.headerContentWrap}>
              <div className={styles.leftWrap}>
                <img
                  className={styles.thumbUrl}
                  src={posterPath}
                  alt="detailPoster"
                />
                <div className={styles.buttonWrap}>
                  {/* <Button
                  name="isBookmarked"
                  option="secondary"
                  className={styles.button}
                  onClick={onClickButton}
                >
                  {isBookmarked ? <SolidBookmarkIcon /> : <BookmarkIcon />}
                  북마크
                </Button> */}
                  {/* <Button
                  option="secondary"
                  name="isLiked"
                  className={styles.button}
                  onClick={onClickButton}
                >
                  {isLiked ? <SolidHeartIcon /> : <HeartIcon />}
                  좋아요
                </Button> */}
                </div>
              </div>
              <div className={styles.rightWrap}>
                <header>
                  <span className={styles.title}>{title}</span>
                  {/* <span className={styles.runtime}>{runtime}분 |</span> */}
                  <span>{dayjs(releaseDate).format('YYYY.MM.DD')}</span>
                </header>
                <section className={styles.info}>
                  <article>
                    <h3>장르</h3>
                    <p className={styles.genres}>
                      {movieGenres?.map((movieGenre) => {
                        return (
                          <span key={movieGenre.genre.id}>
                            {movieGenre.genre.name}
                          </span>
                        );
                      })}
                    </p>
                  </article>
                  <article>
                    <h3>줄거리</h3>
                    <p className={styles.plot}>{overview}</p>
                  </article>
                  <article>
                    <h3>출연</h3>
                    <p className={styles.staffs}>
                      {movieActors?.map((movieActor) => {
                        return (
                          <span key={movieActor.actor.id}>
                            {movieActor.actor.name}
                          </span>
                        );
                      })}
                    </p>
                  </article>
                  <article>
                    <h3>제작 / 스태프</h3>
                    <p className={styles.staffs}>
                      {/* <span> {company} | </span> */}
                      {movieStaffs?.map((movieStaff) => {
                        return (
                          <span key={movieStaff.staff.id}>
                            {movieStaff.staff.name}
                          </span>
                        );
                      })}
                    </p>
                  </article>
                </section>
              </div>
            </div>
          </div>
          <p className={styles.close} onClick={goHome}>
            <Close />
          </p>
          <div className={styles.moveSection}>
            <div
              className={styles.moveDetail}
              onClick={() => {
                navigate(`/detail/${movieId.id}`, {
                  to: true,
                });
              }}
            >
              <DoubleChevronRightIcon />
              <p className={styles.moveText}>Detail Page</p>
            </div>
          </div>
          {/* {reviews.length === 0 && ( */}
          {/* <div className={styles.emptyText}>
                <p>텅</p>
                <p>첫 리뷰를 남겨보세요✨</p>
              </div> */}
          {/* )} */}

          {/* {reviews?.slice(0, 2).map((review, index) => {
              return (
                <Preview
                  key={index + review.user.id}
                  userName={setUserName(review.user)}
                  date={dayjs(review.createdAt).format('YYYY.MM.DD')}
                  comment={review.content}
                  rating={review.score}
                />
              );
            })} */}
          <div className={styles.starBox}>
            <p className={styles.starTitle}>평균평점</p>
            <p className={styles.starNum}>
              <SolidStarIcon className={styles.star} />
              {voteAverage?.toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
