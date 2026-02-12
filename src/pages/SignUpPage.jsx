import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // 👈 파일 경로 에러 없도록 다시 axios로 복구
import '../styles/Auth.css';

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
    confirmPassword: '',
    name: '',
    contact: '',
    email: ''
  });

  const [isIdChecked, setIsIdChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 3. 중복 확인 함수 (프록시 작동하도록 수정)
  const handleCheckId = async () => {
    if (!formData.loginId) return alert("아이디를 입력하세요.");
    try {
      // 주소 앞에 /api를 붙여야 setupProxy.js가 가로채서 백엔드로 보냅니다
      const response = await axios.get(`/api/v1/users/check-id/${formData.loginId}`);
      
      if (response.data === true) {
        alert("이미 사용 중인 아이디입니다.");
        setIsIdChecked(false);
      } else {
        alert("사용 가능한 아이디입니다.");
        setIsIdChecked(true);
      }
    } catch (err) {
      console.error(err);
      alert("중복 확인 중 오류가 발생했습니다.");
    }
  };

  // 4. 회원가입 제출 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isIdChecked) return alert("아이디 중복 확인을 먼저 해주세요.");
    if (formData.password !== formData.confirmPassword) return alert("비밀번호가 일치하지 않습니다.");

    try {
      // 여기도 주소 앞에 /api를 붙여서 504 타임아웃을 방지합니다
      const response = await axios.post('/api/v1/users/signup', {
        loginId: formData.loginId,
        password: formData.password,
        name: formData.name,
        email: formData.email,
        contact: formData.contact
      });

      if (response.status === 200) {
        alert("가입 성공!");
        navigate("/");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data || "서버 에러";
      alert("회원가입 실패: " + errorMsg);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card signup-card">
        <h2 className="auth-title">회원가입</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-with-button">
            <input
              name="loginId"
              type="text"
              placeholder="아이디 입력"
              className="auth-input"
              value={formData.loginId}
              onChange={handleChange}
            />
            <button type="button" className="check-button" onClick={handleCheckId}>중복 확인</button>
          </div>

          <input
            name="password"
            type="password"
            placeholder="비밀번호 입력"
            className="auth-input"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="비밀번호 확인"
            className="auth-input"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <input name="name" type="text" placeholder="이름" className="auth-input" value={formData.name} onChange={handleChange} />
          <input name="contact" type="text" placeholder="전화번호" className="auth-input" value={formData.contact} onChange={handleChange} />
          <input name="email" type="email" placeholder="이메일 주소" className="auth-input" value={formData.email} onChange={handleChange} />

          <button type="submit" className="auth-button submit-button">가입하기</button>
        </form>
        <div className="auth-footer">
          이미 계정이 있으신가요? <Link to="/">로그인</Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;