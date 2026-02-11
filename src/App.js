import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import WorkerManagement from './pages/WorkerManagement';
import WorkerDetail from './pages/WorkerDetail';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 경로 → 로그인 */}
        <Route path="/" element={<LoginPage />} />

        {/* 회원가입 */}
        <Route path="/signup" element={<SignUpPage />} />

        {/* 관리자 */}
        <Route path="/admin/workers" element={<WorkerManagement />} />
        <Route path="/admin/workers/:id" element={<WorkerDetail />} />

        {/* 없는 주소 접근 시 홈으로 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
