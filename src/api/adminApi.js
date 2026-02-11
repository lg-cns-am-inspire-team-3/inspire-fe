import api from './axios';

export const adminApi = {
  // 전체 회원 조회
  getAllUsers: () => {
    return api.get('/api/v1/admin/users');
  },

  // 회원 승인 + 시급 설정
  approveUser: (userId, salary) => {
    return api.patch(`/api/v1/admin/users/${userId}`, {
      salary: salary
    });
  },

  // 근무자 삭제 (새로 추가!)
  deleteUser: (userId) => {
    return api.delete(`/api/v1/admin/users/${userId}`);
  }
};