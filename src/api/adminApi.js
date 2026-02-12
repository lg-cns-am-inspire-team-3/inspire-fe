import api from './axios'; // 공통 axios 인스턴스

export const adminApi = {
  // 1. 전체 회원 조회 (ACTIVE 상태 유저)
  getActiveUsers: () => api.get('/api/v1/admin/users?role=user&status=active'),

  // 2. 승인 대기 회원 조회 (SUSPENDED 상태 유저)
  getSuspendedUsers: () => api.get('/api/v1/admin/users?role=user&status=suspended'),

  // ✅ 3. 회원 상세 조회 (추가됨)
  // 상세 페이지 진입 시 반드시 필요합니다.
  getUserDetail: (id) => api.get(`/api/v1/admin/users/${id}`),

  // 4. 회원 승인 (상태를 ACTIVE로 변경)
  approveUser: (id) => api.patch(`/api/v1/admin/users/${id}`,
    {
      status: 'active'
    },
    {
      headers: {
        'Content-Type': 'application/json',
      }
    }),

  // 5. 회원 정보 수정 및 시급 설정
  updateUser: (id, userData) => api.patch(`/api/v1/admin/users/${id}`, userData),

  // 6. 근무자 삭제
  deleteUser: (id) => api.delete(`/api/v1/admin/users/${id}`),

  // 7. 모든 출결 조회 (id, (year, month)) 조건 가능
  getAttends: (userId, year, month, day) => {
    const params = {};
    if (userId) { params.userId = userId; }
    if (year) { params.year = year; }
    if (month) { params.month = month; }
    if (day) { params.day = day; }

    return api.get('/api/v1/admin/attends', {
      params
    });
  }
};