import React, { useEffect, useState } from 'react';
import styles from './detailInfo.module.scss';
import Button from '../../../components/Common/Button';
import Chart from '../Chart';
import dayjs from 'dayjs';
import { deleteMovieLike, getMovie, postMovieLike } from '../../../api/Movies';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../../../state';
import {
  BookmarkIcon,
  HeartIcon,
  SolidBookmarkIcon,
  SolidHeartIcon,
  SolidStarIcon,
} from '../../../assets/icon';
import {
  postBookmark,
  deleteBookmark,
  getMyBookmarks,
} from '../../../api/Bookmarks';
import { useParams } from 'react-router-dom';

const DetailInfo = () => {
  const isLogin = useRecoilValue(isLoginAtom);
  const [movieDetail, setMovieDetail] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [movie, setMovie] = useState();
  let { id } = useParams();

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

  const fetchMovie = async () => {
    try {
      const response = await getMovie(id);
      setMovie(response.data);
      console.log('response', response.data);
    } catch (error) {
      console.error('영화 정보를 가져오는 중 오류가 발생했습니다:', error);
    }
  };

  //   const fetchMovieData = async () => {
  //     const response = await getMovie(id);
  //     setMovieDetail(response.data);

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

  //     if (isLogin && bookmarkIdArr.includes(id)) {
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
  //       isLiked ? await deleteMovieLike(id) : await postMovieLike(id);
  //       setIsLiked((cur) => !cur);
  //     }

  //     if (name === 'isBookmarked') {
  //       isBookmarked ? await deleteBookmark(id) : await postBookmark(id);
  //       setIsBookmarked((cur) => !cur);
  //     }
  //   };

  useEffect(() => {
    fetchMovie();
    // fetchMovieData();
    // fetchBookmarks();
  }, [id]);

  return (
    <>
      <article className={styles.detailInfoWrap}>
        <img src={posterPath} alt="detailInfoBackground" />

        <section className={styles.overlay}>
          <article className={styles.headerContentWrap}>
            <div className={styles.leftWrap}>
              <img src={posterPath} alt="detailPoster" />
              {/* <div className={styles.buttonWrap}>
                <Button
                  name="isBookmarked"
                  className={styles.button}
                  onClick={onClickButton}
                >
                  {isBookmarked ? <SolidBookmarkIcon /> : <BookmarkIcon />}
                  북마크
                </Button>
                <Button
                  name="isLiked"
                  className={styles.button}
                  onClick={onClickButton}
                >
                  {isLiked ? <SolidHeartIcon /> : <HeartIcon />}
                  좋아요
                </Button>
              </div> */}
            </div>
            <div className={styles.rightWrap}>
              <header>
                <span className={styles.title}>{title}</span>
                <span className={styles.runtime}>
                  {movieDetail?.runtime}분 |
                </span>
                <span>
                  {dayjs(movieDetail?.releasedAt).format('YYYY.MM.DD')}
                </span>
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

              <section className={styles.chartStarWrap}>
                <Chart className={styles.chartWrap} />
                <div className={styles.starWrap}>
                  <span>평균 평점</span>
                  <SolidStarIcon />
                  {voteAverage?.toFixed(1)}
                </div>
              </section>
            </div>
          </article>
        </section>
      </article>
    </>
  );
};

export default DetailInfo;
