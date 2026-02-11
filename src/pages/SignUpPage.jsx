import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // 1. axios 임포트
import '../styles/Auth.css';

function SignupPage() {
  const navigate = useNavigate(); // 가입 후 페이지 이동용

  // 2. 백엔드 DTO 필드와 일치하게 상태 관리 확장
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
    confirmPassword: '',
    name: '',
    contact: '',
    email: ''
  });

  const [isIdChecked, setIsIdChecked] = useState(false); // 중복확인 여부

  // 입력값 변경 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 3. 중복 확인 함수
  const handleCheckId = async () => {
    if (!formData.loginId) return alert("아이디를 입력하세요.");
    try {
      /**
       * [개발 참고] 현재는 로컬 개발 환경이므로 localhost:8080을 직접 호출합니다.
       * 추후 운영 서버 배포 시에는 .env 파일의 환경 변수(EX: process.env.REACT_APP_API_URL)로 
       * 관리하여 서버 주소가 유동적으로 변할 수 있도록 개선이 필요합니다.
       */
      const response = await axios.get(`http://localhost:8080/api/v1/users/check-id/${formData.loginId}`);
      if (response.data === true) {
        alert("이미 사용 중인 아이디입니다.");
        setIsIdChecked(false);
      } else {
        alert("사용 가능한 아이디입니다.");
        setIsIdChecked(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 4. 회원가입 제출 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isIdChecked) return alert("아이디 중복 확인을 먼저 해주세요.");
    if (formData.password !== formData.confirmPassword) return alert("비밀번호가 일치하지 않습니다.");

    try {
      // 임시 하드코딩
      const response = await axios.post('http://localhost:8080/api/v1/users/signup', {
        loginId: formData.loginId,
        name: formData.name,
        email: formData.email,
        contact: formData.contact
        // password 전송 로직은 백엔드 security 설정에 따라 추가 (현재 백엔드 DTO엔 비밀번호가 빠져있을 수 있음)
      });

      if (response.status === 200) {
        alert("가입 성공!");
        navigate("/"); // 로그인 페이지로 이동
      }
    } catch (err) {
      alert("회원가입 실패: " + (err.response?.data || "서버 에러"));
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card signup-card">
        <h2 className="auth-title">회원가입</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* 아이디 */}
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

          {/* 비밀번호 */}
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

          {/* 추가 입력창들 - name 속성을 백엔드 DTO 필드명과 맞춤 */}
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