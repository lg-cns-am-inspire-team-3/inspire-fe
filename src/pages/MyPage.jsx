import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api/userApi';
import api from '../api/axios';
import '../styles/Auth.css';
import './MyPage.css';

function MyPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    salary: 0,
  });

  const formatMoney = (val) =>
    (val || 0).toLocaleString();

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const res = await userApi.getMyInfo();
        setUserInfo(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await userApi.updateMyInfo(userInfo);
      alert('정보가 수정되었습니다.');
      setIsEdit(false);
    } catch {
      alert('수정 실패');
    }
  };

  const handleLogout = async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      await api.post('/api/v1/auth/logout');
      navigate('/');
    }
  };

  if (loading) {
    return <div className="auth-wrapper">로딩 중...</div>;
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card signup-card">

        {/* ===== 타이틀 ===== */}
        <h2 className="auth-title">
          {isEdit ? '회원정보 수정' : '마이페이지'}
        </h2>

        {/* ===== 프로필 ===== */}
        <div className="mypage-profile">

          {/* ⭐ 수정모드에서도 아바타 유지 */}
          <div className="profile-avatar">
            {userInfo.name?.[0] || 'U'}
          </div>

          {/* 이름 + 수정버튼 */}
          <div className="profile-name-wrap">

            <span className="profile-name">
              {userInfo.name || '사용자'}님
            </span>

            {!isEdit && (
              <button
                className="edit-btn"
                onClick={() => setIsEdit(true)}
                type="button"
              >
                회원정보 수정
              </button>
            )}

          </div>

          {/* 시급은 기본모드만 */}
          {!isEdit && (
            <p className="profile-salary">
              시급 {formatMoney(userInfo.salary)}원
            </p>
          )}

        </div>

        {/* ===== 입력폼 ===== */}
        <form className="auth-form">
          <input
            name="name"
            placeholder="이름"
            className="auth-input"
            value={userInfo.name || ''}
            onChange={handleChange}
            disabled={!isEdit}
          />

          <input
            name="email"
            placeholder="이메일"
            className="auth-input"
            value={userInfo.email || ''}
            onChange={handleChange}
            disabled={!isEdit}
          />

          <input
            name="contact"
            placeholder="연락처"
            className="auth-input"
            value={userInfo.contact || ''}
            onChange={handleChange}
            disabled={!isEdit}
          />

          <input
            name="address"
            placeholder="주소"
            className="auth-input"
            value={userInfo.address || ''}
            onChange={handleChange}
            disabled={!isEdit}
          />
        </form>

        {/* ===== 버튼 ===== */}
        <div className="auth-button-group">

          {isEdit ? (
            <>
              <button
                className="auth-button submit-button"
                onClick={handleSave}
                type="button"
              >
                저장하기
              </button>

              <button
                className="auth-button secondary-btn"
                onClick={() => setIsEdit(false)}
                type="button"
              >
                취소
              </button>
            </>
          ) : (
            <button
              className="auth-button danger-button"
              onClick={handleLogout}
              type="button"
            >
              로그아웃
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default MyPage;
