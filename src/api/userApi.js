import api from './axios';

export const userApi = {
  // 1. 내 정보 조회 (GET /api/v1/users/me)
  getMyInfo: () => {
    return api.get('/api/v1/users/me');
  },

  // 2. 내 정보 수정 (PATCH /api/v1/users/me)
  updateMyInfo: (data) => {
    return api.patch('/api/v1/users/me', data);
  },

  // 3. 회원 탈퇴 (DELETE /api/v1/users/me)
  withdraw: () => {
    return api.delete('/api/v1/users/me');
  }
};