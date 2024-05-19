import apiClient from '../apiClient';

/** 내가 북마크한 영화를 조회합니다. 유저만 사용할 수 있습니다. */
export const getMyBookmarks = () => {
  return apiClient.get('/bookmarks/me');
};

/** 내가 북마크한 영화를 조회합니다. (페이지) */
export const getBookmarksPage = (page = 1, limit = 20) => {
  return apiClient.get(`/bookmarks/me/paging`, {
    params: {
      page,
      limit,
    },
  });
};

/**  다른 유저가 북마크한 영화 조회. */
export const getBookmarkedMovies = () => {
  return apiClient.get('/movies/bookmarks');
};

/** 영화 북마크 생성 */
export const postBookmark = (id) => {
  return apiClient.post(`/movies/${id}/bookmarks`);
};
/** 영화 북마크 삭제 */
export const deleteBookmark = (id) => {
  return apiClient.delete(`/movies/${id}/bookmarks`);
};
