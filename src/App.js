import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. 컴포넌트들을 불러오기
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AttendanceScanPage from './pages/AttendanceManagement';
import WorkerManagement from './pages/WorkerManagement';
import WorkerDetail from './pages/WorkerDetail';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* 첫 화면(/)을 로그인 페이지로 설정 */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* 회원가입 페이지 */}
          <Route path="/signup" element={<SignUpPage />} />

          {/* 출석 스캔 페이지 */}
          <Route path="/attendance/scan" element={<AttendanceScanPage />} />

          {/* 직원 관리 페이지 */}
          <Route path="/admin/workers" element={<WorkerManagement />} />
          <Route path="/admin/workers/:id" element={<WorkerDetail />} />

          {/* 잘못된 주소로 들어오면 홈으로 이동 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
