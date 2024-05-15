import apiClient from '../apiClient';

// 전체 이용자 수 불러오기
export const getUsersCount = () => {
  return apiClient.get('/users/count');
};

// 나의 정보 불러오기
export const getUserMe = () => {
  return apiClient.get(`/user/me`);
};

// 나의 추가 정보 불러오기 [좋아요, 리뷰 개수, 별점]
export const getUsersMeInfo = () => {
  return apiClient.get(`/users/me/info`);
};
// data: averageScore: null, reviewCount: 0, likeCount: 0

// 유저목록 불러오기
export const getUsers = (page, limit, name) => {
  return apiClient.get(`/users`, {
    params: {
      page,
      limit,
      name,
    },
  });
};

//유저 수정하기 (Users)
export const patchUser = (body) => {
  return apiClient.patch(`/users`, body);
};
//유저 수정하기 (관리자)
export const patchUserAdmin = (id, body) => {
  return apiClient.patch(`/users/${id}`, body);
};

//유저 삭제하기
export const deleteUser = (userId) => {
  return apiClient.delete(`/users/${userId}`);
};

//다수 유저 삭제하기
export const deleteUsers = (userIds) => {
  return apiClient.delete(`/users`, {
    params: {
      userIds,
    },
  });
};

// 유저 자세히 불러오기 (인포) : name,nickname,description,profileImage...
export const getUserDetail = (userId) => {
  return apiClient.get(`/users/${userId}/detail`);
};
// 유저 추가 정보 불러오기 (인포 디테일)
export const getUserInfo = (userId) => {
  return apiClient.get(`/users/${userId}/info`);
};
