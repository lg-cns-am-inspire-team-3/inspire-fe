import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 컴포넌트 임포트
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import WorkerManagement from './pages/WorkerManagement';
import WorkerDetail from './pages/WorkerDetail';
import MyPage from './pages/MyPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/test-ui" element={<MyPage />} />
          {/* 계정 및 인증 관련 라우트 */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* 일반 사용자 전용 라우트 */}
          <Route path="/mypage" element={<MyPage />} />

          {/* 근태 관리 시스템 라우트 */}
          <Route path="/attendance/scan" element={<AttendanceScanPage />} />

          {/* 관리자 전용 근무자 관리 라우트 */}
          <Route path="/admin/workers" element={<WorkerManagement />} />
          <Route path="/admin/workers/:id" element={<WorkerDetail />} />

          {/* 정의되지 않은 경로 접근 시 초기 페이지로 리다이렉트 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
