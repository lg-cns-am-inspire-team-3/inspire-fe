import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // 로그인 버튼 눌렀을 때 실행될 함수
    const handleLogin = async (e) => {
        e.preventDefault(); // 페이지 새로고침 방지

        try {
            
            const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
                loginId: loginId,
                password: password
            });

            
            if (response.status === 200 || response.status === 204) {
                alert("로그인 성공! 환영합니다.");
                
                
                navigate('/admin/workers'); 
            }
        } catch (error) {
            console.error("로그인 실패:", error);
            alert("아이디 또는 비밀번호를 확인해주세요.");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input 
                type="text" 
                placeholder="아이디" 
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="비밀번호" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button type="submit">로그인</button>
        </form>
    );
};