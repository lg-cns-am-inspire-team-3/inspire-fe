import React, { useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { setNavigator } from './router/navigation';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from './auth/AuthContext';
import { setAccessToken } from './auth/token';

// 컴포넌트 임포트
import AttendanceScanPage from './pages/AttendanceScanPage'
import LoginPage from './pages/LoginPage';
import LoginSuccessPage from './pages/LoginSuccessPage';
import SignUpPage from './pages/SignUpPage';
import WorkerManagement from './pages/WorkerManagement';
import WorkerDetail from './pages/WorkerDetail';
import MyPage from './pages/MyPage';

import './App.css';
import ProtectedRoute from './router/ProtectedRoute';

function App() {
  const navigate = useNavigate();
  const { setIsLogin, setRole } = useAuth();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await axios.post("/api/v1/auth/reissue", {}, { withCredentials: true });
        const token = res.data.token;

        setAccessToken(token);
        const decoded = jwtDecode(token);

        setRole(decoded.role);
        setIsLogin(true);
      } catch {
        setIsLogin(false);
      }
    };

    init();
  }, []);


  return (
    <div className="App">
      <Routes>
        <Route path="/test-ui" element={<MyPage />} />
        {/* 계정 및 인증 관련 라우트 */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/success" element={<LoginSuccessPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* 일반 사용자 전용 라우트 */}
        <Route path="/mypage" element={<MyPage />} />

        {/* 근태 관리 시스템 라우트 */}
        <Route path="/attendance/scan" element={<AttendanceScanPage />} />

        {/* 관리자 전용 근무자 관리 라우트 */}
        <Route path="/admin/workers" element={
          <ProtectedRoute>
            <WorkerManagement />
          </ProtectedRoute>}
        />
        <Route path="/admin/workers/:id" element={<ProtectedRoute><WorkerDetail /></ProtectedRoute>} />

        {/* 정의되지 않은 경로 접근 시 초기 페이지로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
