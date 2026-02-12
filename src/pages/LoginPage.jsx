import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png'; 
import './LoginPage.css';

const LoginPage = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/v1/auth/login', {
        loginId: loginId,
        password: password
      }, {
        withCredentials: true //
      });

      // redirect
      if (response.status === 200 || response.status == 204) {
        // 성공 시 페이지 이동
        navigate('/login/success');
        console.log(response.status);
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("아이디 또는 비밀번호를 확인해주세요. 아아아아아아아아아");
    }
  };

  return (
    <div className="container">
      <div className="logoArea">
        <div className="logoIcon">
          <img src={logoImg} alt="MyWork Logo" style={{ width: '80px', height: 'auto' }} />
        </div>
        <h1 className="logoText">MyWork</h1>
      </div>

      <form className="inputContainer" onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="ID" 
          className="inputField"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="비밀번호" 
          className="inputField"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="loginButton">로그인</button>
      </form>

      <div className="linkArea">
        <a href="/signup" className="signupLink">회원가입</a>
      </div>
    </div>
  );
};

export default LoginPage;