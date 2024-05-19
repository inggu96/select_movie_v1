import axios from 'axios';
import apiClient from '../apiClient';

//영화목록 불러오기
export const getMovies = () => {
  return apiClient.get('/movies');
};

// 영화 자세히 불러오기
export const getMovie = (id) => {
  return apiClient.get(`/movies/${id}`);
};

// 영화 전체 개수 불러오기
export const getMoviesCount = () => {
  return apiClient.get('/movies/count');
};

// 내가 좋아요 한 영화 불러오기
export const getMoviesMeLike = () => {
  return apiClient.get(`/movies/me/likes`);
};
// 내가 북마크 한 영화 불러오기
export const getBookmarksMe = (page = 1, limit = 20) => {
  return apiClient.get(`/bookmarks/me/paging`, {
    params: {
      page,
      limit,
    },
  });
};

//유저가 좋아요 한 영화 불러오기
export const getMoviesUserLike = (userId) => {
  return apiClient.get(`/movies/users/${userId}/likes`);
};

// 영화 장르별로 불러오기
export const getMoviesGenre = (genreIds) => {
  return apiClient.get(`/movies/genre`, {
    params: {
      genreIds,
    },
  });
};

// 영화 장르불러오기
export const getMoviesGenres = () => {
  return apiClient.get(`/movies/genres`);
};

// top10 영화 불러오기
export const getMoviesTop = () => {
  return apiClient.get(`/movies/top`);
};

// 연관된 영화 불러오기
export const getMoviesRelated = (id) => {
  return apiClient.get(`/movies/${id}/related`);
};

// 영화 장르별로 불러오기22 ?
export const getMoviesCategory = () => {
  return apiClient.get(`/movies/category`);
};

// 영화 자세히 불러오기
export const getMovieDetail = (id) => {
  return apiClient.get(`/movies/${id}/detail`);
};

// 영화 좋아요 생성
export const postMovieLike = (id) => {
  return apiClient.post(`/movies/${id}/like`);
};

// 영화 좋아요 삭제
export const deleteMovieLike = (id) => {
  return apiClient.delete(`/movies/${id}/like`);
};

// 영화 수정하기
export const patchMovie = (id, body) => {
  return apiClient.patch(`/movies/${id}`, body);
};
