import React, { useState } from 'react';
import logoImg from '../assets/logo.png'; 
import './LoginPage.css';

const LoginPage = () => {
  const [login_id, setLoginId] = useState('');
  const [password_hash, setPasswordHash] = useState('');

  const handleLogin = () => {
    console.log("DB 규격 데이터:", { login_id, password_hash });
  };

  return (
    <div className="container">
      <div className="logoArea">
        <div className="logoIcon">
          <img src={logoImg} alt="MyWork Logo" style={{ width: '80px', height: 'auto' }} />
        </div>
        <h1 className="logoText">MyWork</h1>
      </div>

      <div className="inputContainer">
        <input 
          type="text" 
          placeholder="ID" 
          className="inputField"
          value={login_id}
          onChange={(e) => setLoginId(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="비밀번호" 
          className="inputField"
          value={password_hash}
          onChange={(e) => setPasswordHash(e.target.value)}
        />
      </div>

      <button onClick={handleLogin} className="loginButton">
        로그인
      </button>

      <div className="linkArea">
        <a href="/signup" className="signupLink">회원가입</a>
      </div>
    </div>
  );
};

export default LoginPage;
