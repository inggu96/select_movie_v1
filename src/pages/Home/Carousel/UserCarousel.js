import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import {
  getBookmarkedMovies,
  getBookmarksPage,
  getUserBookmarksPage,
} from '../../../api/Bookmarks';

import { getMoviesMeLike, getMoviesUserLike } from '../../../api/Movies';
import styles from './carousel.module.scss';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SolidBookmarkIcon,
  SolidHeartIcon,
} from '../../../assets/icon';
import { PosterUser } from '../../User/PosterUser';

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
    const response = await getBookmarkedMovies();
    setMyMark(response.data);
  };

  // const fetchUserLike = async () => {
  //   const response = await getMoviesUserLike(userId.id);
  //   setUserLike(response.data);
  // };
  // const fetchUserBookmark = async () => {
  //   const response = await getUserBookmarksPage(userId.id);
  //   setUserMark(response.data);
  // };

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
    console.log('myLike', myLike);
    // isUserPage && fetchUserLike();
    // isUserPage && fetchUserBookmark();
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
            {myMark?.map((index) => (
              <PosterUser
                type="mark"
                key={index.id}
                index={index}
                callback={fetchMoviesMark}
              />
            ))}
          </Slider>
        </div>
      )}

      {/* {name === 'userLike' && (
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
      )} */}
    </>
  );
};
