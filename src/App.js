import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. 파일명 대소문자를 꼭 확인하세요! (실제 파일이 SignUpPage.jsx라면 아래처럼)
import SignUpPage from './pages/SignUpPage'; 

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 2. 주소창에 아무것도 안 쳤을 때(/) 바로 회원가입 페이지를 보여줍니다 */}
          <Route path="/" element={<SignUpPage />} />
          
          {/* 3. 혹시 모르니 /signup 경로도 연결해둡니다 */}
          <Route path="/signup" element={<SignUpPage />} />

          {/* 4. 없는 페이지로 들어오면 홈(/)으로 보내버립니다 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;